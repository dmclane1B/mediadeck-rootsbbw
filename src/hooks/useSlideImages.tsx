import { useState, useEffect } from 'react';
import { indexedDBManager } from '@/utils/indexedDBManager';

export interface SlideImage {
  id: string;
  name: string;
  url: string;
  uploadDate: string;
  dimensions?: { width: number; height: number };
  size?: number;
}

export interface SlideConfiguration {
  [slideId: string]: {
    imageId: string;
    imageAlt?: string;
  };
}

const SLIDE_CONFIG_KEY = 'slide-configurations';

// Clean configuration by removing invalid entries
const cleanSlideConfiguration = (config: SlideConfiguration): SlideConfiguration => {
  const cleanedConfig: SlideConfiguration = {};
  
  Object.entries(config).forEach(([slideId, slideData]) => {
    if (slideData?.imageId) {
      cleanedConfig[slideId] = slideData;
    }
  });
  
  return cleanedConfig;
};

export const useSlideImages = () => {
  const [slideConfig, setSlideConfig] = useState<SlideConfiguration>({});
  
  useEffect(() => {
    const savedConfig = localStorage.getItem(SLIDE_CONFIG_KEY);
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        const cleanedConfig = cleanSlideConfiguration(parsedConfig);
        
        // If we had to clean invalid entries, save the cleaned version
        if (Object.keys(cleanedConfig).length !== Object.keys(parsedConfig).length) {
          console.log('Cleaned invalid image URLs from slide configuration');
          localStorage.setItem(SLIDE_CONFIG_KEY, JSON.stringify(cleanedConfig));
        }
        
        setSlideConfig(cleanedConfig);
      } catch (error) {
        console.error('Error loading slide configurations:', error);
      }
    }
  }, []);

  const saveConfiguration = (config: SlideConfiguration) => {
    setSlideConfig(config);
    try {
      localStorage.setItem(SLIDE_CONFIG_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Failed to save slide configuration:', error);
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        const quotaError = new Error('Storage quota exceeded');
        quotaError.name = 'QuotaExceededError';
        throw quotaError;
      }
      throw error;
    }
  };

  const setSlideImage = (slideId: string, image: SlideImage | null) => {
    const newConfig = { ...slideConfig };
    
    if (image) {
      newConfig[slideId] = {
        imageId: image.id,
        imageAlt: image.name
      };
    } else {
      delete newConfig[slideId];
    }
    
    saveConfiguration(newConfig);
  };

  const getSlideImage = (slideId: string) => {
    return slideConfig[slideId] || null;
  };

  const clearAllConfigurations = () => {
    setSlideConfig({});
    localStorage.removeItem(SLIDE_CONFIG_KEY);
  };

  const cleanInvalidImages = () => {
    const cleanedConfig = cleanSlideConfiguration(slideConfig);
    saveConfiguration(cleanedConfig);
    return Object.keys(slideConfig).length - Object.keys(cleanedConfig).length;
  };

  const cleanupUnusedImages = async (): Promise<number> => {
    try {
      // Get all images from IndexedDB
      const allImages = await indexedDBManager.getAllImages();
      
      // Get all used image IDs from slide configurations
      const usedImageIds = new Set(
        Object.values(slideConfig)
          .map(config => config.imageId)
          .filter(Boolean)
      );
      
      // Find unused images
      const unusedImages = allImages.filter(image => !usedImageIds.has(image.id));
      
      // Remove unused images
      let deletedCount = 0;
      for (const image of unusedImages) {
        try {
          await indexedDBManager.removeImage(image.id);
          deletedCount++;
        } catch (error) {
          console.error(`Failed to delete unused image ${image.id}:`, error);
        }
      }
      
      return deletedCount;
    } catch (error) {
      console.error('Error during cleanup of unused images:', error);
      return 0;
    }
  };

  return {
    slideConfig,
    setSlideImage,
    getSlideImage,
    clearAllConfigurations,
    cleanInvalidImages,
    cleanupUnusedImages,
    saveConfiguration
  };
};

export default useSlideImages;