import { useState, useEffect } from 'react';
import { ensureDatabaseInitialized } from '@/utils/databaseInitializer';
import { indexedDBManager } from '@/utils/indexedDBManager';

export interface StorageInfo {
  usedSize: number;
  estimatedQuota: number;
  usagePercent: number;
  imageCount: number;
  maxTotalSize: number;
}

export const useIndexedDBStorage = () => {
  const [storageInfo, setStorageInfo] = useState<StorageInfo>({
    usedSize: 0,
    estimatedQuota: 0,
    usagePercent: 0,
    imageCount: 0,
    maxTotalSize: 500 * 1024 * 1024 // 500MB default limit
  });
  
  const updateStorageInfo = async () => {
    try {
      // Ensure database is initialized first
      await ensureDatabaseInitialized();
      
      const [usage, images] = await Promise.all([
        indexedDBManager.getStorageUsage(),
        indexedDBManager.getAllImages()
      ]);
      
      const usagePercent = usage.estimatedQuota > 0 
        ? (usage.usedSize / usage.estimatedQuota) * 100 
        : 0;
      
      setStorageInfo({
        usedSize: usage.usedSize,
        estimatedQuota: usage.estimatedQuota,
        usagePercent,
        imageCount: images.length,
        maxTotalSize: 500 * 1024 * 1024 // 500MB
      });
    } catch (error) {
      console.error('Error updating storage info:', error);
    }
  };

  useEffect(() => {
    updateStorageInfo();
    
    // Update storage info periodically
    const interval = setInterval(updateStorageInfo, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const performCleanup = async (options: {
    maxAge?: number;
    maxTotalSize?: number;
    keepRecentCount?: number;
  } = {}) => {
    try {
      const deletedCount = await indexedDBManager.cleanup(options);
      await updateStorageInfo();
      return deletedCount;
    } catch (error) {
      console.error('Error performing cleanup:', error);
      throw error;
    }
  };

  const autoCleanup = async () => {
    try {
      // Auto cleanup with sensible defaults
      const deletedCount = await performCleanup({
        maxAge: 30, // Remove images older than 30 days
        maxTotalSize: 400 * 1024 * 1024, // Keep under 400MB
        keepRecentCount: 100 // Keep at most 100 most recent images
      });
      
      await updateStorageInfo();
      return deletedCount;
    } catch (error) {
      console.error('Error in auto cleanup:', error);
      return 0;
    }
  };

  const shouldShowWarning = () => {
    return storageInfo.usagePercent > 80; // Show warning at 80%
  };

  const shouldShowCritical = () => {
    return storageInfo.usagePercent > 95; // Show critical at 95%
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return {
    storageInfo,
    updateStorageInfo,
    performCleanup,
    autoCleanup,
    shouldShowWarning,
    shouldShowCritical,
    formatBytes
  };
};