import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImages } from '@/hooks/useSlideImages';

const ChallengesSlide = () => {
  const navigate = useNavigate();
  const { getSlideImage } = useSlideImages();
  const slideImage = getSlideImage('challenges');

  const handleNext = () => navigate('/slides/product-glimpse');
  const handlePrevious = () => navigate('/slides/overview');
  const handleHome = () => navigate('/');

  useSwipeNavigation({
    onPrevious: handlePrevious,
    onNext: handleNext,
  });

  useKeyboardNavigation({
    onPrevious: handlePrevious,
    onNext: handleNext,
    onHome: handleHome,
  });

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--accent)) 2px, transparent 2px)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          ← Home
        </Button>
      </div>

      {/* DX1 Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <img src="/lovable-uploads/b608d56d-eb3b-4b0b-b339-8fdffa17d540.png" alt="DX1 Logo" className="h-8 w-auto ml-auto mb-2" />
        <div className="text-accent text-xl font-space font-bold">03</div>
      </div>

      {/* The Problem Tab */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-accent to-primary text-white px-6 py-20 rounded-l-lg shadow-elegant animate-slide-in">
        <div className="transform rotate-90 text-lg font-medium whitespace-nowrap font-space">
          THE PROBLEM
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Column - Title */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4 font-space leading-tight">
                THE
              </h1>
              <h1 className="text-5xl md:text-7xl font-black text-accent mb-4 font-space leading-tight animate-slide-in">
                CHALLENGES
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-accent to-primary animate-scale-in"></div>
            </div>
            
            <p className="text-xl text-muted-foreground leading-relaxed font-inter animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Modern sports communication still has significant room for improvement. Here are some <span className="font-semibold text-accent">key challenges</span> teams face today:
            </p>
            
            {/* Problem Statement */}
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-accent/20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-accent font-medium text-sm mb-2">CURRENT STATE</div>
              <div className="text-foreground font-semibold">Teams are stuck with outdated communication methods that cost them games.</div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <ImageShowcase
              imageId={slideImage?.imageId}
              imageAlt={slideImage?.imageAlt}
              onImageSelect={() => navigate('/media')}
              variant="standard"
            />
          </div>
        </div>

        {/* Challenges List */}
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-start gap-6 group animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-5xl font-bold text-accent font-space group-hover:scale-110 transition-transform duration-300">1.</div>
            <div className="space-y-3 flex-1">
              <h3 className="text-2xl font-bold text-accent font-space">Inefficient Traditional Methods</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-primary"></div>
              <p className="text-muted-foreground font-inter leading-relaxed">
                Hand signals, shouting, and call cards <span className="font-medium text-foreground bg-accent/10 px-1 rounded">slow down</span> decision-making and <span className="font-medium text-foreground bg-accent/10 px-1 rounded">hinder</span> coordination during critical moments
              </p>
              <div className="text-sm text-accent font-medium">→ Lost seconds = Lost games</div>
            </div>
          </div>

          <div className="flex items-start gap-6 group animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-5xl font-bold text-accent font-space group-hover:scale-110 transition-transform duration-300">2.</div>
            <div className="space-y-3 flex-1">
              <h3 className="text-2xl font-bold text-accent font-space">Risk of Interceptions</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-primary"></div>
              <p className="text-muted-foreground font-inter leading-relaxed">
                Without secure communication, teams are <span className="font-medium text-foreground bg-accent/10 px-1 rounded">vulnerable</span> to interception and sabotage, weakening their competitive edge
              </p>
              <div className="text-sm text-accent font-medium">→ Exposed strategies = Predictable plays</div>
            </div>
          </div>

          <div className="flex items-start gap-6 group animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="text-5xl font-bold text-accent font-space group-hover:scale-110 transition-transform duration-300">3.</div>
            <div className="space-y-3 flex-1">
              <h3 className="text-2xl font-bold text-accent font-space">Slow Strategic Adjustments</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-primary"></div>
              <p className="text-muted-foreground font-inter leading-relaxed">
                Delays in adjusting player shifts, pitch calls, and other strategies can result in <span className="font-medium text-foreground bg-accent/10 px-1 rounded">missed opportunities</span> and ultimately <span className="font-medium text-foreground bg-accent/10 px-1 rounded">affect</span> the <span className="font-medium text-foreground bg-accent/10 px-1 rounded">outcome</span> of the game.
              </p>
              <div className="text-sm text-accent font-medium">→ Slow adaptation = Championship losses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 animate-fade-in" style={{ animationDelay: '1s' }}>
        <div className="text-accent font-bold font-space text-lg">ELEVATE YOUR GAME.</div>
        <div className="text-muted-foreground text-sm font-inter">Identify. Solve. Dominate.</div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={3}
        previousRoute="/slides/overview"
        nextRoute="/slides/product-glimpse"
      />
    </div>
  );
};

export default ChallengesSlide;