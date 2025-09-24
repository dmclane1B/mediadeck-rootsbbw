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
import { SlideContent, defaultSlideContent } from '@/data/slideContent';
import { useSlideContent } from '@/hooks/useSlideContent';
import UniversalSlideBackground from '@/components/UniversalSlideBackground';
import SideTab from '@/components/SideTab';

const ValuePropositionsSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent } = useSlideContent();
  const slideImage = getSlideImageForDisplay('resources-support');
  const slideContent = getSlideContent('resources-support') || defaultSlideContent.resourcesSupport;

  const handlePrevious = () => navigate('/slides/smoothie-demo');
  const handleNext = () => navigate('/slides/community-partners');
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
    <UniversalSlideBackground variant="hero">
      {/* Side Tab */}
      <SideTab text="RESOURCES & SUPPORT" />

      {/* Fixed Navigation */}
      <div className="fixed top-4 sm:top-6 left-4 sm:left-6 z-50">
        <Button 
          variant="green" 
          onClick={handleHome}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
          aria-label="Go to home page"
        >
          <Home className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Home</span>
        </Button>
      </div>

      {/* Fixed Roots Community Health Branding */}
      <div className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="text-center">
          <div className="text-primary text-lg sm:text-xl font-space font-bold">ROOTS</div>
          <div className="text-muted-foreground text-xs sm:text-sm font-inter">Community Health</div>
        </div>
      </div>

      {/* Fixed Slide Number */}
      <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 text-right">
        <div className="text-primary text-lg sm:text-xl font-space font-bold">10</div>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="h-screen">
        <div className="pt-20 sm:pt-24 pb-24 sm:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12 animate-fade-in">
              <div className="text-muted-foreground text-base sm:text-lg font-inter mb-3 sm:mb-4">Supporting Our Community</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight font-space mb-6 sm:mb-8">
                {slideContent?.title || 'RESOURCES & SUPPORT'}
              </h1>
              <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-inter leading-relaxed px-4">
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
                      {Array.isArray(slideContent.sections[0].content) ? slideContent.sections[0].content.map((service, index) => (
                        <div key={index} className="flex items-center gap-3 text-white/80">
                          <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                          <span className="text-sm">{service}</span>
                        </div>
                      )) : null}
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
                        {Array.isArray(slideContent.sections[1].content) ? slideContent.sections[1].content.map((access, index) => (
                          <div key={index} className="flex items-center gap-3 text-white/80">
                            <div className="w-2 h-2 bg-white rounded-full flex-shrink-0"></div>
                            <span className="text-sm">{access}</span>
                          </div>
                        )) : null}
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

            {/* Community Partnerships */}
            {slideContent?.sections?.[2] && (
              <div className="animate-fade-in mb-12 sm:mb-16" style={{ animationDelay: '1.5s' }}>
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-space">{slideContent.sections[2].title}</h2>
                  <div className="w-20 sm:w-24 h-1 bg-white/60 mx-auto mb-4 sm:mb-6"></div>
                  <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto font-inter px-4">
                    Building connections that strengthen our community
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {Array.isArray(slideContent.sections[2].content) ? slideContent.sections[2].content.map((partnership, index) => (
                    <Card key={index} className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group text-center">
                      <div className="p-4 rounded-full bg-white/20 mx-auto mb-4 w-fit group-hover:bg-white/30 transition-colors duration-300">
                        <Users className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-white/90 font-inter">{partnership}</p>
                    </Card>
                  )) : null}
                </div>
              </div>
            )}

            {/* Community Impact Statistics */}
            <div className="animate-fade-in" style={{ animationDelay: '2s' }}>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-space">Community Impact</h2>
                <div className="w-20 sm:w-24 h-1 bg-white/60 mx-auto mb-4 sm:mb-6"></div>
                <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto font-inter px-4">
                  Supporting healthy families and strong communities through Black Breastfeeding Week
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-space">Trusted</h4>
                  <p className="text-xs sm:text-sm text-white/80 font-inter">Community Partner</p>
                </Card>
              </div>
            </div>

            {/* Bottom Tagline */}
            <div className="text-center mt-12 sm:mt-16 mb-8">
              <div className="text-white/80 font-space font-medium text-lg sm:text-xl animate-fade-in" style={{ animationDelay: '2.5s' }}>
                COMMUNITY. COMPASSION. CARE.
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={10}
        previousRoute="/slides/smoothie-demo"
        nextRoute="/slides/community-partners"
      />
    </UniversalSlideBackground>
  );
};

export default ValuePropositionsSlide;