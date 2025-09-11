import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Zap, BarChart3, Layers, Shield, Clock, Target, Wifi, Bluetooth, Radio, CheckCircle, XCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImages } from '@/hooks/useSlideImages';

const ValuePropositionsSlide = () => {
  const navigate = useNavigate();
  const { getSlideImage } = useSlideImages();
  const slideImage = getSlideImage('value-propositions');

  const handlePrevious = () => navigate('/slides/market-overview');
  const handleNext = () => navigate('/slides/ask');
  const handleHome = () => navigate('/');

  useSwipeNavigation({
    onPrevious: handlePrevious,
    onNext: handleNext,
  });

  useKeyboardNavigation({
    onPrevious: handlePrevious,
    onNext: handleNext,
    onHome: handleHome,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-success relative">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `repeating-linear-gradient(45deg, white 0px, white 2px, transparent 2px, transparent 40px)`,
             }}>
        </div>
      </div>

      {/* Fixed Navigation */}
      <div className="fixed top-4 sm:top-6 left-4 sm:left-6 z-50">
        <Button 
          variant="outline" 
          onClick={handleHome}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
          aria-label="Go to home page"
        >
          <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Home</span>
        </Button>
      </div>

      {/* Fixed DX1 Branding */}
      <div className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="text-center">
          <div className="text-white text-lg sm:text-xl font-space font-bold animate-glow">DX1</div>
          <div className="text-white/80 text-xs sm:text-sm font-inter">Value Propositions</div>
        </div>
      </div>

      {/* Fixed Logo */}
      <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 text-right">
        <img src="/lovable-uploads/b608d56d-eb3b-4b0b-b339-8fdffa17d540.png" alt="DX1 Logo" className="h-6 sm:h-8 w-auto ml-auto mb-1 sm:mb-2" />
        <div className="text-white text-lg sm:text-xl font-space font-bold">10</div>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="h-screen">
        <div className="pt-20 sm:pt-24 pb-24 sm:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12 animate-fade-in">
              <div className="text-white/60 text-base sm:text-lg font-inter mb-3 sm:mb-4">Transforming Sports Communication</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-space mb-6 sm:mb-8">
                DX-PLAY <span className="text-white/80">VALUE</span><br />
                <span className="text-white/80">PROPOSITIONS</span>
              </h1>
              <div className="w-24 sm:w-32 h-1 bg-white/80 mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
              <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto font-inter leading-relaxed px-4">
                AI-powered technology for secure and efficient play calling
              </p>
            </div>

            {/* Image Showcase */}
            <div className="mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <ImageShowcase
              imageId={slideImage?.imageId}
              imageAlt={slideImage?.imageAlt}
              onImageSelect={() => navigate('/media')}
              variant="hero"
            />
            </div>

            {/* Value Propositions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {/* Instant Secure Play Delivery */}
              <Card className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
                <div className="text-center">
                  <div className="p-4 rounded-full bg-white/20 mx-auto mb-6 w-fit group-hover:bg-white/30 transition-colors duration-300">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-space">
                    Instant Secure Play Delivery
                  </h3>
                  <div className="w-16 h-1 bg-white/60 mx-auto mb-6"></div>
                  <p className="text-white/80 font-inter leading-relaxed mb-6">
                    Encrypted communication ensures quick and reliable play execution.
                  </p>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-white/70">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">End-to-end encryption</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Sub-second delivery</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Target className="w-4 h-4" />
                      <span className="text-sm">99.9% reliability</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Live Analytics */}
              <Card className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
                <div className="text-center">
                  <div className="p-4 rounded-full bg-white/20 mx-auto mb-6 w-fit group-hover:bg-white/30 transition-colors duration-300">
                    <BarChart3 className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-space">
                    Live Analytics
                  </h3>
                  <div className="w-16 h-1 bg-white/60 mx-auto mb-6"></div>
                  <p className="text-white/80 font-inter leading-relaxed mb-6">
                    Data insights enhance performance evaluation and strategic decision-making.
                  </p>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-white/70">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-sm">Real-time metrics</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Target className="w-4 h-4" />
                      <span className="text-sm">Performance tracking</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Instant feedback</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Scalable Platform */}
              <Card className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
                <div className="text-center">
                  <div className="p-4 rounded-full bg-white/20 mx-auto mb-6 w-fit group-hover:bg-white/30 transition-colors duration-300">
                    <Layers className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-space">
                    Scalable Platform
                  </h3>
                  <div className="w-16 h-1 bg-white/60 mx-auto mb-6"></div>
                  <p className="text-white/80 font-inter leading-relaxed mb-6">
                    Adapts to NIL trends for comprehensive athlete development.
                  </p>
                  
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-white/70">
                      <Layers className="w-4 h-4" />
                      <span className="text-sm">Multi-sport support</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Target className="w-4 h-4" />
                      <span className="text-sm">Custom configurations</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">Easy integration</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-space">For Coaches</h3>
                <ul className="space-y-2 sm:space-y-3 text-white/80 font-inter text-sm sm:text-base">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Strategic advantage through secure communication
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Real-time performance insights and analytics
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Simplified technology adoption
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Enhanced team coordination
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-space">For Athletes</h3>
                <ul className="space-y-2 sm:space-y-3 text-white/80 font-inter text-sm sm:text-base">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Clear, instant communication from coaches
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Improved reaction times and execution
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Performance data for personal development
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Better understanding of game strategy
                  </li>
                </ul>
              </div>
            </div>

            {/* Competitive Analysis */}
            <div className="animate-fade-in" style={{ animationDelay: '1.5s' }}>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-space">Competitive Advantage</h2>
                <div className="w-20 sm:w-24 h-1 bg-white/60 mx-auto mb-4 sm:mb-6"></div>
                <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto font-inter px-4">
                  DX1 outperforms legacy systems and modern competitors
                </p>
              </div>

              {/* Technology Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <Card className="bg-success/20 backdrop-blur-sm p-4 sm:p-6 border border-success/30 relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-6 h-6 text-success" />
                  </div>
                  <div className="text-center">
                    <div className="p-3 rounded-full bg-success/30 mx-auto mb-4 w-fit">
                      <Radio className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2 font-space">DX1 RF</h4>
                    <ul className="text-xs sm:text-sm text-white/90 space-y-1 text-left">
                      <li>• Long range (1+ miles)</li>
                      <li>• Military-grade security</li>
                      <li>• No infrastructure needed</li>
                      <li>• Ultra-low latency</li>
                    </ul>
                  </div>
                </Card>

                <Card className="bg-destructive/20 backdrop-blur-sm p-4 sm:p-6 border border-destructive/30 relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <XCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="text-center">
                    <div className="p-3 rounded-full bg-destructive/30 mx-auto mb-4 w-fit">
                      <Wifi className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2 font-space">Wi-Fi</h4>
                    <ul className="text-xs sm:text-sm text-white/90 space-y-1 text-left">
                      <li>• Limited range</li>
                      <li>• Network dependent</li>
                      <li>• Interference issues</li>
                      <li>• Security vulnerabilities</li>
                    </ul>
                  </div>
                </Card>

                <Card className="bg-destructive/20 backdrop-blur-sm p-4 sm:p-6 border border-destructive/30 relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <XCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="text-center">
                    <div className="p-3 rounded-full bg-destructive/30 mx-auto mb-4 w-fit">
                      <Bluetooth className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2 font-space">Bluetooth</h4>
                    <ul className="text-xs sm:text-sm text-white/90 space-y-1 text-left">
                      <li>• Very short range</li>
                      <li>• Easy to intercept</li>
                      <li>• Connection drops</li>
                      <li>• High latency</li>
                    </ul>
                  </div>
                </Card>

                <Card className="bg-destructive/20 backdrop-blur-sm p-4 sm:p-6 border border-destructive/30 relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <XCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="text-center">
                    <div className="p-3 rounded-full bg-destructive/30 mx-auto mb-4 w-fit">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2 font-space">Legacy</h4>
                    <ul className="text-xs sm:text-sm text-white/90 space-y-1 text-left">
                      <li>• Hand signals only</li>
                      <li>• No encryption</li>
                      <li>• Easily decoded</li>
                      <li>• Weather dependent</li>
                    </ul>
                  </div>
                </Card>
              </div>

              {/* Competitor Comparison */}
              <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-space text-center">Direct Competitor Analysis</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="p-4 rounded-full bg-success/30 mx-auto mb-4 w-fit">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-success mb-2 font-space">DX1</h4>
                    <ul className="text-sm text-white/90 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> RF Technology</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> Military Encryption</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> 1+ Mile Range</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> Real-time Analytics</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <div className="p-4 rounded-full bg-muted/30 mx-auto mb-4 w-fit">
                      <Radio className="w-10 h-10 text-white/70" />
                    </div>
                    <h4 className="text-xl font-bold text-white/70 mb-2 font-space">go route</h4>
                    <ul className="text-sm text-white/70 space-y-2">
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> Bluetooth Limited</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> Basic Security</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> Short Range</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> No Analytics</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <div className="p-4 rounded-full bg-muted/30 mx-auto mb-4 w-fit">
                      <Wifi className="w-10 h-10 text-white/70" />
                    </div>
                    <h4 className="text-xl font-bold text-white/70 mb-2 font-space">PitchCom</h4>
                    <ul className="text-sm text-white/70 space-y-2">
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> Audio Only</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> Limited Encryption</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> Baseball Specific</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> No Data Insights</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <div className="p-4 rounded-full bg-muted/30 mx-auto mb-4 w-fit">
                      <Target className="w-10 h-10 text-white/70" />
                    </div>
                    <h4 className="text-xl font-bold text-white/70 mb-2 font-space">Game Day Signals</h4>
                    <ul className="text-sm text-white/70 space-y-2">
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> Visual Only</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> No Encryption</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> Weather Issues</li>
                      <li className="flex items-center gap-2"><XCircle className="w-4 h-4 text-destructive" /> Manual Process</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tagline */}
            <div className="text-center mt-12 sm:mt-16 mb-8">
              <div className="text-white/80 font-space font-medium text-lg sm:text-xl animate-fade-in" style={{ animationDelay: '2s' }}>
                INNOVATION. SECURITY. PERFORMANCE.
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={10}
        previousRoute="/slides/market-overview"
        nextRoute="/slides/ask"
      />
    </div>
  );
};

export default ValuePropositionsSlide;