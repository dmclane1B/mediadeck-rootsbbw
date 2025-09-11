import { useEffect, useState } from 'react';
import { useSlideImages } from './useSlideImages';
import { useMediaLibrary } from './useMediaLibrary';
import { toast } from 'sonner';

export interface SlideImageValidation {
  slideId: string;
  hasImage: boolean;
  imageExists: boolean;
  error?: string;
}

export const useSlideImageValidation = (slideIds: string[]) => {
  const { slideConfig, cleanInvalidImages } = useSlideImages();
  const { images } = useMediaLibrary();
  const [validations, setValidations] = useState<SlideImageValidation[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (slideIds.length === 0) return;
    
    const validateSlideImages = () => {
      const results: SlideImageValidation[] = slideIds.map(slideId => {
        const slideImage = slideConfig[slideId];
        
        if (!slideImage?.imageId) {
          return {
            slideId,
            hasImage: false,
            imageExists: false
          };
        }

        const imageExists = images.some(img => img.id === slideImage.imageId);
        
        return {
          slideId,
          hasImage: true,
          imageExists,
          error: !imageExists ? 'Image file not found' : undefined
        };
      });

      setValidations(results);
    };

    validateSlideImages();
  }, [slideConfig, images, slideIds]);

  const validateAndCleanup = async (): Promise<number> => {
    setIsValidating(true);
    try {
      const cleanedCount = await cleanInvalidImages();
      
      if (cleanedCount > 0) {
        toast.success(`Cleaned up ${cleanedCount} invalid image references`);
      }
      
      return cleanedCount;
    } catch (error) {
      console.error('Error during validation cleanup:', error);
      toast.error('Failed to clean up invalid images');
      return 0;
    } finally {
      setIsValidating(false);
    }
  };

  const getValidationSummary = () => {
    const totalSlides = validations.length;
    const slidesWithImages = validations.filter(v => v.hasImage).length;
    const validImages = validations.filter(v => v.hasImage && v.imageExists).length;
    const invalidImages = validations.filter(v => v.hasImage && !v.imageExists).length;

    return {
      totalSlides,
      slidesWithImages,
      validImages,
      invalidImages,
      completionPercentage: totalSlides > 0 ? Math.round((validImages / totalSlides) * 100) : 0
    };
  };

  return {
    validations,
    isValidating,
    validateAndCleanup,
    getValidationSummary
  };
};