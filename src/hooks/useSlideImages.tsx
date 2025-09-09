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

// Enhanced URL validation utility (same as in ImageShowcase)
const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  const trimmedUrl = url.trim();
  if (!trimmedUrl) return false;
  
  // Check for common invalid patterns
  const invalidPatterns = ['undefined', 'null', '[object Object]', 'NaN'];
  if (invalidPatterns.includes(trimmedUrl)) return false;
  
  try {
    // Check if it's a valid URL structure
    const urlObj = new URL(trimmedUrl);
    // Accept http, https, blob, and data URLs
    if (!['http:', 'https:', 'blob:', 'data:'].includes(urlObj.protocol)) {
      return false;
    }
    return true;
  } catch {
    // If URL constructor fails, check if it's a relative path
    return trimmedUrl.match(/^[./]/) !== null || trimmedUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) !== null;
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
    localStorage.setItem(SLIDE_CONFIG_KEY, JSON.stringify(config));
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