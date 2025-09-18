import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';
import { Skeleton } from '@/components/ui/skeleton';

const TitleSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent, loading } = useSlideContent();
  const slideImage = getSlideImageForDisplay('title');
  const slideContent = getSlideContent('title');

  const handleNext = () => navigate('/slides/overview');
  const handleOverview = () => navigate('/slides/overview');
  const handleHome = () => navigate('/');

  useSwipeNavigation({
    onPrevious: handleHome,
    onNext: handleNext,
  });

  useKeyboardNavigation({
    onPrevious: handleHome,
    onNext: handleNext,
    onHome: handleHome,
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/src/assets/background-community-optimized.webp" type="image/webp" />
          <img 
            src="/src/assets/background-community.png" 
            alt="UCLA Softball Player" 
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-muted/95"></div>
      </div>
      
      {/* Roots Community Health Branding */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-10 text-right">
        <img src="/lovable-uploads/8f771217-3f89-469e-9a26-608410b785c2.png" alt="Roots Community Health Logo" className="h-6 sm:h-10 w-auto ml-auto mb-2" />
        <div className="text-muted-foreground text-lg sm:text-xl font-space font-bold">01</div>
      </div>

      {/* Navigation */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-10">
        <Button 
          variant="outline" 
          onClick={handleHome}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[44px] text-xs sm:text-sm px-2 sm:px-4"
        >
          ← <span className="hidden sm:inline">Home</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in z-10 relative items-center pt-16 sm:pt-20 pb-20 sm:pb-24">
        <div className="order-2 lg:order-1 lg:col-span-2">
          {loading ? (
            <div className="mb-6 sm:mb-8 lg:mb-12 space-y-4">
              <Skeleton className="h-12 sm:h-16 w-full max-w-lg" />
              <Skeleton className="h-6 sm:h-8 w-3/4" />
              <Skeleton className="h-1 w-24 sm:w-32" />
              <Skeleton className="h-4 sm:h-6 w-full mt-6 sm:mt-8" />
              <Skeleton className="h-4 sm:h-6 w-5/6" />
              <Skeleton className="h-10 sm:h-12 w-36 sm:w-48 mt-6 sm:mt-8" />
            </div>
          ) : (
            <>
              <div className="mb-6 sm:mb-8 lg:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground tracking-wide animate-scale-in font-space leading-tight mb-4 sm:mb-6 lg:mb-8">
                  {slideContent?.title || 'Roots Community Health - Black Breastfeeding Week'}
                </h1>
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary font-inter mb-4 sm:mb-6 lg:mb-8">
                  {slideContent?.subtitle || 'HEALING OUR COMMUNITY FROM WITHIN'}
                </div>
                <div className="text-base sm:text-lg lg:text-xl text-primary font-inter mb-4">
                  {slideContent?.customFields?.eventDate || 'August 25-31, 2025'}
                </div>
                <div className="w-16 sm:w-20 lg:w-32 h-1 bg-primary animate-fade-in" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              <div className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 animate-fade-in leading-relaxed">
                {slideContent?.description || 'Uplifting those impacted by systemic inequities and poverty through comprehensive medical and behavioral health care, health navigation, workforce enterprises, housing, outreach, and advocacy.'}
              </div>
              
              <Button 
                onClick={handleOverview}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg animate-fade-in shadow-lg min-h-[44px] touch-manipulation"
                style={{ animationDelay: '1.2s' }}
              >
                {slideContent?.buttonText || 'Learn About Our Services'}
              </Button>
            </>
          )}
        </div>

        {/* Image Showcase */}
        <div className="order-1 lg:order-2 lg:col-span-3">
          <ImageShowcase
            imageUrl={slideImage?.url}
            imageAlt={slideImage?.alt}
            onImageSelect={() => navigate('/media')}
            variant="featured"
            className="animate-fade-in"
          />
        </div>
      </div>


      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={1}
        nextRoute="/slides/overview"
      />
    </div>
  );
};

export default TitleSlide;