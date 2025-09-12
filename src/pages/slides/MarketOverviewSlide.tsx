import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, DollarSign, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MarketChart from '@/components/MarketChart';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';

const MarketOverviewSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const slideImage = getSlideImageForDisplay('market-overview');

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/src/assets/background-community-optimized.webp" type="image/webp" />
          <img 
            src="/src/assets/background-community.png" 
            alt="Community Panel" 
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/95 to-slate-100/95"></div>
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
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-slate-500/60 text-lg font-inter mb-4">Community Panel Discussion</div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 font-space leading-tight">
            Community <span className="text-primary">Voices</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 animate-scale-in"></div>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto font-inter leading-relaxed">
            Hear directly from <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded">local Black mothers</span> sharing their breastfeeding journeys, challenges, and triumphs in our community.
          </p>
        </div>

        {/* Image Showcase */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ImageShowcase
            imageUrl={slideImage?.url}
            imageAlt={slideImage?.alt}
            onImageSelect={() => navigate('/media')}
            variant="hero"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Panel Features */}
          <div className="space-y-12">
            {/* Panel Participants */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-xl border border-primary/20 group-hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <div className="text-6xl md:text-7xl font-black text-primary mb-2 font-space animate-glow">
                      5+
                    </div>
                    <div className="text-slate-900 font-bold text-lg">Panel Participants</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-600 font-inter">
                  <div className="text-slate-900 font-medium">Local mothers sharing authentic experiences</div>
                  <div>• New mothers navigating breastfeeding challenges</div>
                  <div>• Experienced mothers sharing wisdom</div>
                  <div>• Mothers who overcame barriers to breastfeed</div>
                  <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mt-2 inline-block">
                    Real stories, real solutions
                  </div>
                </div>
              </div>
            </div>

            {/* Discussion Topics */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-8 rounded-xl border border-accent/20 group-hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <div className="text-5xl md:text-6xl font-black text-accent mb-2 font-space">
                      REAL
                    </div>
                    <div className="text-slate-900 font-bold text-lg">Authentic Conversations</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-600 font-inter">
                  <div className="text-slate-900 font-medium">Topics that matter to our community</div>
                  <div>• Overcoming societal barriers and stigma</div>
                  <div>• Finding support within family and community</div>
                  <div>• Balancing work and breastfeeding goals</div>
                  <div>• Building confidence and self-advocacy</div>
                  <div className="text-xs bg-accent/10 text-accent px-2 py-1 rounded mt-2 inline-block">
                    Honest, supportive dialogue
                  </div>
                </div>
              </div>
            </div>

            {/* Community Impact */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-xl border border-primary/20 group-hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <div className="text-4xl md:text-5xl font-black text-primary mb-2 font-space">
                      STRONG
                    </div>
                    <div className="text-slate-900 font-bold text-lg">Community Connection</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-slate-600 font-inter">
                  <div className="text-slate-900 font-medium">Building lasting support networks</div>
                  <div>• Connect with mothers in similar situations</div>
                  <div>• Share resources and practical tips</div>
                  <div>• Create ongoing peer support groups</div>
                  <div>• Celebrate successes together</div>
                  <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mt-2 inline-block">
                    Together we are stronger
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Event Details */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg">
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
        previousRoute="/slides/product-glimpse"
        nextRoute="/slides/proof-demand"
      />
    </div>
  );
};

export default MarketOverviewSlide;