import { useState, useEffect, useCallback } from 'react';

export interface MediaFile {
  id: string;
  name: string;
  url: string; // base64 data URL for persistence
  uploadDate: string;
  dimensions?: { width: number; height: number };
  size?: number;
}

const STORAGE_KEY = 'mediaLibrary';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
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

  const addImages = useCallback(async (files: FileList): Promise<{ success: MediaFile[], errors: string[] }> => {
    const success: MediaFile[] = [];
    const errors: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name}: Not an image file`);
        continue;
      }
      
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: File too large (max 5MB)`);
        continue;
      }
      
      try {
        // Convert to base64
        const dataUrl = await fileToBase64(file);
        
        // Check total storage limit
        const currentSize = calculateTotalSize(images) + calculateTotalSize(success);
        if (currentSize + file.size > MAX_TOTAL_SIZE) {
          errors.push(`${file.name}: Storage limit exceeded (max 50MB total)`);
          continue;
        }
        
        const newImage: MediaFile = {
          id: `img-${Date.now()}-${i}`,
          name: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
          url: dataUrl,
          uploadDate: new Date().toISOString(),
          size: file.size
        };
        
        // Get dimensions asynchronously
        try {
          const dimensions = await getImageDimensions(dataUrl);
          newImage.dimensions = dimensions;
        } catch {
          // Dimensions loading failed, but that's okay
        }
        
        success.push(newImage);
      } catch (error) {
        errors.push(`${file.name}: Failed to process file`);
      }
    }
    
    if (success.length > 0) {
      setImages(prev => [...prev, ...success]);
    }
    
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
    addImages,
    removeImage,
    updateImage,
    clearAll,
    getStorageInfo
  };
};