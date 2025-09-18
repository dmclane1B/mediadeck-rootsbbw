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
  const slideImage = getSlideImageForDisplay('nutrition-education');
  const slideContent = getSlideContent('nutrition-education');
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
        <div className="text-white/80 text-sm font-inter">NUTRITION</div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-white/90 text-lg font-inter mb-4 bg-background/20 backdrop-blur-sm py-2 px-4 rounded-lg inline-block">{slideContent?.subtitle || 'Nutrition Education'}</div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight font-space mb-8 drop-shadow-lg">
            {slideContent?.title || '07 NUTRITION'}
          </h1>
          <div className="w-32 h-1 bg-white mx-auto mb-8 animate-scale-in drop-shadow-md"></div>
          {slideContent?.description && (
            <div className="bg-background/30 backdrop-blur-md p-6 rounded-xl border border-white/20 max-w-3xl mx-auto">
              <p className="text-white text-lg font-inter leading-relaxed">
                {slideContent.description}
              </p>
            </div>
          )}
        </div>

        {/* Image Showcase */}
        <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ImageShowcase
            imageUrl={slideImage?.url}
            imageAlt={slideImage?.alt || slideContent?.title || 'Nutrition Education'}
            variant="featured"
          />
        </div>

        {/* Nutrition Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in" style={{
        animationDelay: '0.5s'
      }}>
          {/* Lactation Support */}
          <div className="bg-background/25 backdrop-blur-md p-6 rounded-xl border border-white/30 hover:bg-background/35 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-2 font-space">24/7</div>
            <div className="text-white font-medium mb-2 font-space">Lactation Support</div>
            <p className="text-white/90 text-sm font-inter leading-relaxed">
              Professional lactation consultants available around the clock for breastfeeding guidance and support
            </p>
          </div>

          {/* Nutrition Counseling */}
          <div className="bg-background/25 backdrop-blur-md p-6 rounded-xl border border-white/30 hover:bg-background/35 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-2 font-space">FREE</div>
            <div className="text-white font-medium mb-2 font-space">Nutrition Counseling</div>
            <p className="text-white/90 text-sm font-inter leading-relaxed">
              Personalized nutrition planning and dietary guidance for optimal breastfeeding health
            </p>
          </div>

          {/* Educational Resources */}
          <div className="bg-background/25 backdrop-blur-md p-6 rounded-xl border border-white/30 hover:bg-background/35 transition-all duration-300 hover:scale-105">
            <div className="text-4xl font-bold text-white mb-2 font-space">100+</div>
            <div className="text-white font-medium mb-2 font-space">Resources Available</div>
            <p className="text-white/90 text-sm font-inter leading-relaxed">
              Comprehensive educational materials, meal plans, and nutritional supplements guidance
            </p>
          </div>
        </div>

        {/* Nutrition Services */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in" style={{
        animationDelay: '1s'
      }}>
          <div className="bg-background/20 backdrop-blur-md p-8 rounded-xl border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4 font-space">Nutrition Services</h3>
            <ul className="space-y-3 text-white/95 font-inter">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Professional lactation consultant appointments
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Breastfeeding nutrition workshops and classes
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Healthy meal planning for nursing mothers
              </li>
            </ul>
          </div>

          <div className="bg-background/20 backdrop-blur-md p-8 rounded-xl border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4 font-space">Support Available</h3>
            <ul className="space-y-3 text-white/95 font-inter">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                One-on-one nutrition counseling sessions
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Group breastfeeding support meetings
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Educational materials and follow-up care
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 bg-background/30 backdrop-blur-sm py-2 px-4 rounded-lg animate-fade-in" style={{
      animationDelay: '1.5s'
    }}>
        <div className="text-white font-space font-medium">
          NOURISHING MOTHERS. STRENGTHENING BABIES.
        </div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={7}
        previousRoute="/slides/community-voices"
        nextRoute="/slides/workout-session"
      />
    </div>;
};
export default ProofDemandSlide;