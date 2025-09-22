import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Calendar, Heart, HandHeart, Share, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';

const RoadmapSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const slideImage = getSlideImageForDisplay('roadmap');
  const { getSlideContent } = useSlideContent();
  const slideContent = getSlideContent('roadmap');

  if (!slideContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/src/assets/background-community-optimized.webp" type="image/webp" />
          <img 
            src="/src/assets/roots-logo.png" 
            alt="Community Background" 
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-secondary/95 to-primary/95"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white rounded-full animate-float" style={{
          animationDelay: '1s'
        }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full animate-float" style={{
          animationDelay: '2s'
        }}></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Button variant="outline" onClick={() => navigate('/')} className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
          ← Home
        </Button>
      </div>

      {/* Roots Community Health Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <div className="text-white text-2xl font-space font-bold mb-2">ROOTS</div>
        <div className="text-white/80 text-xl font-space font-bold">12</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight font-space mb-6">
            HOW TO <span className="text-white/80">PARTICIPATE</span>
          </h1>
          <div className="w-32 h-1 bg-white/80 mx-auto mb-6 animate-scale-in"></div>
          <p className="text-lg text-white/80 max-w-3xl mx-auto font-inter leading-relaxed">
            {slideContent.description}
          </p>
        </div>

        {/* Image Showcase */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <ImageShowcase
            imageUrl={slideImage?.url}
            imageAlt={slideImage?.alt}
            onImageSelect={() => navigate('/media')}
            variant="hero"
          />
        </div>

        {/* Participation Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {Array.isArray(slideContent.sections) && slideContent.sections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-white/20">
                  {sectionIndex === 0 ? (
                    <Heart className="w-8 h-8 text-white" />
                  ) : (
                    <HandHeart className="w-8 h-8 text-white" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white font-space">{section.title}</h3>
              </div>
              <div className="space-y-4">
                {Array.isArray(section.content) && section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-white/80 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 font-inter leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Community Action Call-to-Action */}
        <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm rounded-2xl p-8 border border-accent/30">
            <div className="flex items-center justify-center gap-6">
              <Users className="w-12 h-12 text-accent" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white font-space mb-2">JOIN THE MOVEMENT</div>
                <div className="text-white/80 text-lg font-inter">Be part of Black Breastfeeding Week 2025</div>
              </div>
              <Share className="w-12 h-12 text-accent" />
            </div>
          </div>
        </div>

        {/* Event Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 font-space">AUG 25-31</div>
            <div className="text-white/80 font-inter">Black Breastfeeding Week</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 font-space">FREE</div>
            <div className="text-white/80 font-inter">Community Events</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 font-space">ALL</div>
            <div className="text-white/80 font-inter">Are Welcome</div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 text-white/80 font-space font-medium animate-fade-in" style={{ animationDelay: '2s' }}>
        PARTICIPATE. LEARN. CELEBRATE.
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={12}
        previousRoute="/slides/team-leadership"
        nextRoute="/slides/ask"
      />
    </div>
  );
};

export default RoadmapSlide;