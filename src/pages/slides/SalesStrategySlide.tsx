import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import SlideBackground from '@/components/SlideBackground';
import SideTab from '@/components/SideTab';

const SalesStrategySlide = () => {
  const navigate = useNavigate();

  return (
    <SlideBackground className="flex items-center justify-center">
      {/* Side Tab */}
      <SideTab text="WORKOUT SESSION" />

      {/* Navigation */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-10">
        <Button 
          variant="green" 
          onClick={() => navigate('/')}
          className="transition-all duration-300 hover:scale-105 min-h-[44px] text-xs sm:text-sm px-2 sm:px-4"
        >
          ← <span className="hidden sm:inline">Home</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-20 sm:pb-24">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-foreground leading-tight font-space mb-6 sm:mb-8 px-4">
            WORKOUT SESSION
          </h1>
          <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed px-4">
            Stay active and healthy with community fitness activities designed for all levels.
          </p>
        </div>

        {/* Placeholder for content */}
        <div className="text-center text-muted-foreground py-16">
          <p>Slide content will be restored once import issue is resolved.</p>
        </div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={8}
        previousRoute="/slides/nutrition-education"
        nextRoute="/slides/smoothie-demo"
      />
    </SlideBackground>
  );
};

export default SalesStrategySlide;