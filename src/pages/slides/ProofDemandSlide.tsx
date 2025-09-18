import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';

const ProofDemandSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent } = useSlideContent();
  const slideImage = getSlideImageForDisplay('proof-demand');
  const slideContent = getSlideContent('proof-demand');
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


      {/* Roots Community Health Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <div className="text-white text-xl font-space font-bold">07</div>
        <div className="text-white/80 text-sm font-inter">EVENTS</div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-white/60 text-lg font-inter mb-4">{slideContent?.subtitle || 'Community Health Event'}</div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight font-space mb-8">
            {slideContent?.title || 'WELLNESS FAIR'}
          </h1>
          <div className="w-32 h-1 bg-white/80 mx-auto mb-8 animate-scale-in"></div>
          {slideContent?.description && (
            <p className="text-white/80 text-lg font-inter max-w-3xl mx-auto">
              {slideContent.description}
            </p>
          )}
        </div>

        {/* Image Showcase */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ImageShowcase
            imageUrl={slideImage?.url}
            imageAlt={slideImage?.alt || slideContent?.title || 'Wellness Fair'}
            variant="featured"
          />
        </div>

        {/* Event Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in" style={{
        animationDelay: '0.5s'
      }}>
          {/* Resource Booths */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-2 font-space">15+</div>
            <div className="text-white/80 font-medium mb-2 font-space">Resource Booths</div>
            <p className="text-white/70 text-sm font-inter">
              Community vendors, health organizations, and lactation specialists providing valuable resources
            </p>
          </div>

          {/* Health Screenings */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-2 font-space">FREE</div>
            <div className="text-white/80 font-medium mb-2 font-space">Health Screenings</div>
            <p className="text-white/70 text-sm font-inter">
              Blood pressure checks, BMI assessments, and wellness consultations available for all attendees
            </p>
          </div>

          {/* Family Activities */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-2 font-space">ALL</div>
            <div className="text-white/80 font-medium mb-2 font-space">Ages Welcome</div>
            <p className="text-white/70 text-sm font-inter">
              Family-friendly activities, children's area, and interactive wellness demonstrations
            </p>
          </div>
        </div>

        {/* Event Details */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" style={{
        animationDelay: '1s'
      }}>
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4 font-space">Event Highlights</h3>
            <ul className="space-y-3 text-white/80 font-inter">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Interactive wellness booths and demonstrations
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Free health screenings and consultations
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Community networking and resource sharing
              </li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4 font-space">What to Expect</h3>
            <ul className="space-y-3 text-white/80 font-inter">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Local health organizations and vendors
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Educational materials and giveaways
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Family-friendly activities for all ages
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 text-white/80 font-space font-medium animate-fade-in" style={{
      animationDelay: '1.5s'
    }}>
        WELLNESS FOR ALL. COMMUNITY STRONG.
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