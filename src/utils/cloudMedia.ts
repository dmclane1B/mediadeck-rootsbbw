import { supabase } from '@/integrations/supabase/client';
import { CDNImageOptimizer, CACHE_CONFIG } from './cdnOptimization';

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

export interface CloudSyncResult {
  success: boolean;
  publicUrl?: string;
  cloudPath?: string;
  error?: string;
}

export class CloudMediaManager {
  private static readonly BUCKET_NAME = 'media';
  private static readonly FOLDER_PREFIX = 'images/';

  /**
   * Upload a file to Supabase storage with CDN optimization
   */
  static async uploadToCloud(file: File | Blob, fileName: string): Promise<CloudSyncResult> {
    try {
      console.log(`[CloudMedia] Uploading ${fileName} to cloud storage...`);
      
      const filePath = `${this.FOLDER_PREFIX}${Date.now()}-${fileName}`;
      
      // Enhanced cache control for better CDN performance
      const cacheControl = file instanceof File && file.type.startsWith('image/') 
        ? `max-age=${365 * 24 * 3600}, s-maxage=${365 * 24 * 3600}, immutable` // 1 year for images
        : 'max-age=3600'; // 1 hour for other files
      
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl,
          upsert: false,
          contentType: file instanceof File ? file.type : 'application/octet-stream'
        });

      if (error) {
        console.error('[CloudMedia] Upload error:', error);
        return { success: false, error: error.message };
      }

      // Get optimized public URL for images
      const { data: urlData } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(data.path);

      // For images, generate an optimized URL as the default
      let optimizedUrl = urlData.publicUrl;
      if (file instanceof File && file.type.startsWith('image/')) {
        optimizedUrl = CDNImageOptimizer.getOptimizedUrl(data.path, {
          quality: 85
        });
      }

      console.log(`[CloudMedia] Successfully uploaded ${fileName} to ${data.path}`);
      
      return {
        success: true,
        cloudPath: data.path,
        publicUrl: optimizedUrl
      };
    } catch (error) {
      console.error('[CloudMedia] Upload exception:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown upload error' 
      };
    }
  }

  /**
   * Upload a base64 image to cloud storage
   */
  static async uploadBase64ToCloud(base64Data: string, fileName: string): Promise<CloudSyncResult> {
    try {
      // Convert base64 to blob
      const response = await fetch(base64Data);
      const blob = await response.blob();
      
      return await this.uploadToCloud(blob, fileName);
    } catch (error) {
      console.error('[CloudMedia] Base64 upload error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to convert base64 to blob' 
      };
    }
  }

  /**
   * List all files in the media folder
   */
  static async listCloudFiles(): Promise<MediaFile[]> {
    try {
      console.log('[CloudMedia] Listing cloud files...');
      
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .list(this.FOLDER_PREFIX, {
          limit: 1000,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        console.error('[CloudMedia] List files error:', error);
        return [];
      }

      const mediaFiles: MediaFile[] = [];
      
      for (const file of data || []) {
        if (file.name && file.name !== '.emptyFolderPlaceholder') {
          const { data: urlData } = supabase.storage
            .from(this.BUCKET_NAME)
            .getPublicUrl(`${this.FOLDER_PREFIX}${file.name}`);

          mediaFiles.push({
            id: file.id || file.name,
            name: file.name,
            url: urlData.publicUrl, // Use public URL as the main URL for cloud files
            uploadDate: file.created_at || new Date().toISOString(),
            size: file.metadata?.size,
            cloudPath: `${this.FOLDER_PREFIX}${file.name}`,
            publicUrl: urlData.publicUrl,
            source: 'cloud'
          });
        }
      }

      console.log(`[CloudMedia] Found ${mediaFiles.length} cloud files`);
      return mediaFiles;
    } catch (error) {
      console.error('[CloudMedia] List files exception:', error);
      return [];
    }
  }

  /**
   * Delete a file from cloud storage
   */
  static async deleteFromCloud(cloudPath: string): Promise<boolean> {
    try {
      console.log(`[CloudMedia] Deleting ${cloudPath} from cloud storage...`);
      
      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([cloudPath]);

      if (error) {
        console.error('[CloudMedia] Delete error:', error);
        return false;
      }

      console.log(`[CloudMedia] Successfully deleted ${cloudPath}`);
      return true;
    } catch (error) {
      console.error('[CloudMedia] Delete exception:', error);
      return false;
    }
  }

  /**
   * Check if cloud storage is available
   */
  static async isCloudAvailable(): Promise<boolean> {
    try {
      const { data, error } = await supabase.storage.listBuckets();
      if (error) return false;
      
      return data.some(bucket => bucket.name === this.BUCKET_NAME);
    } catch {
      return false;
    }
  }

  /**
   * Get storage info from cloud
   */
  static async getCloudStorageInfo(): Promise<{ fileCount: number; error?: string }> {
    try {
      const files = await this.listCloudFiles();
      return { fileCount: files.length };
    } catch (error) {
      return { 
        fileCount: 0, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}