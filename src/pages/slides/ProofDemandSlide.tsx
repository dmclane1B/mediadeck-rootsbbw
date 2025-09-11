import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import useSlideImages from '@/hooks/useSlideImages';

const ProofDemandSlide = () => {
  const navigate = useNavigate();
  const { getSlideImage } = useSlideImages();
  const slideImage = getSlideImage('proof-demand');
  return <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-success flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/5 w-40 h-40 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-1/4 right-1/5 w-28 h-28 bg-white rounded-full animate-float" style={{
        animationDelay: '1.5s'
      }}></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-white rounded-full animate-float" style={{
        animationDelay: '3s'
      }}></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Button variant="outline" onClick={() => navigate('/')} className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
          ← Home
        </Button>
      </div>


      {/* DX1 Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <img src="/lovable-uploads/b608d56d-eb3b-4b0b-b339-8fdffa17d540.png" alt="DX1 Logo" className="h-8 w-auto ml-auto mb-2" />
        <div className="text-white text-xl font-space font-bold">07</div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-white/60 text-lg font-inter mb-4">Market Validation & Demand Analysis</div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight font-space mb-8">
            PROOF OF <span className="text-white/80">DEMAND</span><br />
            AND <span className="text-white/80">MARKET FIT</span>
          </h1>
          <div className="w-32 h-1 bg-white/80 mx-auto mb-8 animate-scale-in"></div>
        </div>

        {/* Image Showcase */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ImageShowcase
            imageId={slideImage?.imageId}
            imageAlt={slideImage?.imageAlt || 'Proof of Demand'}
            variant="featured"
          />
        </div>

        {/* Proof Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in" style={{
        animationDelay: '0.5s'
      }}>
          {/* Survey Results */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-2 font-space">87%</div>
            <div className="text-white/80 font-medium mb-2 font-space">Survey Response</div>
            <p className="text-white/70 text-sm font-inter">
              Coaches agree current communication methods are inadequate for competitive play
            </p>
            
          </div>

          {/* Market Research */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-2 font-space">73%</div>
            <div className="text-white/80 font-medium mb-2 font-space">Willing to Pay</div>
            <p className="text-white/70 text-sm font-inter">
              Teams willing to invest $2,000+ annually for secure communication solutions
            </p>
            <div className="text-xs text-white/60 mt-3">*Market research findings 2024</div>
          </div>

          {/* Early Adopters */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-2 font-space">12+</div>
            <div className="text-white/80 font-medium mb-2 font-space">Pilot Programs</div>
            <p className="text-white/70 text-sm font-inter">
              Active pilot programs with Division I and high school teams showing 40% improvement
            </p>
            <div className="text-xs text-white/60 mt-3">*Beta testing results Q3 2024</div>
          </div>
        </div>

        {/* Market Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" style={{
        animationDelay: '1s'
      }}>
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4 font-space">Market Trends</h3>
            <ul className="space-y-3 text-white/80 font-inter">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Sports tech market growing 15% annually
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Digital adoption accelerated post-2020
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Increased focus on competitive advantage
              </li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4 font-space">Validation Sources</h3>
            <ul className="space-y-3 text-white/80 font-inter">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                NCAA coaching conferences feedback
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                State athletic director surveys
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Sports technology trade shows
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 text-white/80 font-space font-medium animate-fade-in" style={{
      animationDelay: '1.5s'
    }}>
        PROVEN DEMAND. READY TO SCALE.
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={7}
        previousRoute="/slides/market-overview"
        nextRoute="/slides/sales-strategy"
      />
    </div>;
};
export default ProofDemandSlide;