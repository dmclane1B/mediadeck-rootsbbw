import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import UniversalSlideBackground from '@/components/UniversalSlideBackground';
import SideTab from '@/components/SideTab';

const SalesStrategySlide = () => {
  const navigate = useNavigate();

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
    </UniversalSlideBackground>
  );
};

export default SalesStrategySlide;