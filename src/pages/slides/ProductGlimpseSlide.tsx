import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Users, Zap, Settings, ChevronRight, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImages } from '@/hooks/useSlideImages';

const ProductGlimpseSlide = () => {
  const navigate = useNavigate();
  const { getSlideImage } = useSlideImages();
  const slideImage = getSlideImage('product-glimpse');

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center relative">
      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
        >
          ← Home
        </Button>
      </div>

      {/* The Week Tab */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-success to-accent text-white px-6 py-20 rounded-l-lg shadow-elegant animate-slide-in">
        <div className="transform rotate-90 text-lg font-medium whitespace-nowrap font-space">
          THE WEEK
        </div>
      </div>

      {/* Event Branding */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center">
          <div className="text-accent text-2xl font-space font-bold animate-glow">BLACK BREASTFEEDING WEEK</div>
          <div className="text-muted-foreground text-sm font-inter">Monday Kick-Off</div>
        </div>
      </div>

      {/* Roots Community Health Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <div className="text-primary text-2xl font-space font-bold mb-2">ROOTS</div>
        <div className="text-accent text-xl font-space font-bold">04</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 font-space leading-tight">
            MONDAY <span className="text-accent">KICK-OFF</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-accent to-success mx-auto mb-8 animate-scale-in"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed">
            Start the week with an inspiring virtual gathering introducing the theme and setting the tone for learning and empowerment
          </p>
        </div>

        {/* Image Showcase */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <ImageShowcase
            imageId={slideImage?.imageId}
            imageAlt={slideImage?.imageAlt}
            onImageSelect={() => navigate('/media')}
            variant="standard"
          />
        </div>

        {/* Event Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Card className="bg-card/80 backdrop-blur-sm p-8 border border-accent/20 hover:bg-card/90 transition-all duration-300 hover:scale-105">
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
        <div className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div>
              <div className="text-4xl font-bold text-accent mb-2 font-space">Mon 8/25</div>
              <div className="text-muted-foreground text-sm font-inter">Virtual Kick-Off</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2 font-space">Free</div>
              <div className="text-muted-foreground text-sm font-inter">Community Event</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2 font-space">All Welcome</div>
              <div className="text-muted-foreground text-sm font-inter">Inclusive Community</div>
            </div>
          </div>
        </div>

        {/* Discussion Topics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {/* Community Conversation Visual */}
            <div className="flex flex-col items-center space-y-8">
              {/* Main Discussion Card */}
              <div className="bg-white rounded-xl shadow-elegant p-6 w-80 h-64 border border-accent/20 animate-float hover:shadow-glow transition-all duration-300">
                <div className="bg-gradient-to-br from-muted to-card rounded-lg p-4 h-full flex flex-col">
                  <div className="text-center mb-4">
                    <h4 className="font-bold text-accent font-space text-lg">DISCUSSION TOPICS</h4>
                    <div className="w-12 h-0.5 bg-accent mx-auto mt-2"></div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="text-4xl text-accent/30 mb-2">💬</div>
                      <p className="text-xs text-muted-foreground font-inter leading-relaxed">
                        • Barriers to breastfeeding<br/>
                        • Maternal mortality crisis<br/>
                        • Structural inequities<br/>
                        • Community solutions
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Support Card */}
              <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-6 w-96 h-64 relative shadow-elegant animate-float hover:shadow-glow transition-all duration-300" style={{ animationDelay: '0.5s' }}>
                <div className="bg-gradient-to-br from-white to-muted rounded-xl h-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5"></div>
                  <div className="text-center relative z-10">
                    <div className="text-2xl font-bold text-accent mb-3 font-space">COMMUNITY VOICES</div>
                    <div className="text-sm text-muted-foreground font-inter mb-4">Live Q&A Session</div>
                    <div className="flex items-center justify-center gap-2 text-accent">
                      <div className="w-2 h-2 bg-accent rounded-full animate-ping"></div>
                      <div className="text-xs font-medium">INTERACTIVE DISCUSSION</div>
                    </div>
                    <div className="mt-6">
                      <ChevronRight className="w-10 h-10 text-accent mx-auto animate-float" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 font-space leading-tight animate-fade-in">
                BOLD <span className="text-accent">CONVERSATIONS</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-inter animate-fade-in" style={{ animationDelay: '0.3s' }}>
                Join <span className="font-semibold text-accent bg-accent/10 px-1 rounded">meaningful dialogue</span> addressing real challenges and <span className="font-semibold text-accent bg-accent/10 px-1 rounded">community solutions</span>.
              </p>
            </div>

            {/* Key Discussion Points */}
            <div className="space-y-6">
              <Card className="p-6 space-y-4 border-l-4 border-l-accent bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in group" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-accent font-space">COMMUNITY CHALLENGES</h3>
                </div>
                <p className="text-sm text-muted-foreground font-inter leading-relaxed">
                  Honest discussion about barriers to breastfeeding in the Black community and the ongoing maternal health crisis.
                </p>
                <div className="text-xs text-accent font-medium">💪 Facing challenges together</div>
              </Card>

              <Card className="p-6 space-y-4 border-l-4 border-l-accent bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in group" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-accent font-space">SOLUTIONS & HEALING</h3>
                </div>
                <p className="text-sm text-muted-foreground font-inter leading-relaxed">
                  Explore solutions grounded in culture, advocacy, and healing with expert guidance from professionals and community leaders.
                </p>
                <div className="text-xs text-accent font-medium">🌱 Growing stronger together</div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 text-muted-foreground/80 font-space font-medium animate-fade-in" style={{ animationDelay: '1.5s' }}>
        BUILDING COMMUNITY THROUGH CONNECTION.
      </div>


      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={4}
        previousRoute="/slides/challenges"
        nextRoute="/slides/market-overview"
      />
    </div>
  );
};

export default ProductGlimpseSlide;