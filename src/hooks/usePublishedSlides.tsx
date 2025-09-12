import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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
    await indexedDBManager.initialize();
    const allImages = await indexedDBManager.getAllImages();
    const byId = new Map(allImages.map((img: any) => [img.id, img]));

    const complete: Record<string, any> = {};
    const errors: string[] = [];

    for (const [slideId, cfg] of Object.entries(slideConfig)) {
      if (!cfg || !cfg.imageId) continue;
      const img = byId.get(cfg.imageId);
      if (!img) {
        errors.push(`Image not found for slide ${slideId}`);
        continue;
      }

      let cloudPath = img.cloudPath as string | undefined;
      let publicUrl = img.publicUrl as string | undefined;

      // Ensure the image is uploaded to cloud storage so we have a stable public URL
      if (!cloudPath || !publicUrl) {
        try {
          const upload = await CloudMediaManager.uploadBase64ToCloud(img.url, img.name);
          if (upload.success && upload.cloudPath && upload.publicUrl) {
            cloudPath = upload.cloudPath;
            publicUrl = upload.publicUrl;
            try {
              await indexedDBManager.updateImage(img.id, { cloudPath, publicUrl, source: 'synced' });
            } catch (e) {
              console.warn('Failed to update local image after upload:', e);
            }
          } else {
            errors.push(`Upload failed for slide ${slideId}: ${upload.error || 'unknown error'}`);
            continue;
          }
        } catch (e) {
          errors.push(`Upload exception for slide ${slideId}: ${e instanceof Error ? e.message : 'unknown error'}`);
          continue;
        }
      }

      if (!publicUrl) {
        errors.push(`No public URL for slide ${slideId}`);
        continue;
      }

      complete[slideId] = {
        id: img.id,
        name: img.name,
        url: publicUrl,
        cloudPath,
        altText: cfg.imageAlt || img.name,
        dimensions: img.dimensions,
        size: img.size,
        type: inferMimeFromName(img.name),
      };
    }

    return { complete, errors };
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
    try {
      // Build a complete payload with cloud URLs before invoking the edge function
      const { complete, errors: prepErrors } = await buildCompletePublishConfig(slideConfig);

      const { data, error } = await supabase.functions.invoke('publish-slides', {
        body: {
          action: 'publishAllSlides',
          data: { slideConfig: complete }
        }
      });

      if (error) throw error;

      const { success, successCount, totalCount, errors } = data;

      if (success) {
        toast({
          title: "All Slides Published",
          description: `Successfully published ${successCount} slides.`,
        });
        await refreshPublishedSlides();
        // If we skipped some during preparation, inform the user without failing the whole op
        if (prepErrors.length > 0) {
          toast({
            title: "Some slides were skipped",
            description: `${prepErrors.length} slide(s) could not be prepared for publishing.`,
            variant: "destructive",
          });
        }
        return true;
      } else {
        console.error('Publishing errors:', errors);
        const skipped = prepErrors.length;
        toast({
          title: "Partial Success",
          description: `Published ${successCount} of ${totalCount + skipped} slides. ${skipped} skipped before publish.`,
          variant: "destructive",
        });
        await refreshPublishedSlides();
        return false;
      }
    } catch (err) {
      console.error('Failed to publish all slides:', err);
      toast({
        title: "Publishing Failed",
        description: err instanceof Error ? err.message : 'Failed to publish slides',
        variant: "destructive",
      });
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