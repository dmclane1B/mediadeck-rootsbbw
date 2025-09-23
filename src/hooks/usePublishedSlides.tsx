import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ensureDatabaseInitialized } from '@/utils/databaseInitializer';
import { indexedDBManager } from '@/utils/indexedDBManager';
import { CloudMediaManager } from '@/utils/cloudMedia';

export interface PublishedSlideImage {
  slide_id: string;
  image_id: string;
  image_name: string;
  image_url: string;
  cloud_path: string;
  alt_text?: string;
  dimensions?: { width: number; height: number };
  size?: number;
}

export interface PublishedMedia {
  image_id: string;
  image_name: string;
  cloud_path: string;
  cloud_url: string;
  file_size?: number;
  file_type?: string;
  dimensions?: { width: number; height: number };
}

interface UsePublishedSlidesReturn {
  publishedSlides: Record<string, PublishedSlideImage>;
  isLoading: boolean;
  error: string | null;
  publishSlide: (slideId: string, image: any) => Promise<boolean>;
  unpublishSlide: (slideId: string) => Promise<boolean>;
  publishAllSlides: (slideConfig: Record<string, any>) => Promise<boolean>;
  refreshPublishedSlides: () => Promise<void>;
  getPublishedSlideImage: (slideId: string) => PublishedSlideImage | null;
}

