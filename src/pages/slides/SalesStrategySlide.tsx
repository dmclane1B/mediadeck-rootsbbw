import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Activity, Clock, Heart, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';

const SalesStrategySlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent } = useSlideContent();
  const slideImage = getSlideImageForDisplay('workout-session');
  const slideContent = getSlideContent('workout-session');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/roots-logo-brand.png" 
          alt="Roots Community Health Logo" 
          className="w-full h-full object-contain opacity-5"
          loading="lazy"
        />
      </div>

      {/* Navigation */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-10">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 min-h-[44px] text-xs sm:text-sm px-2 sm:px-4"
        >
          ← <span className="hidden sm:inline">Home</span>
        </Button>
      </div>

      {/* Roots Community Health Branding */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-10 text-right">
        <div className="text-white text-lg sm:text-xl lg:text-2xl font-space font-bold mb-1 sm:mb-2">ROOTS</div>
        <div className="text-white/80 text-xs sm:text-sm font-inter mb-1 sm:mb-2">Community Health</div>
        <div className="text-white text-base sm:text-lg lg:text-xl font-space font-bold">08</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-20 sm:pb-24">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-white leading-tight font-space mb-6 sm:mb-8 px-4">
            {slideContent?.title || 'WORKOUT SESSION'}
          </h1>
          <div className="w-20 sm:w-24 lg:w-32 h-1 bg-white/80 mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-4xl mx-auto font-inter leading-relaxed px-4">
            {slideContent?.description || 'Stay active and healthy with community fitness activities designed for all levels.'}
          </p>
        </div>

        {/* Image Showcase */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <ImageShowcase
            imageUrl={slideImage?.url}
            imageAlt={slideImage?.alt || 'Sales Strategy'}
            variant="featured"
          />
        </div>

        {/* Activity Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {/* Activities Section */}
          {slideContent?.sections?.[0] && (
            <Card className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-white/20">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-space">{slideContent.sections[0].title}</div>
                </div>
              </div>
              <ul className="space-y-3 text-white/80 font-inter">
                {Array.isArray(slideContent.sections[0].content) ? slideContent.sections[0].content.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    {item}
                  </li>
                )) : null}
              </ul>
            </Card>
          )}

          {/* Event Details Section */}
          {slideContent?.sections?.[1] && (
            <Card className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-white/20">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white font-space">{slideContent.sections[1].title}</div>
                </div>
              </div>
              <ul className="space-y-3 text-white/80 font-inter">
                {Array.isArray(slideContent.sections[1].content) ? slideContent.sections[1].content.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    {item}
                  </li>
                )) : null}
              </ul>
            </Card>
          )}
        </div>

        {/* Health Benefits */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="text-center">
            <div className="p-4 rounded-full bg-white/20 mx-auto mb-4 w-fit">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-2 font-space">Heart Health</div>
            <div className="text-white/80 text-sm font-inter">Cardiovascular benefits</div>
          </div>
          <div className="text-center">
            <div className="p-4 rounded-full bg-white/20 mx-auto mb-4 w-fit">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-2 font-space">Community</div>
            <div className="text-white/80 text-sm font-inter">Social connections</div>
          </div>
          <div className="text-center">
            <div className="p-4 rounded-full bg-white/20 mx-auto mb-4 w-fit">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div className="text-xl font-bold text-white mb-2 font-space">All Levels</div>
            <div className="text-white/80 text-sm font-inter">Beginner friendly</div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 text-white/80 font-space font-medium animate-fade-in" style={{ animationDelay: '1.5s' }}>
        MOVE. CONNECT. THRIVE.
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={8}
        previousRoute="/slides/nutrition-education"
        nextRoute="/slides/smoothie-demo"
      />
    </div>
  );
};

export default SalesStrategySlide;