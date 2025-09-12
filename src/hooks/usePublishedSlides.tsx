import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

  const publishSlide = async (slideId: string, image: any): Promise<boolean> => {
    try {
      // First, ensure image is uploaded to cloud
      const { data: mediaData, error: mediaError } = await supabase
        .from('published_media')
        .upsert({
          image_id: image.id,
          image_name: image.name,
          cloud_path: image.cloudPath || `media/${image.id}`,
          cloud_url: image.url,
          file_size: image.size,
          file_type: image.type || 'image/jpeg',
          dimensions: image.dimensions,
        })
        .select()
        .single();

      if (mediaError) throw mediaError;

      // Then publish the slide configuration
      const { error: slideError } = await supabase
        .from('published_slide_configurations')
        .upsert({
          slide_id: slideId,
          image_id: image.id,
          image_name: image.name,
          image_url: image.url,
          cloud_path: image.cloudPath || `media/${image.id}`,
          alt_text: image.altText,
          dimensions: image.dimensions,
          size: image.size,
        });

      if (slideError) throw slideError;

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
      const slideEntries = Object.entries(slideConfig).filter(([_, image]) => image);
      let successCount = 0;

      for (const [slideId, image] of slideEntries) {
        const success = await publishSlide(slideId, image);
        if (success) successCount++;
      }

      if (successCount === slideEntries.length) {
        toast({
          title: "All Slides Published",
          description: `Successfully published ${successCount} slides. Your presentation is now live!`,
        });
        return true;
      } else {
        toast({
          title: "Partial Success",
          description: `Published ${successCount} of ${slideEntries.length} slides. Some slides may need attention.`,
          variant: "destructive",
        });
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