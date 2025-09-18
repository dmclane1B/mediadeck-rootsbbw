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
    // First check for published version
    const publishedImage = getPublishedSlideImage(slideId);
    if (publishedImage) {
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

    // Fall back to local configuration with legacy ID fallback
    let localConfig = getSlideImage(slideId);
    
    // Try legacy ID mappings if current slideId doesn't work
    if (!localConfig) {
      const legacyMappings: Record<string, string> = {
        'community-voices': 'market-overview',
        'monday-kickoff': 'product-glimpse',
        'expert-panel': 'expert-panel',
        'nutrition-education': 'proof-demand',
        'workout-session': 'sales-strategy',
        'smoothie-demo': 'customer-persona',
        'resources-support': 'resources-support',
        'community-partners': 'team-leadership',
        'roadmap': 'roadmap',
        'ask': 'ask',
        'contact': 'contact'
      };
      
      const legacyId = legacyMappings[slideId];
      if (legacyId) {
        localConfig = getSlideImage(legacyId);
      }
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