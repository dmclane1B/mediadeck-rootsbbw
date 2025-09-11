import { useState, useEffect, useCallback } from 'react';
import { compressImage } from '@/utils/imageCompression';
import { indexedDBManager } from '@/utils/indexedDBManager';

export interface MediaFile {
  id: string;
  name: string;
  url: string; // base64 data URL
  uploadDate: string;
  dimensions?: { width: number; height: number };
  size?: number;
}

export interface UploadProgress {
  fileName: string;
  progress: number;
  completed: boolean;
  error?: string;
  fileIndex: number;
  stage: string;
}

// Constants
const MAX_INPUT_FILE_SIZE = 50 * 1024 * 1024; // 50MB input limit
const MAX_FINAL_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB final compressed size
const MAX_TOTAL_SIZE = 500 * 1024 * 1024; // 500MB total storage (IndexedDB)
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// Helper functions
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const getImageDimensions = (base64: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
    };
    img.src = base64;
  });
};

const calculateTotalSize = (images: MediaFile[]): number => {
  return images.reduce((total, image) => {
    return total + (image.size || 0);
  }, 0);
};

export const useMediaLibrary = () => {
  const [images, setImages] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);

  // Load images from IndexedDB on mount with debugging and retry logic
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000; // 1 second

    const loadImages = async (attempt: number = 0): Promise<void> => {
      console.log(`[MediaLibrary] Loading images from IndexedDB (attempt ${attempt + 1}/${maxRetries + 1})`);
      
      try {
        // Initialize IndexedDB first
        console.log('[MediaLibrary] Initializing IndexedDB...');
        await indexedDBManager.initialize();
        console.log('[MediaLibrary] IndexedDB initialized successfully');
        
        // Load images
        console.log('[MediaLibrary] Fetching images...');
        const storedImages = await indexedDBManager.getAllImages();
        console.log(`[MediaLibrary] Successfully loaded ${storedImages.length} images from IndexedDB`, storedImages);
        
        setImages(storedImages);
        setLoading(false);
        
        // Log storage info for debugging
        try {
          const storageUsage = await indexedDBManager.getStorageUsage();
          console.log('[MediaLibrary] Storage usage:', storageUsage);
        } catch (storageError) {
          console.warn('[MediaLibrary] Could not get storage usage:', storageError);
        }
        
      } catch (error) {
        console.error(`[MediaLibrary] Error loading images from IndexedDB (attempt ${attempt + 1}):`, error);
        
        if (attempt < maxRetries) {
          console.log(`[MediaLibrary] Retrying in ${retryDelay}ms... (${maxRetries - attempt} attempts remaining)`);
          setTimeout(() => {
            loadImages(attempt + 1);
          }, retryDelay * (attempt + 1)); // Exponential backoff
        } else {
          console.error('[MediaLibrary] All retry attempts failed. Setting images to empty array.');
          setImages([]);
          setLoading(false);
          
          // Try to provide helpful debugging info
          console.log('[MediaLibrary] Browser storage check:');
          console.log('- IndexedDB supported:', 'indexedDB' in window);
          console.log('- Local storage available:', typeof(Storage) !== "undefined");
          
          if ('storage' in navigator && 'estimate' in navigator.storage) {
            navigator.storage.estimate().then(estimate => {
              console.log('- Storage estimate:', estimate);
            }).catch(e => console.log('- Storage estimate failed:', e));
          }
        }
      }
    };

    loadImages();
  }, []);

  const addImages = async (
    files: FileList,
    onProgress?: (progress: UploadProgress[]) => void
  ): Promise<{ success: MediaFile[], errors: string[] }> => {
    const fileArray = Array.from(files);
    const results: { success: MediaFile[], errors: string[] } = {
      success: [],
      errors: []
    };

    // Pre-upload validation
    const preUploadErrors = await validateFilesBeforeUpload(fileArray);
    if (preUploadErrors.length > 0) {
      return { success: [], errors: preUploadErrors };
    }

    // Check storage quota before starting
    try {
      const storageCheck = await checkStorageQuota();
      if (!storageCheck.hasSpace) {
        return { 
          success: [], 
          errors: [`Storage quota exceeded. Available: ${formatBytes(storageCheck.available)}, Required: ${formatBytes(calculateTotalFileSize(fileArray))}`] 
        };
      }
    } catch (error) {
      console.error('Storage quota check failed:', error);
    }

    // Initialize progress tracking
    const progressArray: UploadProgress[] = fileArray.map((file, index) => ({
      fileName: file.name,
      progress: 0,
      completed: false,
      fileIndex: index,
      stage: 'preparing'
    }));
    
    setUploadProgress(progressArray);
    onProgress?.(progressArray);

    // Process files in parallel (chunked to avoid overwhelming the system)
    const chunkSize = 3; // Process 3 files at a time
    for (let i = 0; i < fileArray.length; i += chunkSize) {
      const chunk = fileArray.slice(i, i + chunkSize);
      const chunkPromises = chunk.map(async (file, chunkIndex) => {
        const fileIndex = i + chunkIndex;
        return processFile(file, fileIndex, progressArray, onProgress, results);
      });

      await Promise.allSettled(chunkPromises);
    }

    // Clear progress after a delay
    setTimeout(() => {
      setUploadProgress([]);
    }, 3000);

    return results;
  };

  const validateFilesBeforeUpload = async (files: File[]): Promise<string[]> => {
    const errors: string[] = [];
    
    for (const file of files) {
      // Validate file type
      if (!SUPPORTED_TYPES.includes(file.type)) {
        errors.push(`${file.name}: Unsupported file type (${file.type}). Supported: ${SUPPORTED_TYPES.join(', ')}`);
        continue;
      }

      // Validate input file size (before compression)
      if (file.size > MAX_INPUT_FILE_SIZE) {
        errors.push(`${file.name}: File too large (${formatBytes(file.size)}). Maximum input size: ${formatBytes(MAX_INPUT_FILE_SIZE)}`);
        continue;
      }

      // Check if file is corrupted by trying to read it
      try {
        await validateImageFile(file);
      } catch (error) {
        errors.push(`${file.name}: File appears to be corrupted or invalid`);
      }
    }

    return errors;
  };

  const validateImageFile = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Invalid image file'));
      };
      
      img.src = url;
    });
  };

  const checkStorageQuota = async (): Promise<{ hasSpace: boolean; available: number; used: number }> => {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        const used = estimate.usage || 0;
        const quota = estimate.quota || MAX_TOTAL_SIZE;
        const available = quota - used;
        
        return {
          hasSpace: available > (MAX_FINAL_IMAGE_SIZE * 2), // Ensure we have space for at least 2 compressed files
          available,
          used
        };
      }
    } catch (error) {
      console.error('Failed to check storage quota:', error);
    }
    
    // Fallback to IndexedDB calculation
    const currentSize = calculateTotalSize(images);
    return {
      hasSpace: currentSize < MAX_TOTAL_SIZE * 0.9,
      available: MAX_TOTAL_SIZE - currentSize,
      used: currentSize
    };
  };

  const calculateTotalFileSize = (files: File[]): number => {
    return files.reduce((total, file) => total + file.size, 0);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFile = async (
    file: File, 
    fileIndex: number, 
    progressArray: UploadProgress[], 
    onProgress?: (progress: UploadProgress[]) => void,
    results?: { success: MediaFile[], errors: string[] }
  ): Promise<void> => {
    if (!results) return;
    
    try {
      // Update progress to show processing
      progressArray[fileIndex].progress = 10;
      progressArray[fileIndex].stage = 'validating';
      setUploadProgress([...progressArray]);
      onProgress?.([...progressArray]);

      // Update progress to show compression
      progressArray[fileIndex].progress = 30;
      progressArray[fileIndex].stage = 'compressing';
      setUploadProgress([...progressArray]);
      onProgress?.([...progressArray]);

      // Compress image with retry logic
      let compressionResult;
      let compressionAttempts = 0;
      const maxCompressionAttempts = 3;

      while (compressionAttempts < maxCompressionAttempts) {
        try {
          compressionResult = await compressImage(file, {
            maxSizeBytes: MAX_FINAL_IMAGE_SIZE,
            quality: 0.8,
            maxWidth: 2048,
            maxHeight: 2048
          }, (progress) => {
            const scaledProgress = 30 + (progress * 0.3); // Scale progress from 30% to 60%
            progressArray[fileIndex].progress = scaledProgress;
            setUploadProgress([...progressArray]);
            onProgress?.([...progressArray]);
          });
          break;
        } catch (error) {
          compressionAttempts++;
          if (compressionAttempts >= maxCompressionAttempts) {
            throw new Error(`Compression failed after ${maxCompressionAttempts} attempts: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // Check if compression result meets size requirements
      if (compressionResult && compressionResult.compressedSize > MAX_FINAL_IMAGE_SIZE) {
        throw new Error(`Unable to compress ${file.name} to required size (${formatBytes(MAX_FINAL_IMAGE_SIZE)}). Final size: ${formatBytes(compressionResult.compressedSize)}`);
      }

      if (!compressionResult) {
        throw new Error('Compression failed');
      }
      
      // Update progress to show processing
      progressArray[fileIndex].progress = 70;
      progressArray[fileIndex].stage = 'processing';
      setUploadProgress([...progressArray]);
      onProgress?.([...progressArray]);

      // Get base64 from compression result
      const base64 = compressionResult.compressedFile;
      const dimensions = compressionResult.dimensions;

      // Create media file
      const mediaFile: MediaFile = {
        id: crypto.randomUUID(),
        name: file.name,
        url: base64,
        uploadDate: new Date().toISOString(),
        dimensions,
        size: compressionResult.compressedSize
      };

      // Update progress to show saving
      progressArray[fileIndex].progress = 90;
      progressArray[fileIndex].stage = 'saving';
      setUploadProgress([...progressArray]);
      onProgress?.([...progressArray]);

      // Save to IndexedDB with retry logic
      let saveAttempts = 0;
      const maxSaveAttempts = 3;

      while (saveAttempts < maxSaveAttempts) {
        try {
          await indexedDBManager.addImage(mediaFile);
          break;
        } catch (error) {
          saveAttempts++;
          
          if (error instanceof Error && error.name === 'QuotaExceededError') {
            throw new Error('Storage quota exceeded. Please delete some images and try again.');
          }
          
          if (saveAttempts >= maxSaveAttempts) {
            throw new Error(`Database save failed after ${maxSaveAttempts} attempts: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      // Add to local state
      setImages(prev => [...prev, mediaFile]);
      results.success.push(mediaFile);

      // Mark as completed
      progressArray[fileIndex].progress = 100;
      progressArray[fileIndex].completed = true;
      progressArray[fileIndex].stage = 'completed';
      setUploadProgress([...progressArray]);
      onProgress?.([...progressArray]);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      const detailedError = `${file.name}: ${errorMessage}`;
      
      console.error('File upload error:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        error: errorMessage,
        stage: progressArray[fileIndex].stage
      });
      
      results.errors.push(detailedError);
      
      progressArray[fileIndex].error = errorMessage;
      progressArray[fileIndex].completed = true;
      progressArray[fileIndex].stage = 'failed';
      setUploadProgress([...progressArray]);
      onProgress?.([...progressArray]);
    }
  };

  const removeImage = useCallback(async (id: string) => {
    try {
      await indexedDBManager.removeImage(id);
      setImages(prev => prev.filter(image => image.id !== id));
    } catch (error) {
      console.error('Error removing image:', error);
      throw error;
    }
  }, []);

  const updateImage = useCallback(async (id: string, updates: Partial<MediaFile>) => {
    try {
      await indexedDBManager.updateImage(id, updates);
      setImages(prev => prev.map(image => 
        image.id === id ? { ...image, ...updates } : image
      ));
    } catch (error) {
      console.error('Error updating image:', error);
      throw error;
    }
  }, []);

  const clearAll = useCallback(async () => {
    try {
      await indexedDBManager.clearAll();
      setImages([]);
    } catch (error) {
      console.error('Error clearing all images:', error);
      throw error;
    }
  }, []);

  const getStorageInfo = useCallback(() => {
    const totalSize = calculateTotalSize(images);
    const remainingSize = MAX_TOTAL_SIZE - totalSize;
    const usagePercent = (totalSize / MAX_TOTAL_SIZE) * 100;
    
    return {
      totalSize,
      remainingSize,
      usagePercent,
      imageCount: images.length,
      maxFileSize: MAX_FINAL_IMAGE_SIZE,
      maxTotalSize: MAX_TOTAL_SIZE
    };
  }, [images]);

  return {
    images,
    loading,
    uploadProgress,
    addImages,
    removeImage,
    updateImage,
    clearAll,
    getStorageInfo
  };
};