export function usePublishedSlides(): UsePublishedSlidesReturn {
  const [publishedSlides, setPublishedSlides] = useState<Record<string, PublishedSlideImage>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadPublishedSlides = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('published_slide_configurations')
        .select('*')
        .eq('status', 'active');

      if (fetchError) throw fetchError;

      const slidesMap: Record<string, PublishedSlideImage> = {};
      data?.forEach((slide) => {
        slidesMap[slide.slide_id] = {
          slide_id: slide.slide_id,
          image_id: slide.image_id,
          image_name: slide.image_name,
          image_url: slide.image_url,
          cloud_path: slide.cloud_path,
          alt_text: slide.alt_text,
          dimensions: slide.dimensions as { width: number; height: number } | undefined,
          size: slide.size,
        };
      });

      setPublishedSlides(slidesMap);
    } catch (err) {
      console.error('Failed to load published slides:', err);
      setError(err instanceof Error ? err.message : 'Failed to load published slides');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPublishedSlides();
  }, []);

  // Infer a basic MIME type from filename
  const inferMimeFromName = (filename?: string): string => {
    if (!filename) return 'image/jpeg';
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'png':
        return 'image/png';
      case 'webp':
        return 'image/webp';
      case 'gif':
        return 'image/gif';
      case 'jpg':
      case 'jpeg':
      default:
        return 'image/jpeg';
    }
  };

  // Build a complete payload for the edge function from local slide config
  const buildCompletePublishConfig = async (slideConfig: Record<string, any>) => {
    console.log('🔧 Building complete publish configuration...');
    console.log('📥 Input slide config:', slideConfig);
    
    try {
      await ensureDatabaseInitialized();
      console.log('✅ Database initialized for publish configuration building');
      
      const allImages = await indexedDBManager.getAllImages();
      console.log(`📷 Found ${allImages.length} images in IndexedDB`);
      
      const byId = new Map(allImages.map((img: any) => [img.id, img]));

      const complete: Record<string, any> = {};
      const errors: string[] = [];

      for (const [slideId, cfg] of Object.entries(slideConfig)) {
        console.log(`🔍 Processing slide ${slideId}:`, cfg);
        
        if (!cfg || !cfg.imageId) {
          console.warn(`⚠️ Slide ${slideId} has no image configuration, skipping`);
          continue;
        }
        
        const img = byId.get(cfg.imageId);
        if (!img) {
          const error = `Image not found for slide ${slideId} (imageId: ${cfg.imageId})`;
          console.error(`❌ ${error}`);
          errors.push(error);
          continue;
        }

        console.log(`📸 Image found for slide ${slideId}:`, {
          id: img.id,
          name: img.name,
          hasCloudPath: !!img.cloudPath,
          hasPublicUrl: !!img.publicUrl
        });

        let cloudPath = img.cloudPath as string | undefined;
        let publicUrl = img.publicUrl as string | undefined;

        // Ensure the image is uploaded to cloud storage so we have a stable public URL
        if (!cloudPath || !publicUrl) {
          console.log(`☁️ Uploading image to cloud storage for slide ${slideId}...`);
          try {
            const upload = await CloudMediaManager.uploadBase64ToCloud(img.url, img.name);
            console.log(`📤 Upload result for slide ${slideId}:`, upload);
            
            if (upload.success && upload.cloudPath && upload.publicUrl) {
              cloudPath = upload.cloudPath;
              publicUrl = upload.publicUrl;
              console.log(`✅ Upload successful for slide ${slideId}`, { cloudPath, publicUrl });
              
              try {
                await indexedDBManager.updateImage(img.id, { cloudPath, publicUrl, source: 'synced' });
                console.log(`💾 Updated local image metadata for slide ${slideId}`);
              } catch (e) {
                console.warn(`⚠️ Failed to update local image after upload for slide ${slideId}:`, e);
              }
            } else {
              const error = `Upload failed for slide ${slideId}: ${upload.error || 'unknown error'}`;
              console.error(`❌ ${error}`);
              errors.push(error);
              continue;
            }
          } catch (e) {
            const error = `Upload exception for slide ${slideId}: ${e instanceof Error ? e.message : 'unknown error'}`;
            console.error(`❌ ${error}`);
            errors.push(error);
            continue;
          }
        } else {
          console.log(`✅ Image already has cloud URL for slide ${slideId}`);
        }

        if (!publicUrl) {
          const error = `No public URL available for slide ${slideId}`;
          console.error(`❌ ${error}`);
          errors.push(error);
          continue;
        }

        const slidePayload = {
          id: img.id,
          name: img.name,
          url: publicUrl,
          cloudPath,
          altText: cfg.imageAlt || img.name,
          dimensions: img.dimensions,
          size: img.size,
          type: inferMimeFromName(img.name),
        };

        complete[slideId] = slidePayload;
        console.log(`✅ Prepared payload for slide ${slideId}:`, slidePayload);
      }

      console.log('🎯 Configuration building complete:', {
        slidesProcessed: Object.keys(complete).length,
        errorsCount: errors.length,
        errors
      });

      return { complete, errors };
    } catch (err) {
      console.error('❌ Error building publish configuration:', err);
      throw err;
    }
  };

  const publishSlide = async (slideId: string, image: any): Promise<boolean> => {
    try {
      // image can be a SlideImage or a simple { imageId, imageAlt }
      const imageId = image?.id || image?.imageId;
      const imageAlt = image?.name || image?.imageAlt;
      if (!imageId) throw new Error('No image provided for this slide.');

      const { complete, errors: prepErrors } = await buildCompletePublishConfig({ [slideId]: { imageId, imageAlt } });
      const payload = complete[slideId];
      if (!payload) throw new Error(prepErrors[0] || 'Failed to prepare image for publishing');

      // Use edge function to publish slide (bypasses RLS with service role)
      const { data, error } = await supabase.functions.invoke('publish-slides', {
        body: {
          action: 'publishSlide',
          data: { slideId, image: payload }
        }
      });

      if (error) throw error;
      if (!data?.success) throw new Error('Failed to publish slide');

      await refreshPublishedSlides();
      
      toast({
        title: "Slide Published",
        description: `Slide ${slideId} has been published successfully.`,
      });

      return true;
    } catch (err) {
      console.error('Failed to publish slide:', err);
      toast({
        title: "Publishing Failed",
        description: err instanceof Error ? err.message : 'Failed to publish slide',
        variant: "destructive",
      });
      return false;
    }
  };

  const unpublishSlide = async (slideId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('published_slide_configurations')
        .update({ status: 'inactive' })
        .eq('slide_id', slideId);

      if (error) throw error;

      await refreshPublishedSlides();
      
      toast({
        title: "Slide Unpublished",
        description: `Slide ${slideId} has been unpublished.`,
      });

      return true;
    } catch (err) {
      console.error('Failed to unpublish slide:', err);
      toast({
        title: "Unpublishing Failed",
        description: err instanceof Error ? err.message : 'Failed to unpublish slide',
        variant: "destructive",
      });
      return false;
    }
  };

  const publishAllSlides = async (slideConfig: Record<string, any>): Promise<boolean> => {
    console.log('📚 usePublishedSlides: Starting publishAllSlides');
    console.log('📋 Slide configuration received:', slideConfig);
    
    try {
      // Step 1: Build complete configuration with cloud URLs
      console.log('🔧 Building complete publish configuration...');
      const { complete, errors: prepErrors } = await buildCompletePublishConfig(slideConfig);
      
      console.log('✅ Configuration built successfully');
      console.log('📦 Complete payload:', complete);
      
      if (prepErrors.length > 0) {
        console.warn('⚠️ Preparation errors:', prepErrors);
      }

      // Step 2: Invoke the edge function
      console.log('🚀 Invoking publish-slides edge function...');
      const { data, error } = await supabase.functions.invoke('publish-slides', {
        body: {
          action: 'publishAllSlides',
          data: { slideConfig: complete }
        }
      });

      if (error) {
        console.error('❌ Edge function error:', error);
        throw error;
      }

      console.log('📤 Edge function response:', data);
      const { success, successCount, totalCount, errors } = data;

      if (success) {
        console.log(`✅ All slides published successfully! (${successCount}/${totalCount})`);
        
        await refreshPublishedSlides();
        
        // If we skipped some during preparation, inform the user without failing the whole op
        if (prepErrors.length > 0) {
          console.warn(`⚠️ ${prepErrors.length} slide(s) were skipped during preparation`);
          toast({
            title: "Some slides were skipped",
            description: `${prepErrors.length} slide(s) could not be prepared for publishing.`,
            variant: "destructive",
          });
        }
        return true;
      } else {
        console.error('❌ Publishing errors from edge function:', errors);
        const skipped = prepErrors.length;
        console.log(`⚠️ Partial success: ${successCount}/${totalCount + skipped} slides published`);
        
        await refreshPublishedSlides();
        return false;
      }
    } catch (err) {
      console.error('❌ Failed to publish all slides:', err);
      
      // Enhanced error logging
      if (err instanceof Error) {
        console.error('Error details:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        });
      }
      
      return false;
    }
  };

  const refreshPublishedSlides = async () => {
    await loadPublishedSlides();
  };

  const getPublishedSlideImage = (slideId: string): PublishedSlideImage | null => {
    return publishedSlides[slideId] || null;
  };

  return {
    publishedSlides,
    isLoading,
    error,
    publishSlide,
    unpublishSlide,
    publishAllSlides,
    refreshPublishedSlides,
    getPublishedSlideImage,
  };
}