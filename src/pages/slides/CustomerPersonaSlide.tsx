import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Apple, Clock, Heart, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';

const CustomerPersonaSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent } = useSlideContent();
  const slideImage = getSlideImageForDisplay('customer-persona');
  const slideContent = getSlideContent('customer-persona');

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 30% 70%, hsl(var(--primary)) 2px, transparent 2px)`,
               backgroundSize: '40px 40px'
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

      {/* Roots Community Health Branding */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center">
          <div className="text-accent text-2xl font-space font-bold animate-glow">ROOTS</div>
          <div className="text-muted-foreground text-sm font-inter">Community Health</div>
        </div>
      </div>

      {/* Slide Number */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <div className="text-accent text-xl font-space font-bold">09</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-black text-foreground mb-6 font-space leading-tight">
            {slideContent?.title || 'SMOOTHIE DEMO'}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-accent to-primary mx-auto mb-8 animate-scale-in"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed">
            {slideContent?.description || 'Learn to make nutritious smoothies that support breastfeeding and overall health.'}
          </p>
        </div>

        {/* Image Showcase */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ImageShowcase
            imageUrl={slideImage?.url}
            imageAlt={slideImage?.alt}
            onImageSelect={() => navigate('/media')}
            variant="standard"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Learning Section */}
          {slideContent?.sections?.[0] && (
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-l-4 border-l-accent hover:shadow-elegant transition-all duration-300">
                <div className="flex items-center gap-6 mb-8">
                  <div className="p-4 rounded-full bg-accent/10">
                    <ChefHat className="w-12 h-12 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-accent font-space">{slideContent.sections[0].title}</h2>
                    <p className="text-lg text-muted-foreground font-inter">Nutrition Workshop</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <ul className="space-y-3 text-muted-foreground font-inter">
                    {Array.isArray(slideContent.sections[0].content) ? slideContent.sections[0].content.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        {item}
                      </li>
                    )) : null}
                  </ul>
                </div>
              </Card>
            </div>
          )}

          {/* Event Details */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {/* Nutrition Benefits */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-accent/20 hover:shadow-card transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold text-accent font-space">Health Benefits</h3>
              </div>
              <div className="space-y-3 text-sm font-inter">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Supports lactation and milk production</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Provides essential nutrients for new mothers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Boosts energy and supports recovery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Easy to prepare and family-friendly</span>
                </div>
              </div>
            </Card>

            {/* Event Details */}
            {slideContent?.sections?.[1] && (
              <Card className="p-6 bg-card/50 backdrop-blur-sm border border-accent/20 hover:shadow-card transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold text-accent font-space">{slideContent.sections[1].title}</h3>
                </div>
                <div className="space-y-3 text-sm font-inter">
                  {Array.isArray(slideContent.sections[1].content) ? slideContent.sections[1].content.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  )) : null}
                </div>
              </Card>
            )}

            {/* Featured Ingredients */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border border-accent/20 hover:shadow-card transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Apple className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold text-accent font-space">Featured Ingredients</h3>
              </div>
              <div className="space-y-3 text-sm font-inter">
                <div>
                  <div className="font-medium text-foreground mb-1">Superfoods</div>
                  <div className="text-muted-foreground">Spinach, kale, berries, and chia seeds</div>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">Protein Sources</div>
                  <div className="text-muted-foreground">Greek yogurt, nut butters, protein powder</div>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">Natural Sweeteners</div>
                  <div className="text-muted-foreground">Dates, bananas, and pure maple syrup</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 animate-fade-in" style={{ animationDelay: '1s' }}>
        <div className="text-accent font-bold font-space text-lg">NOURISH. LEARN. THRIVE.</div>
        <div className="text-muted-foreground text-sm font-inter">Nutrition education for wellness</div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={9}
        previousRoute="/slides/sales-strategy"
        nextRoute="/slides/value-propositions"
      />
    </div>
  );
};

export default CustomerPersonaSlide;