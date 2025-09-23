import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, DollarSign, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';

const MarketOverviewSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent } = useSlideContent();
  const slideImage = getSlideImageForDisplay('community-voices');
  const slideContent = getSlideContent('community-voices');

  return (
    <div className="min-h-screen min-h-[100dvh] bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/roots-logo-new.png" 
          alt="Roots Community Health Logo" 
          className="w-full h-full object-contain opacity-5 sm:opacity-10"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/95"></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-10">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[44px] text-xs sm:text-sm px-2 sm:px-4"
        >
          ← <span className="hidden sm:inline">Home</span>
        </Button>
      </div>

      {/* Roots Community Health Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <div className="text-primary text-2xl font-space font-bold mb-2">ROOTS</div>
        <div className="text-slate-500 text-xl font-space font-bold">06</div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-16 animate-float">
        <TrendingUp className="w-8 h-8 text-accent/30" />
      </div>
      
      <div className="absolute bottom-32 left-16 animate-float" style={{ animationDelay: '1s' }}>
        <Target className="w-6 h-6 text-primary/30" />
      </div>

      <div className="absolute bottom-48 right-24 animate-float" style={{ animationDelay: '2s' }}>
        <DollarSign className="w-10 h-10 text-success/30" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="text-primary/80 text-sm sm:text-lg font-inter mb-4 font-semibold">{slideContent?.customFields?.category || 'EVENTS'}</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black text-slate-900 mb-4 sm:mb-6 font-space leading-tight">
            {slideContent?.subtitle || 'Community'} <span className="text-primary">{slideContent?.subtitle?.split(' ')[1] || 'Voices'}</span>
          </h1>
          <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
          <p className="text-base sm:text-lg lg:text-xl text-slate-800 max-w-4xl mx-auto font-inter leading-relaxed font-medium px-4">
            {slideContent?.description || 'Hear directly from local Black mothers sharing their breastfeeding journeys, challenges, and triumphs in our community.'}
          </p>
        </div>

        {/* Image Showcase */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ImageShowcase
            imageUrl={slideImage?.url}
            imageAlt={slideImage?.alt}
            onImageSelect={() => navigate('/media')}
            variant="hero"
            showPlaceholder={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start pb-24">
          {/* Left Column - Panel Features */}
          <div className="space-y-8 sm:space-y-12">
            {/* Panel Participants */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-xl border border-primary/30 group-hover:shadow-elegant transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary mb-2 font-space animate-glow">
                      5+
                    </div>
                    <div className="text-slate-900 font-bold text-base sm:text-lg">Panel Participants</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-700 font-inter">
                  <div className="text-slate-900 font-semibold">Local mothers sharing authentic experiences</div>
                  <div>• New mothers navigating breastfeeding challenges</div>
                  <div>• Experienced mothers sharing wisdom</div>
                  <div>• Mothers who overcame barriers to breastfeed</div>
                  <div className="text-xs bg-primary/15 text-primary px-3 py-1.5 rounded-full mt-3 inline-block font-semibold">
                    Real stories, real solutions
                  </div>
                </div>
              </div>
            </div>

            {/* Discussion Topics */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-accent/30 group-hover:shadow-elegant transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <div className="text-5xl md:text-6xl font-black text-accent mb-2 font-space">
                      REAL
                    </div>
                    <div className="text-slate-900 font-bold text-lg">Authentic Conversations</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-700 font-inter">
                  <div className="text-slate-900 font-semibold">Topics that matter to our community</div>
                  <div>• Overcoming societal barriers and stigma</div>
                  <div>• Finding support within family and community</div>
                  <div>• Balancing work and breastfeeding goals</div>
                  <div>• Building confidence and self-advocacy</div>
                  <div className="text-xs bg-accent/15 text-accent px-3 py-1.5 rounded-full mt-3 inline-block font-semibold">
                    Honest, supportive dialogue
                  </div>
                </div>
              </div>
            </div>

            {/* Community Impact */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-primary/30 group-hover:shadow-elegant transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <div className="text-4xl md:text-5xl font-black text-primary mb-2 font-space">
                      STRONG
                    </div>
                    <div className="text-slate-900 font-bold text-lg">Community Connection</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-700 font-inter">
                  <div className="text-slate-900 font-semibold">Building lasting support networks</div>
                  <div>• Connect with mothers in similar situations</div>
                  <div>• Share resources and practical tips</div>
                  <div>• Create ongoing peer support groups</div>
                  <div>• Celebrate successes together</div>
                  <div className="text-xs bg-primary/15 text-primary px-3 py-1.5 rounded-full mt-3 inline-block font-semibold">
                    Together we are stronger
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Event Details */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-space text-center">Panel Details</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Interactive Discussion</div>
                    <div className="text-sm text-slate-600">Q&A with audience participation</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Safe Space</div>
                    <div className="text-sm text-slate-600">Judgment-free environment for sharing</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Actionable Insights</div>
                    <div className="text-sm text-slate-600">Practical tips and resources shared</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-slate-900 mb-2">Wednesday, August 27</div>
                    <div className="text-sm text-slate-600">Virtual & In-Person Options Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Dots */}
      <div className="absolute bottom-8 right-8">
        <div className="grid grid-cols-6 gap-1">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-muted-foreground/20 rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={6}
        previousRoute="/slides/expert-panel"
        nextRoute="/slides/nutrition-education"
      />
    </div>
  );
};

export default MarketOverviewSlide;