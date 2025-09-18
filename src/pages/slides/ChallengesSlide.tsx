import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';

const ChallengesSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent } = useSlideContent();
  const slideImage = getSlideImageForDisplay('challenges');
  const slideContent = getSlideContent('challenges');

  const handleNext = () => navigate('/slides/monday-kickoff');
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

      {/* Roots Community Health Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <div className="text-primary text-2xl font-space font-bold mb-2">ROOTS</div>
        <div className="text-accent text-xl font-space font-bold">03</div>
      </div>

      {/* Why This Matters Tab */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-accent to-primary text-white px-6 py-20 rounded-l-lg shadow-elegant animate-slide-in">
        <div className="transform rotate-90 text-lg font-medium whitespace-nowrap font-space">
          WHY THIS MATTERS
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16 items-start mb-16">
          {/* Left Column - Title */}
          <div className="space-y-8 animate-fade-in lg:col-span-2">
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4 font-space leading-tight">
                {slideContent?.title?.split(' ')[0] || 'WHY'}
              </h1>
              <h1 className="text-5xl md:text-7xl font-black text-accent mb-4 font-space leading-tight animate-slide-in">
                {slideContent?.title?.split(' ').slice(1).join(' ') || 'THIS MATTERS'}
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-accent to-primary animate-scale-in"></div>
            </div>
            
            <p className="text-xl text-muted-foreground leading-relaxed font-inter animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {slideContent?.description || 'Addressing critical challenges in our community'}. Here are the <span className="font-semibold text-accent">key challenges</span> we're working to overcome:
            </p>
            
            {/* Problem Statement */}
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-accent/20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-accent font-medium text-sm mb-2">CURRENT REALITY</div>
              <div className="text-foreground font-semibold">In the Black community, breastfeeding rates are lower compared to other communities, contributing to health disparities.</div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="animate-fade-in lg:col-span-3" style={{ animationDelay: '0.4s' }}>
            <ImageShowcase
              imageUrl={slideImage?.url}
              imageAlt={slideImage?.alt}
              onImageSelect={() => navigate('/media')}
              variant="hero"
            />
          </div>
        </div>

        {/* Challenges List */}
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex items-start gap-6 group animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-5xl font-bold text-accent font-space group-hover:scale-110 transition-transform duration-300">1.</div>
            <div className="space-y-3 flex-1">
              <h3 className="text-2xl font-bold text-accent font-space">Lower Breastfeeding Rates</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-primary"></div>
              <p className="text-muted-foreground font-inter leading-relaxed">
                Black women have <span className="font-medium text-foreground bg-accent/10 px-1 rounded">significantly lower</span> breastfeeding initiation and duration rates compared to other racial groups, affecting long-term health outcomes
              </p>
              <div className="text-sm text-accent font-medium">→ Health disparities start early</div>
            </div>
          </div>

          <div className="flex items-start gap-6 group animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-5xl font-bold text-accent font-space group-hover:scale-110 transition-transform duration-300">2.</div>
            <div className="space-y-3 flex-1">
              <h3 className="text-2xl font-bold text-accent font-space">Maternal Mortality Crisis</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-primary"></div>
              <p className="text-muted-foreground font-inter leading-relaxed">
                Black women are <span className="font-medium text-foreground bg-accent/10 px-1 rounded">three to four times</span> more likely to die from pregnancy-related complications, highlighting critical gaps in maternal healthcare
              </p>
              <div className="text-sm text-accent font-medium">→ Lives depend on addressing this crisis</div>
            </div>
          </div>

          <div className="flex items-start gap-6 group animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="text-5xl font-bold text-accent font-space group-hover:scale-110 transition-transform duration-300">3.</div>
            <div className="space-y-3 flex-1">
              <h3 className="text-2xl font-bold text-accent font-space">Structural Barriers</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-primary"></div>
              <p className="text-muted-foreground font-inter leading-relaxed">
                <span className="font-medium text-foreground bg-accent/10 px-1 rounded">Systemic inequities</span> in healthcare access, workplace support, and community resources create barriers to successful breastfeeding journeys
              </p>
              <div className="text-sm text-accent font-medium">→ Change requires community action</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 animate-fade-in" style={{ animationDelay: '1s' }}>
        <div className="text-accent font-bold font-space text-lg">TOGETHER WE THRIVE.</div>
        <div className="text-muted-foreground text-sm font-inter">Educate. Support. Empower.</div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={3}
        previousRoute="/slides/overview"
        nextRoute="/slides/monday-kickoff"
      />
    </div>
  );
};

export default ChallengesSlide;