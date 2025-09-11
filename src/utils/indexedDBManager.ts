// IndexedDB Manager for Media Storage and Slide Configurations
const DB_NAME = 'LovableMediaDB';
const DB_VERSION = 2;
const STORE_NAME = 'mediaFiles';
const SLIDE_CONFIG_STORE = 'slideConfigurations';

export interface MediaFile {
  id: string;
  name: string;
  url: string; // base64 data URL for local storage
  uploadDate: string;
  dimensions?: { width: number; height: number };
  size?: number;
  // Cloud sync fields
  cloudPath?: string; // path in Supabase storage
  publicUrl?: string; // public URL from Supabase
  source: 'local' | 'cloud' | 'synced'; // track sync status
}

export interface SlideConfiguration {
  slideId: string;
  imageId: string;
  imageAlt?: string;
  lastUpdated: string;
}

class IndexedDBManager {
  private db: IDBDatabase | null = null;
  private dbPromise: Promise<IDBDatabase> | null = null;
  private initialized = false;
  private initPromise: Promise<void> | null = null;

  private async openDB(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db;
    }

    if (this.dbPromise) {
      return this.dbPromise;
    }

    this.dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        reject(new Error(`IndexedDB error: ${request.error?.message}`));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create media files store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('uploadDate', 'uploadDate', { unique: false });
          store.createIndex('size', 'size', { unique: false });
        }
        
        // Create slide configurations store if it doesn't exist
        if (!db.objectStoreNames.contains(SLIDE_CONFIG_STORE)) {
          const slideStore = db.createObjectStore(SLIDE_CONFIG_STORE, { keyPath: 'slideId' });
          slideStore.createIndex('lastUpdated', 'lastUpdated', { unique: false });
        }
      };
    });

    return this.dbPromise;
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      console.log('[IndexedDB] Already initialized');
      return;
    }
    
    if (this.initPromise) {
      console.log('[IndexedDB] Initialization in progress, waiting...');
      return this.initPromise;
    }
    
    this.initPromise = (async () => {
      try {
        console.log('[IndexedDB] Starting initialization...');
        
        // Check if IndexedDB is available
        if (!window.indexedDB) {
          throw new Error('IndexedDB not supported in this browser');
        }
        
        await this.openDB();
        this.initialized = true;
        console.log('[IndexedDB] Successfully initialized');
        
        // Perform migration if needed
        try {
          const migrationResult = await this.migrateFromLocalStorage();
          if (migrationResult.migrated > 0) {
            console.log(`[IndexedDB] Migrated ${migrationResult.migrated} slide configurations from localStorage`);
          }
          if (migrationResult.errors.length > 0) {
            console.warn('[IndexedDB] Migration errors:', migrationResult.errors);
          }
        } catch (migrationError) {
          console.warn('[IndexedDB] Migration failed, but continuing:', migrationError);
        }
        
      } catch (error) {
        console.error('[IndexedDB] Failed to initialize:', error);
        this.initialized = false;
        this.initPromise = null;
        throw error;
      }
    })();
    
    return this.initPromise;
  }

  async getAllImages(): Promise<MediaFile[]> {
    try {
      console.log('[IndexedDB] Getting all images...');
      
      // Ensure we're initialized first
      await this.initialize();
      
      const db = await this.openDB();
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        
        request.onsuccess = () => {
          const result = request.result || [];
          console.log(`[IndexedDB] Retrieved ${result.length} images from database`);
          
          // Log each image for debugging
          result.forEach((img, index) => {
            console.log(`[IndexedDB] Image ${index + 1}:`, {
              id: img.id,
              name: img.name,
              uploadDate: img.uploadDate,
              size: img.size,
              urlLength: img.url?.length || 0
            });
          });
          
          resolve(result);
        };
        
        request.onerror = () => {
          const errorMsg = `Error retrieving images: ${request.error?.message}`;
          console.error('[IndexedDB]', errorMsg);
          reject(new Error(errorMsg));
        };
        
        // Add transaction error handling
        transaction.onerror = () => {
          const errorMsg = `Transaction error in getAllImages: ${transaction.error?.message}`;
          console.error('[IndexedDB]', errorMsg);
          reject(new Error(errorMsg));
        };
        
        transaction.onabort = () => {
          const errorMsg = 'Transaction aborted in getAllImages';
          console.error('[IndexedDB]', errorMsg);
          reject(new Error(errorMsg));
        };
      });
    } catch (error) {
      console.error('[IndexedDB] Error in getAllImages:', error);
      
      // Provide detailed error information
      if (error instanceof Error) {
        console.error('[IndexedDB] Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
      
      // Return empty array as fallback
      return [];
    }
  }

  async addImage(image: MediaFile): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.add(image);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = () => {
        reject(new Error(`Error adding image: ${request.error?.message}`));
      };
    });
  }

  async updateImage(id: string, updates: Partial<MediaFile>): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const getRequest = store.get(id);
      
      getRequest.onsuccess = () => {
        const existingImage = getRequest.result;
        if (!existingImage) {
          reject(new Error('Image not found'));
          return;
        }
        
        const updatedImage = { ...existingImage, ...updates };
        const putRequest = store.put(updatedImage);
        
        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject(new Error(`Error updating image: ${putRequest.error?.message}`));
      };
      
      getRequest.onerror = () => {
        reject(new Error(`Error retrieving image: ${getRequest.error?.message}`));
      };
    });
  }

  async removeImage(id: string): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = () => {
        reject(new Error(`Error removing image: ${request.error?.message}`));
      };
    });
  }

  async clearAll(): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.clear();
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = () => {
        reject(new Error(`Error clearing images: ${request.error?.message}`));
      };
    });
  }

  async getStorageUsage(): Promise<{ usedSize: number; estimatedQuota: number }> {
    try {
      // Get estimate if available (modern browsers)
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        return {
          usedSize: estimate.usage || 0,
          estimatedQuota: estimate.quota || 0
        };
      }
      
      // Fallback: calculate from our stored data
      const images = await this.getAllImages();
      const usedSize = images.reduce((total, img) => total + (img.size || 0), 0);
      
      return {
        usedSize,
        estimatedQuota: 1024 * 1024 * 1024 // 1GB estimate for IndexedDB
      };
    } catch (error) {
      console.error('Error getting storage usage:', error);
      return { usedSize: 0, estimatedQuota: 0 };
    }
  }

  // Cleanup old/unused images based on various criteria
  async cleanup(options: {
    maxAge?: number; // days
    maxTotalSize?: number; // bytes
    keepRecentCount?: number;
  } = {}): Promise<number> {
    try {
      const images = await this.getAllImages();
      const now = Date.now();
      let deletedCount = 0;
      
      // Sort by upload date (oldest first)
      const sortedImages = images.sort((a, b) => 
        new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
      );
      
      // Remove images older than maxAge
      if (options.maxAge) {
        const maxAgeMs = options.maxAge * 24 * 60 * 60 * 1000;
        const cutoffDate = now - maxAgeMs;
        
        for (const image of sortedImages) {
          if (new Date(image.uploadDate).getTime() < cutoffDate) {
            await this.removeImage(image.id);
            deletedCount++;
          }
        }
      }
      
      // Remove oldest images if total size exceeds limit
      if (options.maxTotalSize) {
        const remainingImages = await this.getAllImages();
        let totalSize = remainingImages.reduce((sum, img) => sum + (img.size || 0), 0);
        
        const sortedRemaining = remainingImages.sort((a, b) => 
          new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
        );
        
        for (const image of sortedRemaining) {
          if (totalSize <= options.maxTotalSize) break;
          
          await this.removeImage(image.id);
          totalSize -= (image.size || 0);
          deletedCount++;
        }
      }
      
      // Keep only the most recent N images
      if (options.keepRecentCount) {
        const remainingImages = await this.getAllImages();
        if (remainingImages.length > options.keepRecentCount) {
          const sortedRemaining = remainingImages.sort((a, b) => 
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
          );
          
          const toDelete = sortedRemaining.slice(options.keepRecentCount);
          for (const image of toDelete) {
            await this.removeImage(image.id);
            deletedCount++;
          }
        }
      }
      
      return deletedCount;
    } catch (error) {
      console.error('Error during cleanup:', error);
      return 0;
    }
  }

  // Slide Configuration Management
  async getSlideConfiguration(slideId: string): Promise<SlideConfiguration | null> {
    try {
      await this.initialize();
      const db = await this.openDB();
      const transaction = db.transaction([SLIDE_CONFIG_STORE], 'readonly');
      const store = transaction.objectStore(SLIDE_CONFIG_STORE);
      
      return new Promise((resolve, reject) => {
        const request = store.get(slideId);
        
        request.onsuccess = () => {
          resolve(request.result || null);
        };
        
        request.onerror = () => {
          reject(new Error(`Error getting slide configuration: ${request.error?.message}`));
        };
      });
    } catch (error) {
      console.error('Error in getSlideConfiguration:', error);
      return null;
    }
  }

  async setSlideConfiguration(config: SlideConfiguration): Promise<void> {
    await this.initialize();
    const db = await this.openDB();
    const transaction = db.transaction([SLIDE_CONFIG_STORE], 'readwrite');
    const store = transaction.objectStore(SLIDE_CONFIG_STORE);
    
    return new Promise((resolve, reject) => {
      const request = store.put(config);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = () => {
        reject(new Error(`Error setting slide configuration: ${request.error?.message}`));
      };
    });
  }

  async getAllSlideConfigurations(): Promise<SlideConfiguration[]> {
    try {
      await this.initialize();
      const db = await this.openDB();
      const transaction = db.transaction([SLIDE_CONFIG_STORE], 'readonly');
      const store = transaction.objectStore(SLIDE_CONFIG_STORE);
      
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        
        request.onsuccess = () => {
          resolve(request.result || []);
        };
        
        request.onerror = () => {
          reject(new Error(`Error getting all slide configurations: ${request.error?.message}`));
        };
      });
    } catch (error) {
      console.error('Error in getAllSlideConfigurations:', error);
      return [];
    }
  }

  async removeSlideConfiguration(slideId: string): Promise<void> {
    await this.initialize();
    const db = await this.openDB();
    const transaction = db.transaction([SLIDE_CONFIG_STORE], 'readwrite');
    const store = transaction.objectStore(SLIDE_CONFIG_STORE);
    
    return new Promise((resolve, reject) => {
      const request = store.delete(slideId);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = () => {
        reject(new Error(`Error removing slide configuration: ${request.error?.message}`));
      };
    });
  }

  async clearAllSlideConfigurations(): Promise<void> {
    await this.initialize();
    const db = await this.openDB();
    const transaction = db.transaction([SLIDE_CONFIG_STORE], 'readwrite');
    const store = transaction.objectStore(SLIDE_CONFIG_STORE);
    
    return new Promise((resolve, reject) => {
      const request = store.clear();
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = () => {
        reject(new Error(`Error clearing slide configurations: ${request.error?.message}`));
      };
    });
  }

  // Migration from localStorage
  async migrateFromLocalStorage(): Promise<{ migrated: number; errors: string[] }> {
    const results = { migrated: 0, errors: [] };
    
    try {
      await this.initialize();
      
      // Check for existing localStorage slide configurations
      const SLIDE_CONFIG_KEY = 'slide-configurations';
      const savedConfig = localStorage.getItem(SLIDE_CONFIG_KEY);
      
      if (savedConfig) {
        try {
          const parsedConfig = JSON.parse(savedConfig);
          
          // Convert localStorage format to IndexedDB format
          for (const [slideId, slideData] of Object.entries(parsedConfig)) {
            if (slideData && typeof slideData === 'object' && (slideData as any).imageId) {
              const config: SlideConfiguration = {
                slideId,
                imageId: (slideData as any).imageId,
                imageAlt: (slideData as any).imageAlt,
                lastUpdated: new Date().toISOString()
              };
              
              try {
                await this.setSlideConfiguration(config);
                results.migrated++;
              } catch (error) {
                results.errors.push(`Failed to migrate slide ${slideId}: ${error}`);
              }
            }
          }
          
          // Remove old localStorage data after successful migration
          if (results.migrated > 0) {
            localStorage.removeItem(SLIDE_CONFIG_KEY);
          }
        } catch (error) {
          results.errors.push(`Failed to parse localStorage data: ${error}`);
        }
      }
    } catch (error) {
      results.errors.push(`Migration failed: ${error}`);
    }
    
    return results;
  }
}

// Export singleton instance
export const indexedDBManager = new IndexedDBManager();
