import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Award, Briefcase, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';
const TeamLeadershipSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent } = useSlideContent();
  const slideImage = getSlideImageForDisplay('team-leadership');
  const slideContent = getSlideContent('team-leadership');
  return <div className="min-h-screen bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, hsl(var(--accent)) 2px, transparent 2px)`,
        backgroundSize: '60px 60px'
      }}>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-10">
        <Button variant="outline" onClick={() => navigate('/')} className="transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[44px] text-xs sm:text-sm px-2 sm:px-4">
          ← <span className="hidden sm:inline">Home</span>
        </Button>
      </div>

      {/* Roots Community Health Branding */}
      <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center px-4">
          <div className="text-accent text-lg sm:text-xl lg:text-2xl font-space font-bold animate-glow">ROOTS</div>
          <div className="text-muted-foreground text-xs sm:text-sm font-inter">Community Health</div>
        </div>
      </div>

      {/* Slide Number */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-10 text-right">
        <div className="text-accent text-lg sm:text-xl font-space font-bold">11</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-20 sm:pb-24">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black text-foreground mb-4 sm:mb-6 font-space leading-tight px-4">
            {slideContent?.title || 'COMMUNITY PARTNERS'}
          </h1>
          <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-accent to-primary mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed px-4">
            {slideContent?.description || 'Meet the incredible organizations making Black Breastfeeding Week possible.'}
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

        <div className="max-w-6xl mx-auto">
          {/* Partner Organizations */}
          {slideContent?.sections?.[0] && (
            <div className="mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8 text-center font-space px-4">{slideContent.sections[0].title}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 animate-fade-in" style={{
              animationDelay: '0.3s'
            }}>
                {Array.isArray(slideContent.sections[0].content) ? slideContent.sections[0].content.map((partner, index) => (
                  <Card key={index} className="p-4 sm:p-6 lg:p-8 bg-card/50 backdrop-blur-sm border-l-4 border-l-accent hover:shadow-elegant transition-all duration-300 group touch-manipulation">
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Heart className="w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary font-space mb-2 break-words">{partner}</h3>
                        <p className="mt-2 sm:mt-4 text-sm sm:text-base text-muted-foreground font-inter leading-relaxed">
                          Supporting our community through collaborative healthcare services and resources.
                        </p>
                      </div>
                    </div>
                  </Card>
                )) : null}
              </div>
            </div>
          )}

          {/* Leadership Team */}
          {slideContent?.sections?.[1] && (
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8 text-center font-space px-4">{slideContent.sections[1].title}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 animate-fade-in" style={{
              animationDelay: '0.6s'
            }}>
                {Array.isArray(slideContent.sections[1].content) ? slideContent.sections[1].content.map((leader, index) => (
                  <Card key={index} className="p-4 sm:p-6 lg:p-8 bg-card/50 backdrop-blur-sm border-l-4 border-l-primary hover:shadow-elegant transition-all duration-300 group touch-manipulation">
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Users className="w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary font-space mb-2 break-words">{leader}</h3>
                        <p className="mt-2 sm:mt-4 text-sm sm:text-base text-muted-foreground font-inter leading-relaxed">
                          Dedicated to advancing community health and supporting families throughout their breastfeeding journey.
                        </p>
                      </div>
                    </div>
                  </Card>
                )) : null}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-12 sm:bottom-16 left-4 sm:left-8 animate-fade-in px-4 sm:px-0" style={{
      animationDelay: '1s'
    }}>
        <div className="text-accent font-bold font-space text-base sm:text-lg break-words">TOGETHER. STRONGER. HEALTHIER.</div>
        <div className="text-muted-foreground text-xs sm:text-sm font-inter">Building healthy communities through partnership</div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={11}
        previousRoute="/slides/value-propositions"
        nextRoute="/slides/roadmap"
      />
    </div>;
};
export default TeamLeadershipSlide;