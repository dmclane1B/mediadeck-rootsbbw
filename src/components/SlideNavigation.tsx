import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home, Grid3x3, Timer, Pause, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SlideNavigationProps {
  currentSlide: number;
  previousRoute?: string;
  nextRoute?: string;
  isLastSlide?: boolean;
}

const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentSlide,
  previousRoute,
  nextRoute,
  isLastSlide = false
}) => {
  const navigate = useNavigate();
  const [showOverview, setShowOverview] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);

  // Total slides in the presentation
  const totalSlides = 13;
  const progressPercentage = (currentSlide / totalSlides) * 100;

  // Auto-advance timer
  useEffect(() => {
    if (!autoAdvance || isLastSlide || !nextRoute) return;
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoAdvance, isLastSlide, nextRoute]);

  const handlePrevious = () => {
    if (previousRoute) {
      // Add haptic feedback for mobile
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      navigate(previousRoute);
    }
  };

  const handleNext = () => {
    if (nextRoute) {
      // Add haptic feedback for mobile
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      navigate(nextRoute);
    }
  };

  const handleHome = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
    navigate('/');
  };

  const toggleAutoAdvance = () => {
    setAutoAdvance(!autoAdvance);
    setTimeRemaining(30);
  };

  const slideRoutes = [
    '/',
    '/slides/overview',
    '/slides/challenges',
    '/slides/monday-kickoff',
    '/slides/expert-panel',
    '/slides/community-voices',
    '/slides/nutrition-education',
    '/slides/workout-session',
    '/slides/smoothie-demo',
    '/slides/resources-support',
    '/slides/community-partners',
    '/slides/roadmap',
    '/slides/ask',
    '/slides/contact'
  ];

  return (
    <>
      {/* Enhanced Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-[60] pb-safe">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-black/20 backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-primary via-accent to-success transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Navigation Container */}
        <div className="bg-black/40 backdrop-blur-md border-t border-white/30 px-4 py-3 sm:px-6 sm:py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* Left: Previous Button */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                disabled={!previousRoute}
                className="group relative bg-white/10 hover:bg-white/20 border border-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation min-h-[44px] min-w-[44px]"
                aria-label="Go to previous slide"
              >
                <ChevronLeft className="w-4 h-4 sm:mr-2 transition-transform group-hover:-translate-x-0.5" />
                <span className="hidden sm:inline text-sm font-medium">Previous</span>
                {!previousRoute && (
                  <div className="absolute inset-0 bg-black/20 rounded-full" />
                )}
              </Button>
            </div>

            {/* Center: Progress & Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Overview Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOverview(!showOverview)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full p-2 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation min-h-[44px] min-w-[44px]"
                aria-label="Show slide overview"
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>

              {/* Progress Dots - Responsive */}
              <div className="hidden sm:flex gap-1">
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(slideRoutes[index])}
                    className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 touch-manipulation ${
                      index + 1 === currentSlide 
                        ? 'bg-white shadow-lg shadow-white/50' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Mobile: Slide Counter */}
              <div className="sm:hidden bg-white/10 rounded-full px-3 py-1 border border-white/20">
                <span className="text-white text-sm font-medium">
                  {currentSlide} / {totalSlides}
                </span>
              </div>

              {/* Auto-advance Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAutoAdvance}
                className={`bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full p-2 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation min-h-[44px] min-w-[44px] ${autoAdvance ? 'bg-accent/30 border-accent/50' : ''}`}
                aria-label={autoAdvance ? "Disable auto-advance" : "Enable auto-advance"}
              >
                {autoAdvance ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {autoAdvance && (
                  <div className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {timeRemaining}
                  </div>
                )}
              </Button>
            </div>

            {/* Right: Next/Home Button */}
            <div className="flex items-center gap-2">
              {isLastSlide ? (
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={handleHome}
                  className="group bg-success/20 hover:bg-success/30 border border-success/30 text-white rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation min-h-[44px] min-w-[44px]"
                  aria-label="Go to home page"
                >
                  <Home className="w-4 h-4 sm:mr-2 transition-transform group-hover:scale-110" />
                  <span className="hidden sm:inline text-sm font-medium">Home</span>
                </Button>
              ) : (
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  disabled={!nextRoute}
                  className="group relative bg-white/10 hover:bg-white/20 border border-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation min-h-[44px] min-w-[44px]"
                  aria-label="Go to next slide"
                >
                  <span className="hidden sm:inline text-sm font-medium">Next</span>
                  <ChevronRight className="w-4 h-4 sm:ml-2 transition-transform group-hover:translate-x-0.5" />
                  {!nextRoute && (
                    <div className="absolute inset-0 bg-black/20 rounded-full" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Overview Modal */}
      {showOverview && (
        <div className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowOverview(false)}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-space">Presentation Overview</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOverview(false)}
                className="text-white hover:bg-white/20 rounded-full"
              >
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {slideRoutes.map((route, index) => (
                <button
                  key={route}
                  onClick={() => {
                    navigate(route);
                    setShowOverview(false);
                  }}
                  className={`aspect-video bg-white/5 rounded-lg border border-white/20 p-3 text-left transition-all duration-300 hover:bg-white/10 hover:scale-105 ${
                    index + 1 === currentSlide ? 'bg-primary/20 border-primary/50' : ''
                  }`}
                >
                  <div className="text-white/60 text-xs mb-1">Slide {index + 1}</div>
                  <div className="text-white text-sm font-medium">
                    {route.split('/').pop()?.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Swipe Indicators (Mobile) */}
      <div className="sm:hidden fixed left-4 top-1/2 -translate-y-1/2 z-40 opacity-50">
        {previousRoute && (
          <div className="text-white/60 text-xs flex items-center gap-1 animate-pulse">
            <ChevronLeft className="w-3 h-3" />
            <span>Swipe</span>
          </div>
        )}
      </div>
      
      <div className="sm:hidden fixed right-4 top-1/2 -translate-y-1/2 z-40 opacity-50">
        {nextRoute && (
          <div className="text-white/60 text-xs flex items-center gap-1 animate-pulse">
            <span>Swipe</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        )}
      </div>
    </>
  );
};

export default SlideNavigation;