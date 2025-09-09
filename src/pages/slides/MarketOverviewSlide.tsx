import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MarketChart from '@/components/MarketChart';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImages } from '@/hooks/useSlideImages';

const MarketOverviewSlide = () => {
  const navigate = useNavigate();
  const { getSlideImage } = useSlideImages();
  const slideImage = getSlideImage('market-overview');

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `linear-gradient(45deg, hsl(var(--accent)) 1px, transparent 1px), linear-gradient(-45deg, hsl(var(--primary)) 1px, transparent 1px)`,
               backgroundSize: '30px 30px'
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
        <div className="text-accent text-xl font-space font-bold">06</div>
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
          <div className="text-accent/60 text-lg font-inter mb-4">TAM-SAM-SOM Framework Analysis</div>
          <h1 className="text-6xl md:text-8xl font-black text-foreground mb-6 font-space leading-tight">
            Market <span className="text-accent">Opportunity</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-accent to-success mx-auto mb-8 animate-scale-in"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed">
            RF-enabled wearable technology market with <span className="font-bold text-accent bg-accent/10 px-2 py-1 rounded">mission-critical communication</span> applications across sports, defense, and industrial sectors.
          </p>
        </div>

        {/* Image Showcase */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ImageShowcase
            imageId={slideImage?.imageId}
            imageAlt={slideImage?.imageAlt}
            onImageSelect={() => navigate('/media')}
            variant="standard"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - TAM-SAM-SOM Framework */}
          <div className="space-y-12">
            {/* TAM */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-8 rounded-xl border border-accent/20 group-hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <div className="text-6xl md:text-7xl font-black text-accent mb-2 font-space animate-glow">
                      $600B+
                    </div>
                    <div className="text-primary font-bold text-lg">TAM - Total Addressable Market</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground font-inter">
                  <div className="text-foreground font-medium">Entire Wearable Technology Market by 2033</div>
                  <div>• Smartwatches, fitness trackers, VR/AR headsets</div>
                  <div>• Health monitors, enterprise wearables</div>
                  <div>• Consumer audio & defense applications</div>
                  <div className="text-xs bg-accent/10 text-accent px-2 py-1 rounded mt-2 inline-block">
                    Growing from $70B-$180B in 2024
                  </div>
                </div>
              </div>
            </div>

            {/* SAM */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="bg-gradient-to-r from-primary/10 to-success/10 p-8 rounded-xl border border-primary/20 group-hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <div className="text-5xl md:text-6xl font-black text-primary mb-2 font-space">
                      $30B
                    </div>
                    <div className="text-foreground font-bold text-lg">SAM - Serviceable Available Market</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground font-inter">
                  <div className="text-foreground font-medium">RF-Enabled Mission-Critical Wearables</div>
                  <div>• Professional sports communication systems</div>
                  <div>• Defense & military wearables</div>
                  <div>• Industrial workforce communications</div>
                  <div>• Specialized medical RF telemetry</div>
                  <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mt-2 inline-block">
                    ~5% of TAM, growing faster than base market
                  </div>
                </div>
              </div>
            </div>

            {/* SOM */}
            <div className="group animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="bg-gradient-to-r from-success/10 to-accent/10 p-8 rounded-xl border border-success/20 group-hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <div className="text-4xl md:text-5xl font-black text-success mb-2 font-space">
                      $200M
                    </div>
                    <div className="text-foreground font-bold text-lg">SOM - Serviceable Obtainable Market</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground font-inter">
                  <div className="text-foreground font-medium">Realistic 3-5 Year Capture Target</div>
                  <div>• Sports + coaching communications (NFL, NCAA)</div>
                  <div>• Industrial pilot projects</div>
                  <div>• Defense innovation partnerships</div>
                  <div>• RF module licensing to OEMs</div>
                  <div className="text-xs bg-success/10 text-success px-2 py-1 rounded mt-2 inline-block">
                    Beachhead: Sports comms expansion path
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Market Chart */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <MarketChart />
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
        currentSlide={5}
        previousRoute="/slides/product-glimpse"
        nextRoute="/slides/proof-demand"
      />
    </div>
  );
};

export default MarketOverviewSlide;