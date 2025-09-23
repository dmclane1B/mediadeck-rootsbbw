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
  private connectionHealthy = false;
  private readonly maxRetries = 3;
  private readonly baseRetryDelay = 100;

  private async openDB(): Promise<IDBDatabase> {
    // If we have a healthy connection, return it
    if (this.db && this.connectionHealthy) {
      return this.db;
    }

    // If there's already a connection attempt in progress, wait for it
    if (this.dbPromise) {
      try {
        const db = await this.dbPromise;
        if (this.isConnectionHealthy(db)) {
          this.db = db;
          this.connectionHealthy = true;
          return db;
        }
      } catch (error) {
        console.warn('[IndexedDB] Previous connection attempt failed, retrying...', error);
        this.dbPromise = null;
      }
    }

    // Create new connection
    this.dbPromise = new Promise((resolve, reject) => {
      console.log('[IndexedDB] Opening new database connection...');
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('[IndexedDB] Database open failed:', request.error);
        this.connectionHealthy = false;
        this.dbPromise = null;
        reject(new Error(`IndexedDB error: ${request.error?.message}`));
      };

      request.onsuccess = () => {
        console.log('[IndexedDB] Database opened successfully');
        const db = request.result;
        
        // Set up connection event handlers
        db.onclose = () => {
          console.warn('[IndexedDB] Database connection closed unexpectedly');
          this.connectionHealthy = false;
          this.db = null;
          this.dbPromise = null;
        };

        db.onerror = (event) => {
          console.error('[IndexedDB] Database error:', event);
          this.connectionHealthy = false;
        };

        this.db = db;
        this.connectionHealthy = true;
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        console.log('[IndexedDB] Database upgrade needed');
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create media files store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          console.log('[IndexedDB] Creating media files store');
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('uploadDate', 'uploadDate', { unique: false });
          store.createIndex('size', 'size', { unique: false });
        }
        
        // Create slide configurations store if it doesn't exist
        if (!db.objectStoreNames.contains(SLIDE_CONFIG_STORE)) {
          console.log('[IndexedDB] Creating slide configurations store');
          const slideStore = db.createObjectStore(SLIDE_CONFIG_STORE, { keyPath: 'slideId' });
          slideStore.createIndex('lastUpdated', 'lastUpdated', { unique: false });
        }
      };
    });

    return this.dbPromise;
  }

  private isConnectionHealthy(db: IDBDatabase): boolean {
    try {
      // Simple health check - try to access basic properties
      return db && db.name === DB_NAME && !db.onerror;
    } catch {
      return false;
    }
  }

  private async executeWithRetry<T>(
    operation: (db: IDBDatabase) => Promise<T>,
    context: string
  ): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        console.log(`[IndexedDB] ${context} - Attempt ${attempt + 1}/${this.maxRetries}`);
        
        const db = await this.openDB();
        if (!this.isConnectionHealthy(db)) {
          throw new Error('Database connection unhealthy');
        }
        
        const result = await operation(db);
        console.log(`[IndexedDB] ${context} - Success on attempt ${attempt + 1}`);
        return result;
        
      } catch (error) {
        lastError = error as Error;
        console.warn(`[IndexedDB] ${context} - Attempt ${attempt + 1} failed:`, error);
        
        // Mark connection as unhealthy for certain errors
        if (error instanceof Error && (
          error.message.includes('connection is closing') ||
          error.message.includes('InvalidStateError') ||
          error.message.includes('database connection')
        )) {
          console.log('[IndexedDB] Marking connection as unhealthy due to error type');
          this.connectionHealthy = false;
          this.db = null;
          this.dbPromise = null;
        }
        
        // Don't retry on the last attempt
        if (attempt === this.maxRetries - 1) {
          break;
        }
        
        // Exponential backoff with jitter
        const delay = this.baseRetryDelay * Math.pow(2, attempt) + Math.random() * 50;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    console.error(`[IndexedDB] ${context} - All attempts failed`);
    throw lastError || new Error(`${context} failed after ${this.maxRetries} attempts`);
  }

  async initialize(): Promise<void> {
    if (this.initialized && this.connectionHealthy) {
      console.log('[IndexedDB] Already initialized and healthy');
      return;
    }
    
    if (this.initPromise) {
      console.log('[IndexedDB] Initialization in progress, waiting...');
      try {
        await this.initPromise;
        return;
      } catch (error) {
        console.warn('[IndexedDB] Previous initialization failed, retrying...', error);
        this.initPromise = null;
      }
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
        this.connectionHealthy = false;
        this.initPromise = null;
        throw error;
      }
    })();
    
    return this.initPromise;
  }

  async getAllImages(): Promise<MediaFile[]> {
    return this.executeWithRetry(async (db) => {
      return new Promise<MediaFile[]>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();
        
        request.onsuccess = () => {
          const result = request.result || [];
          console.log(`[IndexedDB] Retrieved ${result.length} images from database`);
          resolve(result);
        };
        
        request.onerror = () => {
          const errorMsg = `Error retrieving images: ${request.error?.message}`;
          console.error('[IndexedDB]', errorMsg);
          reject(new Error(errorMsg));
        };
        
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
    }, 'getAllImages');
  }

  async addImage(image: MediaFile): Promise<void> {
    return this.executeWithRetry(async (db) => {
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(image);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error(`Error adding image: ${request.error?.message}`));
        transaction.onerror = () => reject(new Error(`Transaction error: ${transaction.error?.message}`));
      });
    }, 'addImage');
  }

  async addOrUpdateImage(image: MediaFile): Promise<void> {
    return this.executeWithRetry(async (db) => {
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(image); // Use put instead of add to allow updates
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error(`Error adding/updating image: ${request.error?.message}`));
        transaction.onerror = () => reject(new Error(`Transaction error: ${transaction.error?.message}`));
      });
    }, 'addOrUpdateImage');
  }

  async updateImage(id: string, updates: Partial<MediaFile>): Promise<void> {
    return this.executeWithRetry(async (db) => {
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
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
        
        getRequest.onerror = () => reject(new Error(`Error retrieving image: ${getRequest.error?.message}`));
        transaction.onerror = () => reject(new Error(`Transaction error: ${transaction.error?.message}`));
      });
    }, 'updateImage');
  }

  async removeImage(id: string): Promise<void> {
    return this.executeWithRetry(async (db) => {
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error(`Error removing image: ${request.error?.message}`));
        transaction.onerror = () => reject(new Error(`Transaction error: ${transaction.error?.message}`));
      });
    }, 'removeImage');
  }

  async clearAll(): Promise<void> {
    return this.executeWithRetry(async (db) => {
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error(`Error clearing images: ${request.error?.message}`));
        transaction.onerror = () => reject(new Error(`Transaction error: ${transaction.error?.message}`));
      });
    }, 'clearAll');
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
    return this.executeWithRetry(async (db) => {
      return new Promise<SlideConfiguration | null>((resolve, reject) => {
        const transaction = db.transaction([SLIDE_CONFIG_STORE], 'readonly');
        const store = transaction.objectStore(SLIDE_CONFIG_STORE);
        const request = store.get(slideId);
        
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(new Error(`Error getting slide configuration: ${request.error?.message}`));
        transaction.onerror = () => reject(new Error(`Transaction error: ${transaction.error?.message}`));
      });
    }, 'getSlideConfiguration');
  }

  async setSlideConfiguration(config: SlideConfiguration): Promise<void> {
    return this.executeWithRetry(async (db) => {
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([SLIDE_CONFIG_STORE], 'readwrite');
        const store = transaction.objectStore(SLIDE_CONFIG_STORE);
        const request = store.put(config);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error(`Error setting slide configuration: ${request.error?.message}`));
        transaction.onerror = () => reject(new Error(`Transaction error: ${transaction.error?.message}`));
      });
    }, 'setSlideConfiguration');
  }

  async getAllSlideConfigurations(): Promise<SlideConfiguration[]> {
    return this.executeWithRetry(async (db) => {
      return new Promise<SlideConfiguration[]>((resolve, reject) => {
        const transaction = db.transaction([SLIDE_CONFIG_STORE], 'readonly');
        const store = transaction.objectStore(SLIDE_CONFIG_STORE);
        const request = store.getAll();
        
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(new Error(`Error getting all slide configurations: ${request.error?.message}`));
        transaction.onerror = () => reject(new Error(`Transaction error: ${transaction.error?.message}`));
      });
    }, 'getAllSlideConfigurations');
  }

  async removeSlideConfiguration(slideId: string): Promise<void> {
    return this.executeWithRetry(async (db) => {
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([SLIDE_CONFIG_STORE], 'readwrite');
        const store = transaction.objectStore(SLIDE_CONFIG_STORE);
        const request = store.delete(slideId);
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error(`Error removing slide configuration: ${request.error?.message}`));
        transaction.onerror = () => reject(new Error(`Transaction error: ${transaction.error?.message}`));
      });
    }, 'removeSlideConfiguration');
  }

  async clearAllSlideConfigurations(): Promise<void> {
    return this.executeWithRetry(async (db) => {
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([SLIDE_CONFIG_STORE], 'readwrite');
        const store = transaction.objectStore(SLIDE_CONFIG_STORE);
        const request = store.clear();
        
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error(`Error clearing slide configurations: ${request.error?.message}`));
        transaction.onerror = () => reject(new Error(`Transaction error: ${transaction.error?.message}`));
      });
    }, 'clearAllSlideConfigurations');
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
