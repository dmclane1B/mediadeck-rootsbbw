import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Calendar, Heart, HandHeart, Share, ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';
import UniversalSlideBackground from '@/components/UniversalSlideBackground';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
const RoadmapSlide = () => {
  const navigate = useNavigate();
  const {
    getSlideImageForDisplay
  } = useSlideImageResolver();
  const slideImage = getSlideImageForDisplay('roadmap');
  const {
    getSlideContent
  } = useSlideContent();
  const slideContent = getSlideContent('roadmap');
  const handlePrevious = () => navigate('/slides/team-leadership');
  const handleNext = () => navigate('/slides/ask');
  const handleHome = () => navigate('/');
  useSwipeNavigation({
    onPrevious: handlePrevious,
    onNext: handleNext
  });
  useKeyboardNavigation({
    onPrevious: handlePrevious,
    onNext: handleNext,
    onHome: handleHome
  });
  if (!slideContent) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>;
  }
  return <UniversalSlideBackground variant="hero">
      {/* Fixed Navigation */}
      <div className="fixed top-4 sm:top-6 left-4 sm:left-6 z-50">
        <Button variant="outline" onClick={handleHome} className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2" aria-label="Go to home page">
          <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Home</span>
        </Button>
      </div>

      {/* Fixed Roots Community Health Branding */}
      <div className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="text-center">
          <div className="text-white text-lg sm:text-xl font-space font-bold">ROOTS</div>
          <div className="text-white/80 text-xs sm:text-sm font-inter">Community Health</div>
        </div>
      </div>

      {/* Fixed Slide Number */}
      <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 text-right">
        <div className="text-white text-lg sm:text-xl font-space font-bold">12</div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full pt-16 sm:pt-20 pb-24 sm:pb-32">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-space mb-6 sm:mb-8 drop-shadow-2xl [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
              HOW TO <span className="text-white/90 drop-shadow-2xl [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">PARTICIPATE</span>
            </h1>
            <div className="w-24 sm:w-32 h-1 bg-white/80 mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto font-inter leading-relaxed px-4">
              {slideContent?.description || 'Join our community celebration and support network'}
            </p>
          </div>

          {/* Image Showcase */}
          <div className="mb-8 sm:mb-12 animate-fade-in" style={{
          animationDelay: '0.3s'
        }}>
            <ImageShowcase imageUrl={slideImage?.url} imageAlt={slideImage?.alt} onImageSelect={() => navigate('/media')} variant="hero" />
          </div>

          {/* Participation Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 animate-fade-in" style={{
          animationDelay: '0.5s'
        }}>
            {Array.isArray(slideContent?.sections) && slideContent.sections.map((section, sectionIndex) => <Card key={sectionIndex} className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="p-2 sm:p-3 rounded-full bg-white/20 flex-shrink-0">
                    {sectionIndex === 0 ? <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" /> : <HandHeart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />}
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-space">{section.title}</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {Array.isArray(section.content) && section.content.map((item, itemIndex) => <div key={itemIndex} className="flex items-start gap-2 sm:gap-3">
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 mt-0.5 flex-shrink-0" />
                      <span className="text-white/80 font-inter leading-relaxed text-sm sm:text-base">{item}</span>
                    </div>)}
                </div>
              </Card>)}
          </div>

          {/* Community Action Call-to-Action */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in" style={{
          animationDelay: '0.7s'
        }}>
            
          </div>

          {/* Event Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 animate-fade-in" style={{
          animationDelay: '1s'
        }}>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 font-space">AUG 25-31</div>
              <div className="text-white/80 font-inter text-sm sm:text-base">Black Breastfeeding Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 font-space">FREE</div>
              <div className="text-white/80 font-inter text-sm sm:text-base">Community Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 font-space">ALL</div>
              <div className="text-white/80 font-inter text-sm sm:text-base">Are Welcome</div>
            </div>
          </div>

          {/* Bottom Tagline */}
          <div className="text-center mt-8 sm:mt-12 mb-8">
            <div className="text-white/80 font-space font-medium text-base sm:text-lg animate-fade-in" style={{
            animationDelay: '2s'
          }}>
              PARTICIPATE. LEARN. CELEBRATE.
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation currentSlide={12} previousRoute="/slides/team-leadership" nextRoute="/slides/ask" />
    </UniversalSlideBackground>;
};
export default RoadmapSlide;