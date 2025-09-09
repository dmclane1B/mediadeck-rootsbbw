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

export const useSlideImages = () => {
  const [slideConfig, setSlideConfig] = useState<SlideConfiguration>({});
  
  useEffect(() => {
    const savedConfig = localStorage.getItem(SLIDE_CONFIG_KEY);
    if (savedConfig) {
      try {
        setSlideConfig(JSON.parse(savedConfig));
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

  return {
    slideConfig,
    setSlideImage,
    getSlideImage,
    clearAllConfigurations,
    saveConfiguration
  };
};

export default useSlideImages;