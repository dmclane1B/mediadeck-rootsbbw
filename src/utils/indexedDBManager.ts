// IndexedDB Manager for Media Storage
const DB_NAME = 'LovableMediaDB';
const DB_VERSION = 1;
const STORE_NAME = 'mediaFiles';

export interface MediaFile {
  id: string;
  name: string;
  url: string; // base64 data URL
  uploadDate: string;
  dimensions?: { width: number; height: number };
  size?: number;
}

class IndexedDBManager {
  private db: IDBDatabase | null = null;
  private dbPromise: Promise<IDBDatabase> | null = null;

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
        
        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('uploadDate', 'uploadDate', { unique: false });
          store.createIndex('size', 'size', { unique: false });
        }
      };
    });

    return this.dbPromise;
  }

  async getAllImages(): Promise<MediaFile[]> {
    try {
      const db = await this.openDB();
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        
        request.onsuccess = () => {
          resolve(request.result || []);
        };
        
        request.onerror = () => {
          reject(new Error(`Error retrieving images: ${request.error?.message}`));
        };
      });
    } catch (error) {
      console.error('Error in getAllImages:', error);
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
}

// Export singleton instance
export const indexedDBManager = new IndexedDBManager();
