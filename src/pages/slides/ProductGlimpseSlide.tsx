import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Users, Zap, Settings, ChevronRight, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';

const ProductGlimpseSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent } = useSlideContent();
  const slideImage = getSlideImageForDisplay('monday-kickoff');
  const slideContent = getSlideContent('monday-kickoff');

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center relative">
      {/* Navigation */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-10">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="min-h-[44px] text-xs sm:text-sm px-2 sm:px-4"
        >
          ← <span className="hidden sm:inline">Home</span>
        </Button>
      </div>

      {/* The Week Tab - Hidden on mobile */}
      <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-success to-accent text-white px-4 lg:px-6 py-12 lg:py-20 rounded-l-lg shadow-elegant animate-slide-in">
        <div className="transform rotate-90 text-base lg:text-lg font-medium whitespace-nowrap font-space">
          THE WEEK
        </div>
      </div>

      {/* Event Branding */}
      <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center px-4">
          <div className="text-accent text-lg sm:text-xl lg:text-2xl font-space font-bold animate-glow">BLACK BREASTFEEDING WEEK</div>
          <div className="text-muted-foreground text-xs sm:text-sm font-inter font-semibold">{slideContent?.customFields?.category || 'EVENTS'}</div>
        </div>
      </div>

      {/* Roots Community Health Branding */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-10 text-right">
        <div className="text-primary text-lg sm:text-xl lg:text-2xl font-space font-bold mb-1 sm:mb-2">ROOTS</div>
        <div className="text-accent text-base sm:text-lg lg:text-xl font-space font-bold">04</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-20 sm:pb-24">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground mb-4 sm:mb-6 font-space leading-tight px-4">
            {slideContent?.subtitle?.toUpperCase() || 'MONDAY'} <span className="text-accent">{slideContent?.subtitle?.split(' ')[1]?.toUpperCase() || 'KICK-OFF'}</span>
          </h1>
          <div className="w-20 sm:w-24 lg:w-32 h-1 bg-gradient-to-r from-accent to-success mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed px-4 font-medium">
            {slideContent?.description || 'Start the week with an inspiring virtual gathering introducing the theme and setting the tone for learning and empowerment'}
          </p>
        </div>

        {/* Image Showcase */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <ImageShowcase
            imageUrl={slideImage?.url}
            imageAlt={slideImage?.alt}
            onImageSelect={() => navigate('/media')}
            variant="standard"
            showPlaceholder={true}
          />
        </div>

        {/* Event Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Card className="bg-card/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 border border-accent/20 hover:bg-card/90 transition-all duration-300 hover:scale-105 touch-manipulation">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-accent/20">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <div>
                <div className="text-xl font-bold text-accent font-space">Virtual</div>
                <div className="text-muted-foreground text-sm font-inter">Zoom Event</div>
              </div>
            </div>
            <p className="text-muted-foreground font-inter">
              Join online from anywhere for an inspiring welcome and community introduction
            </p>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm p-8 border border-accent/20 hover:bg-card/90 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-accent/20">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <div>
                <div className="text-xl font-bold text-accent font-space">Expert</div>
                <div className="text-muted-foreground text-sm font-inter">Speakers</div>
              </div>
            </div>
            <p className="text-muted-foreground font-inter">
              Hear from Black maternal health experts, lactation professionals, and doulas
            </p>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm p-8 border border-accent/20 hover:bg-card/90 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-accent/20">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <div>
                <div className="text-xl font-bold text-accent font-space">Safe</div>
                <div className="text-muted-foreground text-sm font-inter">Space</div>
              </div>
            </div>
            <p className="text-muted-foreground font-inter">
              A welcoming environment for learning, sharing experiences, and building community
            </p>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm p-8 border border-accent/20 hover:bg-card/90 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-accent/20">
                <Settings className="w-8 h-8 text-accent" />
              </div>
              <div>
                <div className="text-xl font-bold text-accent font-space">Live</div>
                <div className="text-muted-foreground text-sm font-inter">Q&A</div>
              </div>
            </div>
            <p className="text-muted-foreground font-inter">
              Interactive discussion with direct engagement from speakers and community voices
            </p>
          </Card>
        </div>

        {/* Event Details */}
        <div className="text-center animate-fade-in mb-8 sm:mb-12" style={{ animationDelay: '1s' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="p-4 sm:p-0">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mb-2 font-space">Mon 8/25</div>
              <div className="text-muted-foreground text-xs sm:text-sm font-inter">Virtual Kick-Off</div>
            </div>
            <div className="p-4 sm:p-0">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mb-2 font-space">Free</div>
              <div className="text-muted-foreground text-xs sm:text-sm font-inter">Community Event</div>
            </div>
            <div className="p-4 sm:p-0">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mb-2 font-space">All Welcome</div>
              <div className="text-muted-foreground text-xs sm:text-sm font-inter">Inclusive Community</div>
            </div>
          </div>
        </div>

        {/* Discussion Topics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center px-4">
          <div className="relative animate-fade-in order-2 lg:order-1" style={{ animationDelay: '0.5s' }}>
            {/* Community Conversation Visual */}
            <div className="flex flex-col items-center space-y-6 sm:space-y-8">
              {/* Main Discussion Card */}
              <div className="bg-white rounded-xl shadow-elegant p-4 sm:p-6 w-full max-w-sm lg:w-80 h-48 sm:h-64 border border-accent/20 animate-float hover:shadow-glow transition-all duration-300">
                <div className="bg-gradient-to-br from-muted to-card rounded-lg p-3 sm:p-4 h-full flex flex-col">
                  <div className="text-center mb-3 sm:mb-4">
                    <h4 className="font-bold text-accent font-space text-base sm:text-lg">DISCUSSION TOPICS</h4>
                    <div className="w-8 sm:w-12 h-0.5 bg-accent mx-auto mt-2"></div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="text-2xl sm:text-4xl text-accent/30 mb-2">💬</div>
                      <p className="text-xs leading-relaxed text-muted-foreground font-inter">
                        • Barriers to breastfeeding<br/>
                        • Maternal mortality crisis<br/>
                        • Structural inequities<br/>
                        • Community solutions
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Support Card - Hidden on mobile, shown on lg+ */}
              <div className="hidden lg:block bg-gradient-to-br from-gray-800 to-black rounded-2xl p-6 w-full max-w-md h-64 relative shadow-elegant animate-float hover:shadow-glow transition-all duration-300" style={{ animationDelay: '0.5s' }}>
                <div className="bg-gradient-to-br from-white to-muted rounded-xl h-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5"></div>
                  <div className="text-center relative z-10">
                    <div className="text-xl sm:text-2xl font-bold text-accent mb-3 font-space">COMMUNITY VOICES</div>
                    <div className="text-sm text-muted-foreground font-inter mb-4">Live Q&A Session</div>
                    <div className="flex items-center justify-center gap-2 text-accent">
                      <div className="w-2 h-2 bg-accent rounded-full animate-ping"></div>
                      <div className="text-xs font-medium">INTERACTIVE DISCUSSION</div>
                    </div>
                    <div className="mt-6">
                      <ChevronRight className="w-8 sm:w-10 h-8 sm:h-10 text-accent mx-auto animate-float" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground mb-4 sm:mb-6 font-space leading-tight animate-fade-in">
                BOLD <span className="text-accent">CONVERSATIONS</span>
              </h2>
              
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8 font-inter animate-fade-in" style={{ animationDelay: '0.3s' }}>
                Join <span className="font-semibold text-accent bg-accent/10 px-1 rounded">meaningful dialogue</span> addressing real challenges and <span className="font-semibold text-accent bg-accent/10 px-1 rounded">community solutions</span>.
              </p>
            </div>

            {/* Key Discussion Points */}
            <div className="space-y-4 sm:space-y-6">
              <Card className="p-4 sm:p-6 space-y-3 sm:space-y-4 border-l-4 border-l-accent bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in group touch-manipulation" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                    <Users className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-accent font-space">COMMUNITY CHALLENGES</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground font-inter">
                  Honest discussion about barriers to breastfeeding in the Black community and the ongoing maternal health crisis.
                </p>
                <div className="text-xs text-accent font-medium">💪 Facing challenges together</div>
              </Card>

              <Card className="p-4 sm:p-6 space-y-3 sm:space-y-4 border-l-4 border-l-accent bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in group touch-manipulation" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                    <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-accent font-space">SOLUTIONS & HEALING</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground font-inter">
                  Explore solutions grounded in culture, advocacy, and healing with expert guidance from professionals and community leaders.
                </p>
                <div className="text-xs text-accent font-medium">🌱 Growing stronger together</div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-12 sm:bottom-16 left-4 sm:left-8 text-muted-foreground/80 font-space font-medium animate-fade-in px-4 sm:px-0" style={{ animationDelay: '1.5s' }}>
        <div className="text-sm sm:text-base break-words">BUILDING COMMUNITY THROUGH CONNECTION.</div>
      </div>


      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={4}
        previousRoute="/slides/challenges"
        nextRoute="/slides/expert-panel"
      />
    </div>
  );
};

export default ProductGlimpseSlide;