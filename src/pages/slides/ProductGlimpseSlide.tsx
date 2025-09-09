import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Users, Zap, Settings, ChevronRight, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';

const ProductGlimpseSlide = () => {
  const navigate = useNavigate();

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

      {/* The Solution Tab */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-success to-accent text-white px-6 py-20 rounded-l-lg shadow-elegant animate-slide-in">
        <div className="transform rotate-90 text-lg font-medium whitespace-nowrap font-space">
          THE SOLUTION
        </div>
      </div>

      {/* DX1 Branding */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center">
          <div className="text-accent text-2xl font-space font-bold animate-glow">DX1</div>
          <div className="text-muted-foreground text-sm font-inter">Product Overview</div>
        </div>
      </div>

      {/* DX1 Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <img src="/lovable-uploads/b608d56d-eb3b-4b0b-b339-8fdffa17d540.png" alt="DX1 Logo" className="h-8 w-auto ml-auto mb-2" />
        <div className="text-accent text-xl font-space font-bold">04</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 font-space leading-tight">
            PRODUCT <span className="text-accent">OVERVIEW</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-accent to-success mx-auto mb-8 animate-scale-in"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed">
            Comprehensive overview of DX1's features and capabilities for modern sports teams
          </p>
        </div>

        {/* Product Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Card className="bg-card/80 backdrop-blur-sm p-8 border border-accent/20 hover:bg-card/90 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-accent/20">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <div>
                <div className="text-xl font-bold text-accent font-space">Real-Time</div>
                <div className="text-muted-foreground text-sm font-inter">Communication</div>
              </div>
            </div>
            <p className="text-muted-foreground font-inter">
              Instant play calls and tactical adjustments delivered securely to all team members
            </p>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm p-8 border border-accent/20 hover:bg-card/90 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-accent/20">
                <Smartphone className="w-8 h-8 text-accent" />
              </div>
              <div>
                <div className="text-xl font-bold text-accent font-space">Mobile</div>
                <div className="text-muted-foreground text-sm font-inter">Optimized</div>
              </div>
            </div>
            <p className="text-muted-foreground font-inter">
              Intuitive mobile interface designed for high-pressure game situations
            </p>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm p-8 border border-accent/20 hover:bg-card/90 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-accent/20">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <div>
                <div className="text-xl font-bold text-accent font-space">Secure</div>
                <div className="text-muted-foreground text-sm font-inter">Encryption</div>
              </div>
            </div>
            <p className="text-muted-foreground font-inter">
              Military-grade encryption prevents opponent interception and strategy theft
            </p>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm p-8 border border-accent/20 hover:bg-card/90 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-accent/20">
                <Settings className="w-8 h-8 text-accent" />
              </div>
              <div>
                <div className="text-xl font-bold text-accent font-space">Custom</div>
                <div className="text-muted-foreground text-sm font-inter">Playbooks</div>
              </div>
            </div>
            <p className="text-muted-foreground font-inter">
              Fully customizable playbooks and role assignments for any team structure
            </p>
          </Card>
        </div>

        {/* Product Benefits */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div>
              <div className="text-4xl font-bold text-accent mb-2 font-space">99.9%</div>
              <div className="text-muted-foreground text-sm font-inter">Uptime Reliability</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2 font-space">&lt;50ms</div>
              <div className="text-muted-foreground text-sm font-inter">Message Delivery</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2 font-space">256-bit</div>
              <div className="text-muted-foreground text-sm font-inter">AES Encryption</div>
            </div>
          </div>
        </div>

        {/* Device Mockups Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {/* Mobile App Mockups */}
            <div className="flex flex-col items-center space-y-8">
              {/* Main App Interface */}
              <div className="bg-white rounded-xl shadow-elegant p-6 w-80 h-64 border border-accent/20 animate-float hover:shadow-glow transition-all duration-300">
                <div className="bg-gradient-to-br from-muted to-card rounded-lg p-4 h-full flex flex-col">
                  <div className="text-center mb-4">
                    <h4 className="font-bold text-accent font-space text-lg">MY GAMES</h4>
                    <div className="w-12 h-0.5 bg-accent mx-auto mt-2"></div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="text-6xl text-accent/20 mb-2">🎮</div>
                      <p className="text-sm text-muted-foreground font-inter">No Active Games Found.<br />Let's Create One!</p>
                      <Button size="sm" className="bg-gradient-to-r from-accent to-primary text-white font-space hover:scale-105 transition-transform duration-300">
                        CREATE NEW GAME
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tablet Device */}
              <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-6 w-96 h-64 relative shadow-elegant animate-float hover:shadow-glow transition-all duration-300" style={{ animationDelay: '0.5s' }}>
                <div className="bg-gradient-to-br from-white to-muted rounded-xl h-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5"></div>
                  <div className="text-center relative z-10">
                    <div className="text-4xl font-bold text-accent mb-3 font-space">DX1</div>
                    <div className="text-sm text-muted-foreground font-inter mb-4">ELEVATE YOUR GAME</div>
                    <div className="flex items-center justify-center gap-2 text-accent">
                      <div className="w-2 h-2 bg-accent rounded-full animate-ping"></div>
                      <div className="text-xs font-medium">LIVE COMMUNICATION</div>
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
                FEATURE <span className="text-accent">SHOWCASE</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-inter animate-fade-in" style={{ animationDelay: '0.3s' }}>
                DX1 brings <span className="font-semibold text-accent bg-accent/10 px-1 rounded">customization</span> and <span className="font-semibold text-accent bg-accent/10 px-1 rounded">innovation</span> to the game.
              </p>
            </div>

            {/* Detailed Features */}
            <div className="space-y-6">
              <Card className="p-6 space-y-4 border-l-4 border-l-accent bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in group" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-accent font-space">INSTANT TACTICAL UPDATES</h3>
                </div>
                <p className="text-sm text-muted-foreground font-inter leading-relaxed">
                  Real-time communication system delivers play calls and tactical adjustments securely to all team members with sub-50ms latency.
                </p>
                <div className="text-xs text-accent font-medium">⚡ Lightning-fast delivery</div>
              </Card>

              <Card className="p-6 space-y-4 border-l-4 border-l-accent bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in group" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-accent font-space">MILITARY-GRADE SECURITY</h3>
                </div>
                <p className="text-sm text-muted-foreground font-inter leading-relaxed">
                  256-bit AES encryption prevents opponent interception and strategy theft, ensuring your game plans remain confidential.
                </p>
                <div className="text-xs text-accent font-medium">🔒 Unbreakable protection</div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 text-muted-foreground/80 font-space font-medium animate-fade-in" style={{ animationDelay: '1.5s' }}>
        ENGINEERED FOR EXCELLENCE.
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