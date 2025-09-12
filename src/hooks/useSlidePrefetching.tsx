import { useEffect, useCallback } from 'react';
import { useRequestDeduplication } from './useRequestDeduplication';

interface SlidePrefetchingProps {
  currentSlideIndex: number;
  totalSlides: number;
  slideRoutes: string[];
  enabled?: boolean;
}

/**
 * Hook that intelligently prefetches next/previous slides for better performance
 */
export const useSlidePrefetching = ({
  currentSlideIndex,
  totalSlides,
  slideRoutes,
  enabled = true
}: SlidePrefetchingProps) => {
  const { deduplicatedRequest } = useRequestDeduplication();

  const prefetchSlide = useCallback(async (slideRoute: string) => {
    if (!enabled || !slideRoute) return;

    try {
      // Prefetch the slide component using dynamic import
      await deduplicatedRequest(
        `prefetch-${slideRoute}`,
        () => import(`../pages/slides/${slideRoute}.tsx`),
        30000 // 30 second cache for prefetched slides
      );
      
      console.log(`Prefetched slide: ${slideRoute}`);
    } catch (error) {
      console.warn(`Failed to prefetch slide ${slideRoute}:`, error);
    }
  }, [deduplicatedRequest, enabled]);

  const prefetchAdjacentSlides = useCallback(() => {
    if (!enabled) return;

    // Prefetch next slide
    if (currentSlideIndex < totalSlides - 1) {
      const nextSlideRoute = slideRoutes[currentSlideIndex + 1];
      if (nextSlideRoute) {
        prefetchSlide(nextSlideRoute);
      }
    }

    // Prefetch previous slide
    if (currentSlideIndex > 0) {
      const prevSlideRoute = slideRoutes[currentSlideIndex - 1];
      if (prevSlideRoute) {
        prefetchSlide(prevSlideRoute);
      }
    }

    // Prefetch slide after next (lower priority)
    if (currentSlideIndex < totalSlides - 2) {
      setTimeout(() => {
        const nextNextSlideRoute = slideRoutes[currentSlideIndex + 2];
        if (nextNextSlideRoute) {
          prefetchSlide(nextNextSlideRoute);
        }
      }, 1000); // Delay to prioritize adjacent slides
    }
  }, [currentSlideIndex, totalSlides, slideRoutes, prefetchSlide, enabled]);

  // Prefetch slides when slide index changes
  useEffect(() => {
    // Use requestIdleCallback for non-critical prefetching
    if ('requestIdleCallback' in window) {
      requestIdleCallback(prefetchAdjacentSlides, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(prefetchAdjacentSlides, 100);
    }
  }, [prefetchAdjacentSlides]);

  return { prefetchSlide };
};