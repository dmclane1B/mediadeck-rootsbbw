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
import MagazineLayout from '@/components/MagazineLayout';
import { Badge } from '@/components/ui/badge';

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
    <MagazineLayout
      title={slideContent?.title || 'BLACK BREASTFEEDING WEEK 2025'}
      subtitle={slideContent?.subtitle || 'Celebrating and Supporting Breastfeeding in Our Community'}
      category="COMMUNITY HEALTH SPECIAL ISSUE"
      slideNumber="01"
      testimonial={slideContent?.customFields?.testimonial}
      backgroundImage="/src/assets/roots-logo.png"
    >
      {/* Navigation */}
      <div className="absolute top-4 left-4 z-20">
        <Button 
          variant="outline" 
          onClick={handleHome}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[44px]"
        >
          ← Home
        </Button>
      </div>

      {/* Hero Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-48" />
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <Badge variant="outline" className="text-primary border-primary">
                  {slideContent?.customFields?.eventDate || 'August 25-31, 2025'}
                </Badge>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {slideContent?.description || 'Join Roots Community Health for a week of education, empowerment, and celebration as we support Black mothers and families in their breastfeeding journeys.'}
                </p>
                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={handleOverview}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-lg"
                  >
                    {slideContent?.buttonText || 'Join Our Community'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/slides/contact')}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Featured Image */}
        <div className="lg:order-last">
          <ImageShowcase
            imageUrl={slideImage?.url}
            imageAlt={slideImage?.alt || 'Community members celebrating together'}
            onImageSelect={() => navigate('/media')}
            variant="hero"
            className="animate-fade-in rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Community Highlights */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold text-foreground font-roots text-center">
          Community Celebration Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">50+</div>
            <p className="text-muted-foreground">Community Members</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">5</div>
            <p className="text-muted-foreground">Days of Programming</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">100%</div>
            <p className="text-muted-foreground">Free to Community</p>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={1}
        nextRoute="/slides/overview"
      />
    </MagazineLayout>
  );
};

export default TitleSlide;