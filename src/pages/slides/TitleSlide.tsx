import React from 'react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';

const TitleSlide = () => {
  const navigate = useNavigate();

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
      
      {/* DX1 Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <img src="/lovable-uploads/b608d56d-eb3b-4b0b-b339-8fdffa17d540.png" alt="DX1 Logo" className="h-8 w-auto ml-auto mb-2" />
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
      <div className="max-w-6xl mx-auto text-center px-4 sm:px-8 animate-fade-in z-10 relative">
        <div className="mb-8 sm:mb-16">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-foreground tracking-wide animate-scale-in font-space leading-none mb-4 sm:mb-8">
            DX1
          </h1>
          <div className="text-xl sm:text-3xl md:text-4xl text-muted-foreground font-inter mb-4 sm:mb-8">
            ELEVATE YOUR GAME
          </div>
          <div className="w-20 sm:w-32 h-1 bg-primary mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in px-4" style={{ animationDelay: '1s' }}>
          We are revolutionizing sports communication through AI-driven, encrypted coordination that combines the speed of real-time technology with the intelligence of advanced analytics, redefining how strategies are shared and executed on the field.
        </div>
        
        <Button 
          onClick={handleOverview}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-lg animate-fade-in shadow-lg"
          style={{ animationDelay: '1.2s' }}
        >
          View Presentation Overview
        </Button>
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