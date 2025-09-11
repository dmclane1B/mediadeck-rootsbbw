import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImages } from '@/hooks/useSlideImages';
import { useSlideContent } from '@/hooks/useSlideContent';
import { Skeleton } from '@/components/ui/skeleton';

const TitleSlide = () => {
  const navigate = useNavigate();
  const { getSlideImage } = useSlideImages();
  const { getSlideContent, loading } = useSlideContent();
  const slideImage = getSlideImage('title');
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
        <img 
          src="/lovable-uploads/bcb3b88f-d227-437e-af8d-ddc0c670649e.png" 
          alt="UCLA Softball Player" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-muted/95"></div>
      </div>
      
      {/* Roots Community Health Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <img src="/src/assets/roots-logo.png" alt="Roots Community Health Logo" className="h-10 w-auto ml-auto mb-2" />
        <div className="text-muted-foreground text-xl font-space font-bold">01</div>
      </div>

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Button 
          variant="outline" 
          onClick={handleHome}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          ← Home
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16 max-w-7xl mx-auto px-4 sm:px-8 animate-fade-in z-10 relative items-center">
        <div className="order-2 lg:order-1 lg:col-span-2">
          {loading ? (
            <div className="mb-8 sm:mb-12 space-y-4">
              <Skeleton className="h-16 w-full max-w-lg" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-1 w-32" />
              <Skeleton className="h-6 w-full mt-8" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-12 w-48 mt-8" />
            </div>
          ) : (
            <>
              <div className="mb-8 sm:mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-wide animate-scale-in font-space leading-tight mb-4 sm:mb-8">
                  {slideContent?.title || 'ROOTS COMMUNITY HEALTH'}
                </h1>
                <div className="text-xl sm:text-2xl md:text-3xl text-primary font-inter mb-4 sm:mb-8">
                  {slideContent?.subtitle || 'HEALING OUR COMMUNITY FROM WITHIN'}
                </div>
                <div className="w-20 sm:w-32 h-1 bg-primary animate-fade-in" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              <div className="text-lg sm:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
                {slideContent?.description || 'Uplifting those impacted by systemic inequities and poverty through comprehensive medical and behavioral health care, health navigation, workforce enterprises, housing, outreach, and advocacy.'}
              </div>
              
              <Button 
                onClick={handleOverview}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-lg animate-fade-in shadow-lg"
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
            imageId={slideImage?.imageId}
            imageAlt={slideImage?.imageAlt}
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