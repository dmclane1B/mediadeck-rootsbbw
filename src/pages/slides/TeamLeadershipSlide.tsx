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
      <div className="absolute top-8 left-8 z-10">
        <Button variant="outline" onClick={() => navigate('/')} className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
          ← Home
        </Button>
      </div>

      {/* Roots Community Health Branding */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center">
          <div className="text-accent text-2xl font-space font-bold animate-glow">ROOTS</div>
          <div className="text-muted-foreground text-sm font-inter">Community Health</div>
        </div>
      </div>

      {/* Slide Number */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <div className="text-accent text-xl font-space font-bold">11</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-black text-foreground mb-6 font-space leading-tight">
            {slideContent?.title || 'COMMUNITY PARTNERS'}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-accent to-primary mx-auto mb-8 animate-scale-in"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed">
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
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-8 text-center font-space">{slideContent.sections[0].title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" style={{
              animationDelay: '0.3s'
            }}>
                {slideContent.sections[0].content.map((partner, index) => (
                  <Card key={index} className="p-8 bg-card/50 backdrop-blur-sm border-l-4 border-l-accent hover:shadow-elegant transition-all duration-300 group">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Heart className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-primary font-space mb-2">{partner}</h3>
                        <p className="mt-4 text-muted-foreground font-inter leading-relaxed">
                          Supporting our community through collaborative healthcare services and resources.
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Leadership Team */}
          {slideContent?.sections?.[1] && (
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8 text-center font-space">{slideContent.sections[1].title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" style={{
              animationDelay: '0.6s'
            }}>
                {slideContent.sections[1].content.map((leader, index) => (
                  <Card key={index} className="p-8 bg-card/50 backdrop-blur-sm border-l-4 border-l-primary hover:shadow-elegant transition-all duration-300 group">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Users className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-primary font-space mb-2">{leader}</h3>
                        <p className="mt-4 text-muted-foreground font-inter leading-relaxed">
                          Dedicated to advancing community health and supporting families throughout their breastfeeding journey.
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 animate-fade-in" style={{
      animationDelay: '1s'
    }}>
        <div className="text-accent font-bold font-space text-lg">TOGETHER. STRONGER. HEALTHIER.</div>
        <div className="text-muted-foreground text-sm font-inter">Building healthy communities through partnership</div>
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