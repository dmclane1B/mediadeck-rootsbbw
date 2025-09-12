import { useSlidePrefetching } from './useSlidePrefetching';

/**
 * Demo hook that shows how to integrate slide prefetching with actual slide navigation
 */
export const useSlidePrefetchingDemo = () => {
  // Example slide routes - update these to match your actual slide components
  const slideRoutes = [
    'TitleSlide',
    'OverviewSlide', 
    'ChallengesSlide',
    'ProductGlimpseSlide',
    'MarketOverviewSlide',
    'ProofDemandSlide',
    'SalesStrategySlide',
    'CustomerPersonaSlide',
    'ValuePropositionsSlide',
    'TeamLeadershipSlide',
    'RoadmapSlide',
    'AskSlide',
    'ContactSlide'
  ];

  // Example current slide tracking (you'd replace this with actual state)
  const currentSlideIndex = 0;

  // Initialize prefetching
  const { prefetchSlide } = useSlidePrefetching({
    currentSlideIndex,
    totalSlides: slideRoutes.length,
    slideRoutes,
    enabled: true,
  });

  return {
    slideRoutes,
    currentSlideIndex,
    totalSlides: slideRoutes.length,
    prefetchSlide,
  };
};