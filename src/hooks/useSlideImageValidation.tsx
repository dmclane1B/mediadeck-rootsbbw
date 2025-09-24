import { useEffect, useState } from 'react';
import { ensureDatabaseInitialized } from '@/utils/databaseInitializer';
import { useSlideImages } from './useSlideImages';
import { useMediaLibrary } from './useMediaLibrary';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
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
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const [validations, setValidations] = useState<SlideImageValidation[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (slideIds.length === 0) return;
    
    const validateSlideImages = async () => {
      try {
        // Ensure database is ready before validation
        await ensureDatabaseInitialized();
        
        const results: SlideImageValidation[] = slideIds.map(slideId => {
          // Use the slide image resolver to check for any available image (local or published)
          const resolvedImage = getSlideImageForDisplay(slideId);
          
          if (!resolvedImage) {
            return {
              slideId,
              hasImage: false,
              imageExists: false
            };
          }

          // If we have a resolved image, it means the image exists and is displayable
          return {
            slideId,
            hasImage: true,
            imageExists: true
          };
        });

        console.log('[SlideImageValidation] Validation results:', results);
        setValidations(results);
      } catch (error) {
        console.error('Error during slide image validation:', error);
      }
    };

    validateSlideImages();
  }, [slideConfig, images, slideIds, getSlideImageForDisplay]);

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