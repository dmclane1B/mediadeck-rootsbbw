import { useState, useEffect, useCallback, useRef } from 'react';
import { compressImage } from '@/utils/imageCompression';
import { indexedDBManager } from '@/utils/indexedDBManager';
import { CloudMediaManager, MediaFile as CloudMediaFile } from '@/utils/cloudMedia';

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

export interface UploadProgress {
  fileName: string;
  progress: number;
  completed: boolean;
  error?: string;
  fileIndex: number;
  stage: string;
}

type MediaStatusLevel = 'info' | 'warning' | 'error';

export interface MediaStatusEntry {
  id: string;
  message: string;
  level: MediaStatusLevel;
  timestamp: string;
  details?: string;
}

// Constants
const MAX_INPUT_FILE_SIZE = 50 * 1024 * 1024; // 50MB input limit
const MAX_FINAL_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB final compressed size
const MAX_TOTAL_SIZE = 500 * 1024 * 1024; // 500MB total storage (IndexedDB)
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_STATUS_ENTRIES = 50;

// Helper functions
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const getImageDimensions = (base64: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
    };
    img.src = base64;
  });
};

const calculateTotalSize = (images: MediaFile[]): number => {
  return images.reduce((total, image) => {
    return total + (image.size || 0);
  }, 0);
};

