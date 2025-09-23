import { useState, useEffect } from 'react';
import { indexedDBManager } from '@/utils/indexedDBManager';
import { migrateSlideIds, isMigrationNeeded } from '@/utils/slideIdMigration';

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

export const useSlideImages = () => {
  const [slideConfig, setSlideConfig] = useState<SlideConfiguration>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadConfigurations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Initialize IndexedDB
        await indexedDBManager.initialize();
        
        // Try migration from localStorage first
        const migrationResult = await indexedDBManager.migrateFromLocalStorage();
        if (migrationResult.migrated > 0) {
          console.log(`Migrated ${migrationResult.migrated} slide configurations from localStorage`);
        }
        if (migrationResult.errors.length > 0) {
          console.warn('Migration errors:', migrationResult.errors);
        }
        
        // Check if we need to migrate old slide IDs to new ones
        if (await isMigrationNeeded()) {
          console.log('Slide ID migration needed, starting migration...');
          const slideIdMigrationResult = await migrateSlideIds();
          if (slideIdMigrationResult.migrated > 0) {
            console.log(`Migrated ${slideIdMigrationResult.migrated} slide configurations to new slide IDs`);
          }
          if (slideIdMigrationResult.errors.length > 0) {
            console.warn('Slide ID migration errors:', slideIdMigrationResult.errors);
          }
        }
        
        // Load configurations from IndexedDB
        const configs = await indexedDBManager.getAllSlideConfigurations();
        const configMap: SlideConfiguration = {};
        
        configs.forEach(config => {
          configMap[config.slideId] = {
            imageId: config.imageId,
            imageAlt: config.imageAlt
          };
        });
        
        setSlideConfig(configMap);
      } catch (error) {
        console.error('Error loading slide configurations:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        // Fallback to empty configuration
        setSlideConfig({});
      } finally {
        setLoading(false);
      }
    };

    loadConfigurations();
  }, []);

  const saveConfiguration = async (config: SlideConfiguration) => {
    setSlideConfig(config);
    try {
      // Save each configuration to IndexedDB
      for (const [slideId, slideData] of Object.entries(config)) {
        if (slideData?.imageId) {
          await indexedDBManager.setSlideConfiguration({
            slideId,
            imageId: slideData.imageId,
            imageAlt: slideData.imageAlt,
            lastUpdated: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      console.error('Failed to save slide configuration:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  };

  const setSlideImage = async (slideId: string, image: SlideImage | null) => {
    // Store previous state for rollback
    const previousConfig = slideConfig[slideId] || null;
    
    try {
      if (image) {
        // Update UI immediately (optimistic update)
        setSlideConfig(prev => ({
          ...prev,
          [slideId]: {
            imageId: image.id,
            imageAlt: image.name
          }
        }));
        
        // Persist to IndexedDB in background
        await indexedDBManager.setSlideConfiguration({
          slideId,
          imageId: image.id,
          imageAlt: image.name,
          lastUpdated: new Date().toISOString()
        });
      } else {
        // Update UI immediately (optimistic update)
        setSlideConfig(prev => {
          const newConfig = { ...prev };
          delete newConfig[slideId];
          return newConfig;
        });
        
        // Persist to IndexedDB in background
        await indexedDBManager.removeSlideConfiguration(slideId);
      }
    } catch (error) {
      console.error('Error persisting slide image:', error);
      
      // Rollback UI state on persistence failure
      if (previousConfig) {
        setSlideConfig(prev => ({
          ...prev,
          [slideId]: previousConfig
        }));
      } else {
        setSlideConfig(prev => {
          const newConfig = { ...prev };
          delete newConfig[slideId];
          return newConfig;
        });
      }
      
      setError(error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  };

  const getSlideImage = (slideId: string) => {
    return slideConfig[slideId] || null;
  };

  const clearAllConfigurations = async () => {
    try {
      await indexedDBManager.clearAllSlideConfigurations();
      setSlideConfig({});
    } catch (error) {
      console.error('Error clearing configurations:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  };

  const cleanInvalidImages = async () => {
    try {
      // Get all images to validate configurations
      const allImages = await indexedDBManager.getAllImages();
      const validImageIds = new Set(allImages.map(img => img.id));
      
      let cleanedCount = 0;
      const cleanedConfig: SlideConfiguration = {};
      
      // Check each configuration
      for (const [slideId, slideData] of Object.entries(slideConfig)) {
        if (slideData?.imageId && validImageIds.has(slideData.imageId)) {
          cleanedConfig[slideId] = slideData;
        } else {
          // Remove invalid configuration
          await indexedDBManager.removeSlideConfiguration(slideId);
          cleanedCount++;
        }
      }
      
      setSlideConfig(cleanedConfig);
      return cleanedCount;
    } catch (error) {
      console.error('Error cleaning invalid images:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
      return 0;
    }
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
    loading,
    error,
    setSlideImage,
    getSlideImage,
    clearAllConfigurations,
    cleanInvalidImages,
    cleanupUnusedImages,
    saveConfiguration
  };
};

export default useSlideImages;