import { useState, useEffect, useCallback } from 'react';
import { compressImage, formatFileSize, type CompressionResult } from '@/utils/imageCompression';

export interface MediaFile {
  id: string;
  name: string;
  url: string; // base64 data URL for persistence
  uploadDate: string;
  dimensions?: { width: number; height: number };
  size?: number;
  originalSize?: number;
  compressionRatio?: number;
}

export interface UploadProgress {
  fileIndex: number;
  fileName: string;
  progress: number;
  stage: 'reading' | 'compressing' | 'saving' | 'complete';
}

const STORAGE_KEY = 'mediaLibrary';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit (after compression)
const MAX_ORIGINAL_SIZE = 50 * 1024 * 1024; // 50MB original file limit
const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50MB total limit

// Convert file to base64 data URL
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

// Get image dimensions from data URL
const getImageDimensions = (dataUrl: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
};

// Calculate total storage size
const calculateTotalSize = (images: MediaFile[]): number => {
  return images.reduce((total, img) => total + (img.size || 0), 0);
};

// Clean invalid entries from storage
const cleanMediaLibrary = (images: MediaFile[]): MediaFile[] => {
  return images.filter(img => {
    if (!img.id || !img.name || !img.url || !img.uploadDate) {
      return false;
    }
    // Validate data URL format
    if (!img.url.startsWith('data:image/')) {
      return false;
    }
    return true;
  });
};

export const useMediaLibrary = () => {
  const [images, setImages] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);

  // Load images from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedImages = JSON.parse(stored) as MediaFile[];
        const cleanedImages = cleanMediaLibrary(parsedImages);
        
        if (cleanedImages.length !== parsedImages.length) {
          // Save cleaned data back to localStorage
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedImages));
        }
        
        setImages(cleanedImages);
      }
    } catch (error) {
      console.error('Failed to load media library:', error);
      // Clear corrupted data
      localStorage.removeItem(STORAGE_KEY);
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
      } catch (error) {
        console.error('Failed to save media library:', error);
      }
    }
  }, [images, loading]);

  const addImages = useCallback(async (
    files: FileList,
    onProgress?: (progress: UploadProgress[]) => void
  ): Promise<{ success: MediaFile[], errors: string[] }> => {
    const success: MediaFile[] = [];
    const errors: string[] = [];
    const progressArray: UploadProgress[] = [];
    
    // Initialize progress tracking
    for (let i = 0; i < files.length; i++) {
      progressArray.push({
        fileIndex: i,
        fileName: files[i].name,
        progress: 0,
        stage: 'reading'
      });
    }
    setUploadProgress(progressArray);
    onProgress?.(progressArray);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      const updateProgress = (progress: number, stage: UploadProgress['stage']) => {
        progressArray[i] = { ...progressArray[i], progress, stage };
        setUploadProgress([...progressArray]);
        onProgress?.([...progressArray]);
      };
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name}: Not an image file`);
        updateProgress(100, 'complete');
        continue;
      }
      
      // Validate original file size
      if (file.size > MAX_ORIGINAL_SIZE) {
        errors.push(`${file.name}: File too large (max ${formatFileSize(MAX_ORIGINAL_SIZE)})`);
        updateProgress(100, 'complete');
        continue;
      }
      
      try {
        updateProgress(10, 'reading');
        
        // Compress the image
        updateProgress(20, 'compressing');
        const compressionResult = await compressImage(
          file, 
          { maxSizeBytes: MAX_FILE_SIZE },
          (compressProgress) => {
            updateProgress(20 + (compressProgress * 0.6), 'compressing');
          }
        );
        
        updateProgress(85, 'saving');
        
        // Check total storage limit with compressed size
        const currentSize = calculateTotalSize(images) + calculateTotalSize(success);
        if (currentSize + compressionResult.compressedSize > MAX_TOTAL_SIZE) {
          errors.push(`${file.name}: Storage limit exceeded (max ${formatFileSize(MAX_TOTAL_SIZE)} total)`);
          updateProgress(100, 'complete');
          continue;
        }
        
        const newImage: MediaFile = {
          id: `img-${Date.now()}-${i}`,
          name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
          url: compressionResult.compressedFile,
          uploadDate: new Date().toISOString(),
          size: compressionResult.compressedSize,
          originalSize: compressionResult.originalSize,
          compressionRatio: compressionResult.compressionRatio,
          dimensions: compressionResult.dimensions
        };
        
        updateProgress(100, 'complete');
        success.push(newImage);
      } catch (error) {
        errors.push(`${file.name}: Failed to process file`);
        updateProgress(100, 'complete');
      }
    }
    
    if (success.length > 0) {
      setImages(prev => [...prev, ...success]);
    }
    
    // Clear progress after a delay
    setTimeout(() => {
      setUploadProgress([]);
    }, 2000);
    
    return { success, errors };
  }, [images]);

  const removeImage = useCallback((id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  }, []);

  const updateImage = useCallback((id: string, updates: Partial<MediaFile>) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, ...updates } : img
    ));
  }, []);

  const clearAll = useCallback(() => {
    setImages([]);
    localStorage.removeItem(STORAGE_KEY);
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