export const useMediaLibrary = () => {
  const [images, setImages] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [restoring, setRestoring] = useState(false);
  const [cloudImages, setCloudImages] = useState<MediaFile[]>([]);
  const [isEphemeralStorage, setIsEphemeralStorage] = useState(false);
  const [cloudLoading, setCloudLoading] = useState(false);
  const [cloudError, setCloudError] = useState<string | null>(null);
  const [cloudLoadAttempts, setCloudLoadAttempts] = useState(0);
  const [lastCloudSync, setLastCloudSync] = useState<string | null>(null);
  const [statusLog, setStatusLog] = useState<MediaStatusEntry[]>([]);
  const autoRestoreAttemptedRef = useRef(false);
  const retryTimeoutRef = useRef<number | null>(null);

  const appendStatusEntry = useCallback((message: string, level: MediaStatusLevel = 'info', details?: string) => {
    setStatusLog(prev => {
      const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

      const newEntry: MediaStatusEntry = {
        id,
        message,
        level,
        details,
        timestamp: new Date().toISOString()
      };

      const nextEntries = [...prev, newEntry];
      if (nextEntries.length > MAX_STATUS_ENTRIES) {
        return nextEntries.slice(nextEntries.length - MAX_STATUS_ENTRIES);
      }
      return nextEntries;
    });
  }, []);

  // Restore images from cloud storage
  const restoreFromCloud = useCallback(async (): Promise<number> => {
    console.log('[MediaLibrary] Starting cloud restore...');
    appendStatusEntry('Starting cloud restore from storage bucket...', 'info');
    setCloudLoading(true);

    try {
      // Check if cloud is available
      const isCloudAvailable = await CloudMediaManager.isCloudAvailable();
      if (!isCloudAvailable) {
        console.log('[MediaLibrary] Cloud storage not available');
        appendStatusEntry('Cloud storage is not available. Skipping restore.', 'warning');
        setCloudLoading(false);
        return 0;
      }

      // List cloud files
      const cloudFiles = await CloudMediaManager.listCloudFiles();
      console.log(`[MediaLibrary] Found ${cloudFiles.length} files in cloud storage`);
      appendStatusEntry(`Cloud storage returned ${cloudFiles.length} file(s).`, 'info');

      if (cloudFiles.length === 0) {
        setCloudLoading(false);
        return 0;
      }

      const restoredImages: MediaFile[] = [];
      
      // Convert cloud files to MediaFile objects
      for (const cloudFile of cloudFiles) {
        const mediaFile: MediaFile = {
          id: crypto.randomUUID(), // Generate new ID for local storage
          name: cloudFile.name,
          url: cloudFile.publicUrl || cloudFile.url, // Use public URL as the display URL
          uploadDate: cloudFile.uploadDate,
          dimensions: cloudFile.dimensions,
          size: cloudFile.size,
          cloudPath: cloudFile.cloudPath,
          publicUrl: cloudFile.publicUrl,
          source: 'cloud'
        };

        // Save to IndexedDB
        try {
          await indexedDBManager.addImage(mediaFile);
          restoredImages.push(mediaFile);
          console.log(`[MediaLibrary] Restored ${cloudFile.name} from cloud`);
        } catch (error) {
          console.error(`[MediaLibrary] Failed to save restored image ${cloudFile.name}:`, error);
        }
      }

      // Update local state
      setImages(prev => [...prev, ...restoredImages]);

      console.log(`[MediaLibrary] Successfully restored ${restoredImages.length} images from cloud`);
      appendStatusEntry(`Restored ${restoredImages.length} image(s) from cloud storage.`, 'info');
      setLastCloudSync(new Date().toISOString());
      setCloudError(null);
      setCloudLoading(false);
      return restoredImages.length;

    } catch (error) {
      console.error('[MediaLibrary] Error during cloud restore:', error);
      appendStatusEntry('Error during cloud restore.', 'error', error instanceof Error ? error.message : undefined);
      setCloudError(error instanceof Error ? error.message : 'Unknown cloud restore error');
      setCloudLoading(false);
      throw error;
    }
  }, [appendStatusEntry]);

  // Detect ephemeral storage
  const detectEphemeralStorage = useCallback(async (): Promise<boolean> => {
    try {
      if ('storage' in navigator && 'persisted' in navigator.storage) {
        const isPersistent = await navigator.storage.persisted();
        return !isPersistent;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  // Load cloud images from multiple sources
  const loadCloudImages = useCallback(async (): Promise<MediaFile[]> => {
    appendStatusEntry('Loading cloud images from Supabase...', 'info');
    setCloudLoading(true);
    setCloudError(null);

    const maxAttempts = 3;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        const fetchErrors: string[] = [];

        // Load from published_media table
        const { data: mediaData, error: mediaError } = await supabase
          .from('published_media')
          .select('*')
          .order('published_at', { ascending: false });

        if (mediaError) {
          const message = `Error loading published_media: ${mediaError.message}`;
          console.error('[MediaLibrary]', message, mediaError);
          fetchErrors.push(message);
        }

        // Load from published_slide_configurations table
        const { data: slideData, error: slideError } = await supabase
          .from('published_slide_configurations')
          .select('*')
          .eq('status', 'active')
          .order('published_at', { ascending: false });

        if (slideError) {
          const message = `Error loading published_slide_configurations: ${slideError.message}`;
          console.error('[MediaLibrary]', message, slideError);
          fetchErrors.push(message);
        }

        const allCloudImages: MediaFile[] = [];

        if (mediaData) {
          allCloudImages.push(...mediaData.map(img => ({
            id: img.image_id,
            name: img.image_name,
            url: img.cloud_url,
            uploadDate: new Date(img.published_at).toISOString(),
            dimensions: img.dimensions as { width: number; height: number } | undefined,
            size: img.file_size || 0,
            cloudPath: img.cloud_path,
            publicUrl: img.cloud_url,
            source: 'cloud' as const
          })));
        }

        if (slideData) {
          const existingIds = new Set(allCloudImages.map(img => img.id));
          allCloudImages.push(...slideData
            .filter(slide => !existingIds.has(slide.image_id))
            .map(slide => ({
              id: slide.image_id,
              name: slide.image_name,
              url: slide.image_url,
              uploadDate: new Date(slide.published_at).toISOString(),
              dimensions: slide.dimensions as { width: number; height: number } | undefined,
              size: slide.size || 0,
              cloudPath: slide.cloud_path,
              publicUrl: slide.image_url,
              source: 'cloud' as const
            })));
        }

        const hasErrors = fetchErrors.length > 0;
        const hasData = allCloudImages.length > 0;

        if (hasErrors) {
          const errorMessage = fetchErrors.join(' | ');
          setCloudError(errorMessage);
          appendStatusEntry(`Cloud image load completed with warnings: ${errorMessage}`, 'warning');
        } else {
          setCloudError(null);
        }

        if (hasErrors && !hasData && attempt < maxAttempts - 1) {
          appendStatusEntry('Retrying cloud image load due to empty results.', 'warning');
          await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
          continue;
        }

        appendStatusEntry(`Loaded ${allCloudImages.length} cloud image(s).`, hasErrors ? 'warning' : 'info');
        setCloudLoadAttempts(attempt + 1);
        setLastCloudSync(new Date().toISOString());
        setCloudLoading(false);
        return allCloudImages;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('[MediaLibrary] Error loading cloud images:', error);
        setCloudError(errorMessage);
        appendStatusEntry(`Failed to load cloud images (attempt ${attempt + 1}/${maxAttempts}): ${errorMessage}`, 'error');

        if (attempt < maxAttempts - 1) {
          await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
        }
      }
    }

    appendStatusEntry('Exceeded maximum retries while loading cloud images.', 'error');
    setCloudLoadAttempts(maxAttempts);
    setCloudLoading(false);
    return [];
  }, [appendStatusEntry]);

  // Merge cloud and local images, removing duplicates
  const getMergedImages = useCallback((localImages: MediaFile[], cloudImages: MediaFile[]): MediaFile[] => {
    const merged: MediaFile[] = [];
    const seenPaths = new Set<string>();
    const seenIds = new Set<string>();

    // Add local images first (they have priority)
    for (const img of localImages) {
      if (img.cloudPath) seenPaths.add(img.cloudPath);
      seenIds.add(img.id);
      merged.push(img);
    }

    // Add cloud images that aren't already local
    for (const img of cloudImages) {
      const isDuplicate = (img.cloudPath && seenPaths.has(img.cloudPath)) || seenIds.has(img.id);
      if (!isDuplicate) {
        merged.push({ ...img, source: 'cloud' as const });
      }
    }

    return merged;
  }, []);

  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        window.clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, []);

  // Cache a cloud image locally
  const cacheImageLocally = useCallback(async (image: MediaFile): Promise<void> => {
    try {
      console.log(`[MediaLibrary] Caching ${image.name} locally...`);
      appendStatusEntry(`Caching ${image.name} locally...`, 'info');
      await indexedDBManager.addOrUpdateImage({ ...image, source: 'synced' });

      // Refresh merged images
      const updatedLocalImages = await indexedDBManager.getAllImages();
      const mergedImages = getMergedImages(updatedLocalImages, cloudImages);
      setImages(mergedImages);

      console.log(`[MediaLibrary] Successfully cached ${image.name} locally`);
      appendStatusEntry(`${image.name} cached locally.`, 'info');
    } catch (error) {
      console.error(`[MediaLibrary] Failed to cache ${image.name} locally:`, error);
      appendStatusEntry(`Failed to cache ${image.name} locally.`, 'error', error instanceof Error ? error.message : undefined);
      throw error;
    }
  }, [getMergedImages, cloudImages, appendStatusEntry]);

  // Reset local cache and reload from cloud
  const resetLocalCache = useCallback(async (): Promise<void> => {
    try {
      console.log('[MediaLibrary] Resetting local cache...');
      appendStatusEntry('Resetting local media cache...', 'warning');
      await indexedDBManager.clearAll();

      // Reload cloud images and update state
      const cloudImgs = await loadCloudImages();
      setCloudImages(cloudImgs);
      setImages(cloudImgs); // Show only cloud images

      console.log('[MediaLibrary] Local cache reset complete');
      appendStatusEntry('Local cache reset complete. Reloaded cloud images.', 'info');
    } catch (error) {
      console.error('[MediaLibrary] Failed to reset local cache:', error);
      appendStatusEntry('Failed to reset local cache.', 'error', error instanceof Error ? error.message : undefined);
      throw error;
    }
  }, [loadCloudImages, appendStatusEntry]);

  // List cloud-only images (not cached locally)
  const listCloudOnlyImages = useCallback((): MediaFile[] => {
    return images.filter(img => img.source === 'cloud');
  }, [images]);
  // Restore images from cloud storage 
  const restoreFromCloudImages = useCallback(async (cloudImagesToRestore?: MediaFile[]): Promise<number> => {
    try {
      const imagesToRestore = cloudImagesToRestore || cloudImages;
      if (imagesToRestore.length === 0) {
        console.log('[MediaLibrary] No cloud images to restore');
        appendStatusEntry('No cloud images available to restore.', 'info');
        setCloudLoading(false);
        return 0;
      }

      console.log(`[MediaLibrary] Restoring ${imagesToRestore.length} cloud images to local cache...`);
      appendStatusEntry(`Restoring ${imagesToRestore.length} cloud image(s) to local cache...`, 'info');
      setCloudLoading(true);
      let restoredCount = 0;

      for (const cloudImg of imagesToRestore) {
        // Check if we already have this image locally
        const existsLocally = images.some(img =>
          img.id === cloudImg.id || img.cloudPath === cloudImg.cloudPath
        );
        
          if (!existsLocally) {
            try {
              await indexedDBManager.addOrUpdateImage({
                ...cloudImg,
                source: 'synced'
              });
              console.log(`[MediaLibrary] Restored image: ${cloudImg.name}`);
              appendStatusEntry(`Restored image ${cloudImg.name} from cloud.`, 'info');
              restoredCount++;
            } catch (error) {
              console.error(`[MediaLibrary] Failed to restore image ${cloudImg.name}:`, error);
              appendStatusEntry(`Failed to restore ${cloudImg.name} from cloud.`, 'error', error instanceof Error ? error.message : undefined);
            }
          }
      }

      if (restoredCount > 0) {
        // Refresh the images list
        const updatedLocalImages = await indexedDBManager.getAllImages();
        const updatedCloudImages = await loadCloudImages();
        const mergedImages = getMergedImages(updatedLocalImages, updatedCloudImages);
        setImages(mergedImages);
        setCloudImages(updatedCloudImages);
        setLastCloudSync(new Date().toISOString());
        setCloudError(null);
      }

      console.log(`[MediaLibrary] Successfully restored ${restoredCount} cloud images`);
      appendStatusEntry(`Restored ${restoredCount} cloud image(s).`, 'info');
      setCloudLoading(false);
      return restoredCount;
    } catch (error) {
      console.error('[MediaLibrary] Failed to restore cloud images:', error);
      appendStatusEntry('Failed to restore cloud images.', 'error', error instanceof Error ? error.message : undefined);
      setCloudError(error instanceof Error ? error.message : 'Unknown restore error');
      setCloudLoading(false);
      throw error;
    }
  }, [images, cloudImages, loadCloudImages, getMergedImages, appendStatusEntry]);

  // Restore images from published slides in Supabase
  const restoreFromPublishedSlides = useCallback(async (): Promise<number> => {
    console.log('[MediaLibrary] Starting published slides restore...');
    setRestoring(true);
    appendStatusEntry('Restoring images from published slide configurations...', 'info');
    setCloudLoading(true);

    try {
      const { supabase } = await import('@/integrations/supabase/client');

      // Fetch published slide configurations from Supabase
      const { data: publishedSlides, error } = await supabase
        .from('published_slide_configurations')
        .select('image_id, image_name, image_url, cloud_path, alt_text, dimensions, size, published_at, slide_id')
        .eq('status', 'active');

      if (error) {
        console.error('[MediaLibrary] Error fetching published slides:', error);
        appendStatusEntry('Error fetching published slides from Supabase.', 'error', error.message);
        throw new Error(`Failed to fetch published slides: ${error.message}`);
      }

      if (!publishedSlides || publishedSlides.length === 0) {
        console.log('[MediaLibrary] No published slides found');
        appendStatusEntry('No published slide configurations found.', 'warning');
        setCloudLoading(false);
        return 0;
      }

      // Convert to MediaFile format and restore using restoreFromCloudImages
      const slideImages: MediaFile[] = publishedSlides.map(slide => ({
        id: slide.image_id,
        name: slide.image_name,
        url: slide.image_url,
        uploadDate: new Date(slide.published_at).toISOString(),
        dimensions: slide.dimensions as { width: number; height: number } | undefined,
        size: slide.size || 0,
        cloudPath: slide.cloud_path,
        publicUrl: slide.image_url,
        source: 'cloud' as const
      }));

      const restoredCount = await restoreFromCloudImages(slideImages);

      // Update slide configurations in IndexedDB for proper slide assignments
      for (const slide of publishedSlides) {
        try {
          await indexedDBManager.setSlideConfiguration({
            slideId: slide.slide_id,
            imageId: slide.image_id,
            imageAlt: slide.alt_text || slide.image_name,
            lastUpdated: new Date().toISOString()
          });
        } catch (error) {
          console.warn(`[MediaLibrary] Failed to update slide configuration for ${slide.slide_id}:`, error);
        }
      }

      console.log(`[MediaLibrary] Successfully restored ${restoredCount} images from published slides`);
      appendStatusEntry(`Restored ${restoredCount} image(s) from published slides.`, 'info');
      setLastCloudSync(new Date().toISOString());
      setCloudError(null);
      return restoredCount;

    } catch (error) {
      console.error('[MediaLibrary] Error during published slides restore:', error);
      appendStatusEntry('Failed to restore images from published slides.', 'error', error instanceof Error ? error.message : undefined);
      setCloudError(error instanceof Error ? error.message : 'Unknown slide restore error');
      throw error;
    } finally {
      setRestoring(false);
      setCloudLoading(false);
    }
  }, [restoreFromCloudImages, appendStatusEntry]);

  interface LoadOptions {
    forceAutoRestore?: boolean;
  }

  const loadAllImages = useCallback(async (attempt: number = 0, options: LoadOptions = {}): Promise<void> => {
    const maxRetries = 3;
    const retryDelay = 1000;

    if (retryTimeoutRef.current) {
      window.clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    if (attempt === 0) {
      if (options.forceAutoRestore) {
        autoRestoreAttemptedRef.current = false;
      }
      setLoading(true);
    }

    appendStatusEntry(`Loading media library (attempt ${attempt + 1}/${maxRetries})...`, 'info');

    try {
      const isEphemeral = await detectEphemeralStorage();
      setIsEphemeralStorage(isEphemeral);

      const cloudImgs = await loadCloudImages();
      setCloudImages(cloudImgs);

      let localImages: MediaFile[] = [];
      try {
        await indexedDBManager.initialize();
        localImages = await indexedDBManager.getAllImages();
        appendStatusEntry(`Loaded ${localImages.length} local image(s) from IndexedDB.`, 'info');
      } catch (localError) {
        console.warn('[MediaLibrary] IndexedDB failed, using cloud-only view:', localError);
        appendStatusEntry('Failed to load local images from IndexedDB. Showing cloud images only.', 'warning', localError instanceof Error ? localError.message : undefined);
      }

      const mergedImages = getMergedImages(localImages, cloudImgs);
      setImages(mergedImages);
      setLoading(false);

      if (!autoRestoreAttemptedRef.current && localImages.length === 0 && cloudImgs.length > 0 && !isEphemeral) {
        autoRestoreAttemptedRef.current = true;
        appendStatusEntry('No local images detected. Attempting automatic restore from published slides.', 'warning');
        try {
          const restoredCount = await restoreFromPublishedSlides();
          if (restoredCount > 0) {
            appendStatusEntry(`Automatic restore added ${restoredCount} image(s) from published slides.`, 'info');
          } else {
            appendStatusEntry('Automatic restore completed. No additional images were needed.', 'info');
          }
        } catch (autoError) {
          appendStatusEntry('Automatic restore from published slides failed.', 'error', autoError instanceof Error ? autoError.message : undefined);
        }
      }
    } catch (error) {
      console.error(`[MediaLibrary] Error loading images (attempt ${attempt + 1}):`, error);
      appendStatusEntry(`Failed to load media library (attempt ${attempt + 1}).`, 'error', error instanceof Error ? error.message : undefined);

      if (attempt < maxRetries) {
        const delay = retryDelay * (attempt + 1);
        appendStatusEntry(`Retrying media library load in ${delay}ms.`, 'warning');
        if (retryTimeoutRef.current) {
          window.clearTimeout(retryTimeoutRef.current);
        }
        retryTimeoutRef.current = window.setTimeout(() => {
          loadAllImages(attempt + 1, options);
        }, delay);
      } else {
        console.error('[MediaLibrary] All retry attempts failed. Using cloud-only view.');
        appendStatusEntry('All retry attempts failed. Falling back to cloud-only view.', 'error');
        const cloudImgs = await loadCloudImages();
        setImages(cloudImgs);
        setLoading(false);
      }
    }
  }, [appendStatusEntry, detectEphemeralStorage, loadCloudImages, getMergedImages, restoreFromPublishedSlides]);

  const reloadLibrary = useCallback(async (options?: LoadOptions) => {
    appendStatusEntry('Manual media library reload requested.', 'info');
    await loadAllImages(0, options ?? {});
  }, [appendStatusEntry, loadAllImages]);

  const reloadCloudImages = useCallback(async () => {
    appendStatusEntry('Manually reloading cloud image catalog...', 'info');
    const cloudImgs = await loadCloudImages();
    setCloudImages(cloudImgs);

    try {
      const localImages = await indexedDBManager.getAllImages();
      const mergedImages = getMergedImages(localImages, cloudImgs);
      setImages(mergedImages);
      appendStatusEntry('Cloud images reloaded and merged with local cache.', 'info');
    } catch (error) {
      console.error('[MediaLibrary] Failed to merge local images during cloud reload:', error);
      appendStatusEntry('Cloud images reloaded but failed to read local cache.', 'warning', error instanceof Error ? error.message : undefined);
      setImages(cloudImgs);
    }

    return cloudImgs;
  }, [appendStatusEntry, loadCloudImages, getMergedImages]);

  useEffect(() => {
    loadAllImages();
  }, [loadAllImages]);

  const addImages = async (
    files: FileList,
    onProgress?: (progress: UploadProgress[]) => void
  ): Promise<{ success: MediaFile[], errors: string[] }> => {
    const fileArray = Array.from(files);
    const results: { success: MediaFile[], errors: string[] } = {
      success: [],
      errors: []
    };

    // Pre-upload validation
    const preUploadErrors = await validateFilesBeforeUpload(fileArray);
    if (preUploadErrors.length > 0) {
      return { success: [], errors: preUploadErrors };
    }

    // Check storage quota before starting
    try {
      const storageCheck = await checkStorageQuota();
      if (!storageCheck.hasSpace) {
        return { 
          success: [], 
          errors: [`Storage quota exceeded. Available: ${formatBytes(storageCheck.available)}, Required: ${formatBytes(calculateTotalFileSize(fileArray))}`] 
        };
      }
    } catch (error) {
      console.error('Storage quota check failed:', error);
    }

    // Initialize progress tracking
    const progressArray: UploadProgress[] = fileArray.map((file, index) => ({
      fileName: file.name,
      progress: 0,
      completed: false,
      fileIndex: index,
      stage: 'preparing'
    }));
    
    setUploadProgress(progressArray);
    onProgress?.(progressArray);

    // Process files in parallel (chunked to avoid overwhelming the system)
    const chunkSize = 3; // Process 3 files at a time
    for (let i = 0; i < fileArray.length; i += chunkSize) {
      const chunk = fileArray.slice(i, i + chunkSize);
      const chunkPromises = chunk.map(async (file, chunkIndex) => {
        const fileIndex = i + chunkIndex;
        return processFile(file, fileIndex, progressArray, onProgress, results);
      });

      await Promise.allSettled(chunkPromises);
    }

    // Clear progress after a delay
    setTimeout(() => {
      setUploadProgress([]);
    }, 3000);

    return results;
  };

  const validateFilesBeforeUpload = async (files: File[]): Promise<string[]> => {
    const errors: string[] = [];
    
    for (const file of files) {
      // Validate file type
      if (!SUPPORTED_TYPES.includes(file.type)) {
        errors.push(`${file.name}: Unsupported file type (${file.type}). Supported: ${SUPPORTED_TYPES.join(', ')}`);
        continue;
      }

      // Validate input file size (before compression)
      if (file.size > MAX_INPUT_FILE_SIZE) {
        errors.push(`${file.name}: File too large (${formatBytes(file.size)}). Maximum input size: ${formatBytes(MAX_INPUT_FILE_SIZE)}`);
        continue;
      }

      // Check if file is corrupted by trying to read it
      try {
        await validateImageFile(file);
      } catch (error) {
        errors.push(`${file.name}: File appears to be corrupted or invalid`);
      }
    }

    return errors;
  };

  const validateImageFile = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Invalid image file'));
      };
      
      img.src = url;
    });
  };

  const checkStorageQuota = async (): Promise<{ hasSpace: boolean; available: number; used: number }> => {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        const used = estimate.usage || 0;
        const quota = estimate.quota || MAX_TOTAL_SIZE;
        const available = quota - used;
        
        return {
          hasSpace: available > (MAX_FINAL_IMAGE_SIZE * 2), // Ensure we have space for at least 2 compressed files
          available,
          used
        };
      }
    } catch (error) {
      console.error('Failed to check storage quota:', error);
    }
    
    // Fallback to IndexedDB calculation
    const currentSize = calculateTotalSize(images);
    return {
      hasSpace: currentSize < MAX_TOTAL_SIZE * 0.9,
      available: MAX_TOTAL_SIZE - currentSize,
      used: currentSize
    };
  };

  const calculateTotalFileSize = (files: File[]): number => {
    return files.reduce((total, file) => total + file.size, 0);
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFile = async (
    file: File, 
    fileIndex: number, 
    progressArray: UploadProgress[], 
    onProgress?: (progress: UploadProgress[]) => void,
    results?: { success: MediaFile[], errors: string[] }
  ): Promise<void> => {
    if (!results) return;
    
    try {
      // Update progress to show processing
      progressArray[fileIndex].progress = 10;
      progressArray[fileIndex].stage = 'validating';
      setUploadProgress([...progressArray]);
      onProgress?.([...progressArray]);

      // Update progress to show compression
      progressArray[fileIndex].progress = 30;
      progressArray[fileIndex].stage = 'compressing';
      setUploadProgress([...progressArray]);
      onProgress?.([...progressArray]);

      // Compress image with retry logic
      let compressionResult;
      let compressionAttempts = 0;
      const maxCompressionAttempts = 3;

      while (compressionAttempts < maxCompressionAttempts) {
        try {
          compressionResult = await compressImage(file, {
            maxSizeBytes: MAX_FINAL_IMAGE_SIZE,
            quality: 0.8,
            maxWidth: 2048,
            maxHeight: 2048
          }, (progress) => {
            const scaledProgress = 30 + (progress * 0.3); // Scale progress from 30% to 60%
            progressArray[fileIndex].progress = scaledProgress;
            setUploadProgress([...progressArray]);
            onProgress?.([...progressArray]);
          });
          break;
        } catch (error) {
          compressionAttempts++;
          if (compressionAttempts >= maxCompressionAttempts) {
            throw new Error(`Compression failed after ${maxCompressionAttempts} attempts: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // Check if compression result meets size requirements
      if (compressionResult && compressionResult.compressedSize > MAX_FINAL_IMAGE_SIZE) {
        throw new Error(`Unable to compress ${file.name} to required size (${formatBytes(MAX_FINAL_IMAGE_SIZE)}). Final size: ${formatBytes(compressionResult.compressedSize)}`);
      }

      if (!compressionResult) {
        throw new Error('Compression failed');
      }
      
      // Update progress to show processing
      progressArray[fileIndex].progress = 70;
      progressArray[fileIndex].stage = 'processing';
      setUploadProgress([...progressArray]);
      onProgress?.([...progressArray]);

      // Get base64 from compression result
      const base64 = compressionResult.compressedFile;
      const dimensions = compressionResult.dimensions;

      // Create media file
      const mediaFile: MediaFile = {
        id: crypto.randomUUID(),
        name: file.name,
        url: base64,
        uploadDate: new Date().toISOString(),
        dimensions,
        size: compressionResult.compressedSize,
        source: 'local'
      };

      // Update progress to show cloud sync
      progressArray[fileIndex].progress = 90;
      progressArray[fileIndex].stage = 'syncing to cloud';
      setUploadProgress([...progressArray]);
      onProgress?.([...progressArray]);

      // Upload to cloud in background
      try {
        const isCloudAvailable = await CloudMediaManager.isCloudAvailable();
        if (isCloudAvailable) {
          console.log(`[MediaLibrary] Uploading ${file.name} to cloud...`);
          const syncResult = await CloudMediaManager.uploadBase64ToCloud(base64, file.name);
          
          if (syncResult.success && syncResult.cloudPath && syncResult.publicUrl) {
            // Update media file with cloud info
            mediaFile.cloudPath = syncResult.cloudPath;
            mediaFile.publicUrl = syncResult.publicUrl;
            mediaFile.source = 'synced';
            
            console.log(`[MediaLibrary] Successfully uploaded ${file.name} to cloud`);
          } else {
            console.warn(`[MediaLibrary] Failed to upload ${file.name} to cloud:`, syncResult.error);
          }
        } else {
          console.log('[MediaLibrary] Cloud storage not available, saved locally only');
        }
      } catch (error) {
        console.warn(`[MediaLibrary] Error uploading ${file.name} to cloud:`, error);
      }

      // Save to IndexedDB with retry logic
      let saveAttempts = 0;
      const maxSaveAttempts = 3;

      while (saveAttempts < maxSaveAttempts) {
        try {
          await indexedDBManager.addImage(mediaFile);
          break;
        } catch (error) {
          saveAttempts++;
          
          if (error instanceof Error && error.name === 'QuotaExceededError') {
            throw new Error('Storage quota exceeded. Please delete some images and try again.');
          }
          
          if (saveAttempts >= maxSaveAttempts) {
            throw new Error(`Database save failed after ${maxSaveAttempts} attempts: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
          
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      // Add to local state
      setImages(prev => [...prev, mediaFile]);
      results.success.push(mediaFile);

      // Mark as completed
      progressArray[fileIndex].progress = 100;
      progressArray[fileIndex].completed = true;
      progressArray[fileIndex].stage = 'completed';
      setUploadProgress([...progressArray]);
      onProgress?.([...progressArray]);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      const detailedError = `${file.name}: ${errorMessage}`;
      
      console.error('File upload error:', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        error: errorMessage,
        stage: progressArray[fileIndex].stage
      });
      
      results.errors.push(detailedError);
      
      progressArray[fileIndex].error = errorMessage;
      progressArray[fileIndex].completed = true;
      progressArray[fileIndex].stage = 'failed';
      setUploadProgress([...progressArray]);
      onProgress?.([...progressArray]);
    }
  };

  const removeImage = useCallback(async (id: string) => {
    console.log(`[MediaLibrary] Removing image with ID: ${id}`);
    
    try {
      // Find the image to get cloud path if it exists
      const imageToRemove = images.find(img => img.id === id);
      
      // Remove from IndexedDB
      await indexedDBManager.removeImage(id);
      
      // Remove from cloud if it has a cloud path
      if (imageToRemove?.cloudPath) {
        console.log(`[MediaLibrary] Removing ${imageToRemove.name} from cloud storage...`);
        const cloudRemoved = await CloudMediaManager.deleteFromCloud(imageToRemove.cloudPath);
        if (cloudRemoved) {
          console.log(`[MediaLibrary] Successfully removed ${imageToRemove.name} from cloud`);
        } else {
          console.warn(`[MediaLibrary] Failed to remove ${imageToRemove.name} from cloud`);
        }
      }
      
      // Update local state
      setImages(prev => prev.filter(image => image.id !== id));
      console.log(`[MediaLibrary] Successfully removed image: ${id}`);
    } catch (error) {
      console.error(`[MediaLibrary] Error removing image ${id}:`, error);
      throw error;
    }
  }, [images]);

  const updateImage = useCallback(async (id: string, updates: Partial<MediaFile>) => {
    try {
      await indexedDBManager.updateImage(id, updates);
      setImages(prev => prev.map(image => 
        image.id === id ? { ...image, ...updates } : image
      ));
    } catch (error) {
      console.error('Error updating image:', error);
      throw error;
    }
  }, []);

  const clearAll = useCallback(async () => {
    console.log('[MediaLibrary] Clearing all images...');
    
    try {
      // Get all images with cloud paths for cleanup
      const cloudImages = images.filter(img => img.cloudPath);
      
      // Clear from IndexedDB
      await indexedDBManager.clearAll();
      
      // Clear from cloud storage
      if (cloudImages.length > 0) {
        console.log(`[MediaLibrary] Removing ${cloudImages.length} images from cloud storage...`);
        for (const image of cloudImages) {
          try {
            await CloudMediaManager.deleteFromCloud(image.cloudPath!);
            console.log(`[MediaLibrary] Removed ${image.name} from cloud`);
          } catch (error) {
            console.warn(`[MediaLibrary] Failed to remove ${image.name} from cloud:`, error);
          }
        }
      }
      
      // Update local state
      setImages([]);
      console.log('[MediaLibrary] Successfully cleared all images');
    } catch (error) {
      console.error('[MediaLibrary] Error clearing images:', error);
      throw error;
    }
  }, [images]);

  const getStorageInfo = useCallback(() => {
    const totalSize = calculateTotalSize(images);
    const remainingSize = MAX_TOTAL_SIZE - totalSize;
    const usagePercent = (totalSize / MAX_TOTAL_SIZE) * 100;
    
    return {
      totalSize,
      remainingSize,
      usagePercent,
      imageCount: images.length,
      maxFileSize: MAX_FINAL_IMAGE_SIZE,
      maxTotalSize: MAX_TOTAL_SIZE
    };
  }, [images]);

  const getCloudStorageInfo = useCallback(async () => {
    try {
      const cloudInfo = await CloudMediaManager.getCloudStorageInfo();
      return {
        cloudFileCount: cloudInfo.fileCount,
        cloudError: cloudInfo.error,
        isCloudSynced: images.some(img => img.source === 'synced' || img.source === 'cloud')
      };
    } catch (error) {
      return {
        cloudFileCount: 0,
        cloudError: 'Error accessing cloud storage',
        isCloudSynced: false
      };
    }
  }, [images]);

  return {
    images,
    loading,
    uploadProgress,
    restoring,
    cloudImages,
    cloudLoading,
    cloudError,
    cloudLoadAttempts,
    lastCloudSync,
    statusLog,
    addImages,
    removeImage,
    updateImage,
    clearAll,
    restoreFromCloud,
    restoreFromPublishedSlides,
    restoreFromCloudImages,
    getStorageInfo,
    getCloudStorageInfo,
    cacheImageLocally,
    resetLocalCache,
    listCloudOnlyImages,
    isEphemeralStorage,
    reloadLibrary,
    reloadCloudImages
  };
};