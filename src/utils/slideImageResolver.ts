import { usePublishedSlides } from '@/hooks/usePublishedSlides';
import { useSlideImages } from '@/hooks/useSlideImages';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';

export interface ResolvedSlideImage {
  id: string;
  name: string;
  url: string;
  alt?: string;
  dimensions?: { width: number; height: number };
  size?: number;
  isPublished: boolean;
  source: 'published' | 'local';
}

export function useSlideImageResolver() {
  const { publishedSlides, getPublishedSlideImage } = usePublishedSlides();
  const { getSlideImage } = useSlideImages();
  const { images } = useMediaLibrary();

  const getSlideImageForDisplay = (slideId: string): ResolvedSlideImage | null => {
    // Apply legacy mappings FIRST to ensure proper published slide resolution
    const legacyMappings: Record<string, string> = {
      'community-voices': 'market-overview',
      'monday-kickoff': 'product-glimpse',
      'expert-panel': 'team-leadership',
      'nutrition-education': 'proof-demand',
      'workout-session': 'sales-strategy',
      'smoothie-demo': 'customer-persona',
      'resources-support': 'value-propositions',
      'community-partners': 'team-leadership',
      'roadmap': 'roadmap',
      'ask': 'ask',
      'contact': 'contact'
    };
    
    const mappedSlideId = legacyMappings[slideId] || slideId;
    console.log(`[SlideImageResolver] Resolving image for slideId: ${slideId}, mapped to: ${mappedSlideId}`);

    // Check for published version using mapped ID
    const publishedImage = getPublishedSlideImage(mappedSlideId);
    if (publishedImage) {
      console.log(`[SlideImageResolver] Found published image for ${mappedSlideId}:`, publishedImage.image_name);
      return {
        id: publishedImage.image_id,
        name: publishedImage.image_name,
        url: publishedImage.image_url,
        alt: publishedImage.alt_text,
        dimensions: publishedImage.dimensions,
        size: publishedImage.size,
        isPublished: true,
        source: 'published',
      };
    }

    // Fall back to local configuration
    let localConfig = getSlideImage(mappedSlideId);
    if (!localConfig && slideId !== mappedSlideId) {
      // Also try original slideId for local config
      localConfig = getSlideImage(slideId);
    }
    
    if (localConfig) {
      const localImage = images.find(img => img.id === localConfig.imageId);
      if (localImage) {
        return {
          id: localImage.id,
          name: localImage.name,
          url: localImage.url,
          alt: localConfig.imageAlt,
          dimensions: localImage.dimensions,
          size: localImage.size,
          isPublished: false,
          source: 'local',
        };
      }
    }

    // Enhanced fallback: Try to find any image from the media library that matches published slide patterns
    if (!localConfig && !publishedImage) {
      const cloudImage = images.find(img => img.source === 'cloud' && img.cloudPath?.includes(slideId));
      if (cloudImage) {
        return {
          id: cloudImage.id,
          name: cloudImage.name,
          url: cloudImage.url,
          alt: `Image for ${slideId}`,
          dimensions: cloudImage.dimensions,
          size: cloudImage.size,
          isPublished: false,
          source: 'local',
        };
      }
    }

    return null;
  };

  const isSlidePublished = (slideId: string): boolean => {
    return !!publishedSlides[slideId];
  };

  const getPublishingStatus = (slideConfig: Record<string, any>) => {
    const localConfigs = Object.keys(slideConfig).filter(slideId => slideConfig[slideId]);
    const publishedCount = Object.keys(publishedSlides).length;
    const totalCount = localConfigs.length;
    
    return {
      publishedCount,
      totalCount,
      isFullyPublished: publishedCount === totalCount && totalCount > 0,
      hasUnpublishedChanges: totalCount > publishedCount,
    };
  };

  return {
    getSlideImageForDisplay,
    isSlidePublished,
    getPublishingStatus,
    publishedSlides,
  };
}