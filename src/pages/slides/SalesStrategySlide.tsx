import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Target, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';

const SalesStrategySlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const slideImage = getSlideImageForDisplay('sales-strategy');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-success flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
        >
          ← Home
        </Button>
      </div>

      {/* DX1 Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <img src="/lovable-uploads/b608d56d-eb3b-4b0b-b339-8fdffa17d540.png" alt="DX1 Logo" className="h-8 w-auto ml-auto mb-2" />
        <div className="text-white text-xl font-space font-bold">08</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight font-space mb-8">
            SALES <span className="text-white/80">STRATEGY</span>
          </h1>
          <div className="w-32 h-1 bg-white/80 mx-auto mb-8 animate-scale-in"></div>
          <p className="text-xl text-white/80 max-w-4xl mx-auto font-inter leading-relaxed">
            Strategic approach to penetrate the sports communication market and drive rapid adoption
          </p>
        </div>

        {/* Image Showcase */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <ImageShowcase
            imageUrl={slideImage?.url}
            imageAlt={slideImage?.alt || 'Sales Strategy'}
            variant="featured"
          />
        </div>

        {/* Strategy Components */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {/* Phase 1 */}
          <Card className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-white/20">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-space">Phase 1</div>
                <div className="text-white/80 text-sm font-inter">Market Entry</div>
              </div>
            </div>
            <ul className="space-y-3 text-white/80 font-inter">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Target Division I programs
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Pilot program partnerships
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Proof of concept validation
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Case study development
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="text-white font-medium">Timeline: 6 months</div>
            </div>
          </Card>

          {/* Phase 2 */}
          <Card className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-white/20">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-space">Phase 2</div>
                <div className="text-white/80 text-sm font-inter">Market Expansion</div>
              </div>
            </div>
            <ul className="space-y-3 text-white/80 font-inter">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Division II/III outreach
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                High school market entry
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Channel partner development
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Regional sales teams
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="text-white font-medium">Timeline: 12 months</div>
            </div>
          </Card>

          {/* Phase 3 */}
          <Card className="bg-white/10 backdrop-blur-sm p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-white/20">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-space">Phase 3</div>
                <div className="text-white/80 text-sm font-inter">Scale & Optimize</div>
              </div>
            </div>
            <ul className="space-y-3 text-white/80 font-inter">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                National market coverage
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                International expansion
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Product line extensions
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Strategic acquisitions
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="text-white font-medium">Timeline: 18+ months</div>
            </div>
          </Card>
        </div>

        {/* Key Metrics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2 font-space">500+</div>
            <div className="text-white/80 text-sm font-inter">Year 1 Teams</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2 font-space">$2.5M</div>
            <div className="text-white/80 text-sm font-inter">Year 1 Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2 font-space">85%</div>
            <div className="text-white/80 text-sm font-inter">Retention Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2 font-space">3x</div>
            <div className="text-white/80 text-sm font-inter">Growth Target</div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 text-white/80 font-space font-medium animate-fade-in" style={{ animationDelay: '1.5s' }}>
        STRATEGIC. SCALABLE. SUCCESSFUL.
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={8}
        previousRoute="/slides/proof-demand"
        nextRoute="/slides/customer-persona"
      />
    </div>
  );
};

export default SalesStrategySlide;