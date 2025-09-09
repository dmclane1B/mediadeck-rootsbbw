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
}

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
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

  // Load images from IndexedDB on mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        const storedImages = await indexedDBManager.getAllImages();
        setImages(storedImages);
      } catch (error) {
        console.error('Error loading images from IndexedDB:', error);
        setImages([]);
      } finally {
        setLoading(false);
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

    // Initialize progress tracking
    const progressArray: UploadProgress[] = fileArray.map(file => ({
      fileName: file.name,
      progress: 0,
      completed: false
    }));
    
    setUploadProgress(progressArray);
    onProgress?.(progressArray);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      
      try {
        // Update progress to show processing
        progressArray[i].progress = 10;
        setUploadProgress([...progressArray]);
        onProgress?.([...progressArray]);

        // Validate file type
        if (!SUPPORTED_TYPES.includes(file.type)) {
          throw new Error(`Unsupported file type: ${file.type}`);
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          throw new Error(`File too large: ${(file.size / (1024 * 1024)).toFixed(1)}MB (max: ${MAX_FILE_SIZE / (1024 * 1024)}MB)`);
        }

        // Check total storage limit
        const currentSize = calculateTotalSize(images);
        if (currentSize + file.size > MAX_TOTAL_SIZE) {
          throw new Error('Storage limit exceeded. Please delete some images first.');
        }

        // Update progress to show compression
        progressArray[i].progress = 30;
        setUploadProgress([...progressArray]);
        onProgress?.([...progressArray]);

        // Compress image
        const compressionResult = await compressImage(file);
        
        // Update progress to show conversion
        progressArray[i].progress = 60;
        setUploadProgress([...progressArray]);
        onProgress?.([...progressArray]);

        // Get base64 from compression result
        const base64 = compressionResult.compressedFile;
        
        // Update progress to show dimension calculation
        progressArray[i].progress = 80;
        setUploadProgress([...progressArray]);
        onProgress?.([...progressArray]);

        // Get dimensions
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
        progressArray[i].progress = 90;
        setUploadProgress([...progressArray]);
        onProgress?.([...progressArray]);

        // Save to IndexedDB
        await indexedDBManager.addImage(mediaFile);
        
        // Add to local state
        setImages(prev => [...prev, mediaFile]);
        results.success.push(mediaFile);

        // Mark as completed
        progressArray[i].progress = 100;
        progressArray[i].completed = true;
        setUploadProgress([...progressArray]);
        onProgress?.([...progressArray]);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        results.errors.push(`${file.name}: ${errorMessage}`);
        
        progressArray[i].error = errorMessage;
        progressArray[i].completed = true;
        setUploadProgress([...progressArray]);
        onProgress?.([...progressArray]);
      }
    }

    // Clear progress after a delay
    setTimeout(() => {
      setUploadProgress([]);
    }, 3000);

    return results;
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
      maxFileSize: MAX_FILE_SIZE,
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