import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, Phone, Users, BookOpen, Home, Shield, CheckCircle, XCircle, Radio, Wifi, Bluetooth, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';

const ValuePropositionsSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent } = useSlideContent();
  const slideImage = getSlideImageForDisplay('value-propositions');
  const slideContent = getSlideContent('value-propositions');

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

      {/* Fixed Roots Community Health Branding */}
      <div className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="text-center">
          <div className="text-white text-lg sm:text-xl font-space font-bold animate-glow">ROOTS</div>
          <div className="text-white/80 text-xs sm:text-sm font-inter">Community Health</div>
        </div>
      </div>

      {/* Fixed Slide Number */}
      <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 text-right">
        <div className="text-white text-lg sm:text-xl font-space font-bold">10</div>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="h-screen">
        <div className="pt-20 sm:pt-24 pb-24 sm:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12 animate-fade-in">
              <div className="text-white/60 text-base sm:text-lg font-inter mb-3 sm:mb-4">Supporting Our Community</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight font-space mb-6 sm:mb-8">
                {slideContent?.title || 'RESOURCES & SUPPORT'}
              </h1>
              <div className="w-24 sm:w-32 h-1 bg-white/80 mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
              <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto font-inter leading-relaxed px-4">
                {slideContent?.description || 'Comprehensive support services available to families in our community.'}
              </p>
            </div>

            {/* Image Showcase */}
            <div className="mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <ImageShowcase
              imageUrl={slideImage?.url}
              imageAlt={slideImage?.alt}
              onImageSelect={() => navigate('/media')}
              variant="hero"
            />
            </div>

            {/* Support Services Grid */}
            {slideContent?.sections?.[0] && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                {/* Available Services */}
                <Card className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
                  <div className="text-center">
                    <div className="p-4 rounded-full bg-white/20 mx-auto mb-6 w-fit group-hover:bg-white/30 transition-colors duration-300">
                      <Heart className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-space">
                      {slideContent.sections[0].title}
                    </h3>
                    <div className="w-16 h-1 bg-white/60 mx-auto mb-6"></div>
                    
                    <div className="space-y-3 text-left">
                      {slideContent.sections[0].content.map((service, index) => (
                        <div key={index} className="flex items-center gap-3 text-white/80">
                          <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* How to Access */}
                {slideContent?.sections?.[1] && (
                  <Card className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group">
                    <div className="text-center">
                      <div className="p-4 rounded-full bg-white/20 mx-auto mb-6 w-fit group-hover:bg-white/30 transition-colors duration-300">
                        <Phone className="w-12 h-12 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 font-space">
                        {slideContent.sections[1].title}
                      </h3>
                      <div className="w-16 h-1 bg-white/60 mx-auto mb-6"></div>
                      
                      <div className="space-y-3 text-left">
                        {slideContent.sections[1].content.map((access, index) => (
                          <div key={index} className="flex items-center gap-3 text-white/80">
                            <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                            <span className="text-sm">{access}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* Support Benefits */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-space">For New Mothers</h3>
                <ul className="space-y-2 sm:space-y-3 text-white/80 font-inter text-sm sm:text-base">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Professional lactation support and guidance
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Mental health counseling and resources
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Nutrition planning for optimal health
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Peer support groups and networks
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-space">For Families</h3>
                <ul className="space-y-2 sm:space-y-3 text-white/80 font-inter text-sm sm:text-base">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Comprehensive family health resources
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Educational workshops and events
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Community connections and support
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                    Accessible care regardless of insurance
                  </li>
                </ul>
              </div>
            </div>

            {/* Community Impact */}
            <div className="animate-fade-in" style={{ animationDelay: '1.5s' }}>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-space">Community Impact</h2>
                <div className="w-20 sm:w-24 h-1 bg-white/60 mx-auto mb-4 sm:mb-6"></div>
                <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto font-inter px-4">
                  Supporting healthy families and strong communities
                </p>
              </div>

              {/* Impact Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <Card className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 border border-white/20 text-center">
                  <div className="p-3 rounded-full bg-white/20 mx-auto mb-4 w-fit">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-space">500+</h4>
                  <p className="text-xs sm:text-sm text-white/80 font-inter">Families Served</p>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 border border-white/20 text-center">
                  <div className="p-3 rounded-full bg-white/20 mx-auto mb-4 w-fit">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-space">24/7</h4>
                  <p className="text-xs sm:text-sm text-white/80 font-inter">Support Available</p>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 border border-white/20 text-center">
                  <div className="p-3 rounded-full bg-white/20 mx-auto mb-4 w-fit">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-space">95%</h4>
                  <p className="text-xs sm:text-sm text-white/80 font-inter">Client Satisfaction</p>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 border border-white/20 text-center">
                  <div className="p-3 rounded-full bg-white/20 mx-auto mb-4 w-fit">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-space">5+</h4>
                  <p className="text-xs sm:text-sm text-white/80 font-inter">Years Experience</p>
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