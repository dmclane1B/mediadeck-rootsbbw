import { useState, useEffect } from 'react';

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
    imageId?: string;
    imageUrl?: string;
    imageAlt?: string;
  };
}

const SLIDE_CONFIG_KEY = 'slide-configurations';

// Enhanced URL validation utility with better base64 support
const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  const trimmedUrl = url.trim();
  if (!trimmedUrl) return false;
  
  // Check for common invalid patterns
  const invalidPatterns = ['undefined', 'null', '[object Object]', 'NaN'];
  if (invalidPatterns.includes(trimmedUrl)) return false;
  
  // Handle data URLs (base64) with regex - more reliable for long strings
  if (trimmedUrl.startsWith('data:')) {
    const dataUrlPattern = /^data:image\/(jpeg|jpg|png|gif|webp|svg\+xml);base64,[A-Za-z0-9+/]+=*$/;
    return dataUrlPattern.test(trimmedUrl);
  }
  
  // Handle blob URLs
  if (trimmedUrl.startsWith('blob:')) {
    return true;
  }
  
  // Handle relative paths
  if (trimmedUrl.match(/^[./]/) || trimmedUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    return true;
  }
  
  // Handle http/https URLs with URL constructor
  try {
    const urlObj = new URL(trimmedUrl);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Clean configuration by removing invalid entries
const cleanSlideConfiguration = (config: SlideConfiguration): SlideConfiguration => {
  const cleanedConfig: SlideConfiguration = {};
  
  Object.entries(config).forEach(([slideId, slideData]) => {
    if (slideData?.imageUrl && isValidImageUrl(slideData.imageUrl)) {
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
        throw new Error('QuotaExceededError');
      }
      throw error;
    }
  };

  const setSlideImage = (slideId: string, image: SlideImage | null) => {
    const newConfig = { ...slideConfig };
    
    if (image) {
      newConfig[slideId] = {
        imageId: image.id,
        imageUrl: image.url,
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

  return {
    slideConfig,
    setSlideImage,
    getSlideImage,
    clearAllConfigurations,
    cleanInvalidImages,
    saveConfiguration
  };
};

export default useSlideImages;