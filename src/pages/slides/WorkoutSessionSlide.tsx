import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import UniversalSlideBackground from '@/components/UniversalSlideBackground';
import SideTab from '@/components/SideTab';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';

const WorkoutSessionSlide = () => {
  const navigate = useNavigate();
  const { getSlideContent } = useSlideContent();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const slideContent = getSlideContent('workout-session');
  const slideImage = getSlideImageForDisplay('workout-session');

  return (
    <UniversalSlideBackground variant="hero">
      <SideTab text="WORKOUT SESSION" />
      
      {/* Fixed Navigation */}
      <div className="fixed top-4 sm:top-6 left-4 sm:left-6 z-50">
        <Button 
          variant="green" 
          onClick={() => navigate('/')}
          className="transition-all duration-300 hover:scale-105 min-h-[44px] text-xs sm:text-sm px-2 sm:px-4"
          aria-label="Go to home page"
        >
          <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Home</span>
        </Button>
      </div>

      {/* Fixed Roots Community Health Branding */}
      <div className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="text-center">
          <div className="text-primary text-lg sm:text-xl font-space font-bold">ROOTS</div>
          <div className="text-muted-foreground text-xs sm:text-sm font-inter">Community Health</div>
        </div>
      </div>

      {/* Fixed Slide Number */}
      <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 text-right">
        <div className="text-primary text-lg sm:text-xl font-space font-bold">08</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-20 sm:pb-24">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-foreground leading-tight font-space mb-6 sm:mb-8 px-4">
            {slideContent?.title || 'WORKOUT SESSION'}
          </h1>
          <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed px-4">
            {slideContent?.description || 'Stay active and healthy with community fitness activities designed for all levels.'}
          </p>
        </div>

        {/* Image Showcase */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ImageShowcase
            imageUrl={slideImage?.url}
            imageAlt={slideImage?.alt}
            onImageSelect={() => navigate('/media')}
            variant="hero"
          />
        </div>

        {/* Content Sections */}
        {slideContent?.sections && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {slideContent.sections.map((section, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-primary/20">
                <h3 className="text-xl font-bold text-primary mb-4 font-space">{section.title}</h3>
                <div className="space-y-3">
                  {Array.isArray(section.content) ? section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  )) : (
                    <p className="text-muted-foreground">{section.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={8}
        previousRoute="/slides/nutrition-education"
        nextRoute="/slides/smoothie-demo"
      />
    </UniversalSlideBackground>
  );
};

export default WorkoutSessionSlide;