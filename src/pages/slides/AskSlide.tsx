import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DollarSign, Users, Zap, Globe, BarChart3, Target, Smartphone, Shield, TrendingUp, Layers, Calendar, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';
import UniversalSlideBackground from '@/components/UniversalSlideBackground';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

const AskSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent } = useSlideContent();
  const slideImage = getSlideImageForDisplay('ask');
  const slideContent = getSlideContent('ask');

  const handlePrevious = () => navigate('/slides/roadmap');
  const handleNext = () => navigate('/slides/contact');
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

  const registrationSteps = [
    {
      step: '1',
      title: 'Visit Registration Link',
      description: 'Click the RSVP link to access our secure registration portal',
      icon: Globe,
      highlight: false
    },
    {
      step: '2', 
      title: 'Complete Your Profile',
      description: 'Provide basic contact information and preferred event sessions',
      icon: Users,
      highlight: true
    },
    {
      step: '3',
      title: 'Select Your Events',
      description: 'Choose which sessions to attend - virtual kick-off, wellness fair, or both',
      icon: Target,
      highlight: false
    },
    {
      step: '4',
      title: 'Get Updates',
      description: 'Receive location details, speaker updates, and event reminders',
      icon: Smartphone,
      highlight: false
    },
    {
      step: '5',
      title: 'Join the Community',
      description: 'Connect with other mothers and families in our support network',
      icon: Users,
      highlight: false
    },
    {
      step: '6',
      title: 'Attend & Participate',
      description: 'Show up ready to learn, connect, and celebrate with the community',
      icon: TrendingUp,
      highlight: false
    }
  ];

  return (
    <UniversalSlideBackground variant="hero">
      {/* Fixed Navigation */}
      <div className="fixed top-4 sm:top-6 left-4 sm:left-6 z-50">
        <Button 
          variant="outline" 
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
        <div className="text-primary text-lg sm:text-xl font-space font-bold">13</div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full pt-16 sm:pt-20 pb-24 sm:pb-32">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight font-space mb-6 sm:mb-8">
              {slideContent?.subtitle?.toUpperCase() || 'REGISTER'} <span className="text-muted-foreground">{slideContent?.subtitle?.split(' ')[1]?.toUpperCase() || 'TODAY'}</span>
            </h1>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 sm:mb-8 animate-scale-in"></div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto font-inter leading-relaxed px-4">
              {slideContent?.description || "Don't miss this meaningful opportunity to join our community celebration and support network"}
            </p>
          </div>

          {/* Image Showcase */}
          <div className="mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <ImageShowcase
              imageUrl={slideImage?.url}
              imageAlt={slideImage?.alt}
              onImageSelect={() => navigate('/media')}
              variant="hero"
            />
          </div>

          {/* RSVP Call-to-Action */}
          <div className="text-center mb-8 sm:mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-6 sm:px-12 py-4 sm:py-6 border border-white/20">
              <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              <div className="text-2xl sm:text-4xl font-bold text-white font-space">AUG 25-31</div>
              <div className="text-white/80 text-lg sm:text-xl font-inter">Register Now</div>
            </div>
          </div>

          {/* Event Highlight */}
          <div className="mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-accent/30">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-accent flex-shrink-0" />
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-white font-space">Free Community Events</div>
                  <div className="text-accent text-xs sm:text-sm font-inter">Virtual & in-person opportunities to connect and learn</div>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {registrationSteps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className={`bg-white/10 backdrop-blur-sm p-4 sm:p-6 border transition-all duration-300 hover:scale-105 ${
                item.highlight ? 'border-accent/40 bg-accent/5' : 'border-white/20 hover:bg-white/15'
              }`}>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className={`p-2 sm:p-3 rounded-full flex-shrink-0 ${
                    item.highlight ? 'bg-accent/20' : 'bg-white/20'
                  }`}>
                    <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${item.highlight ? 'text-accent' : 'text-white'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="text-xl sm:text-2xl font-bold text-white font-space">
                        {item.step}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white font-space leading-tight">{item.title}</h3>
                    </div>
                    <p className="text-white/80 font-inter text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

          {/* Event Timeline */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-white/20 mb-12 sm:mb-16 animate-fade-in" style={{ animationDelay: '1s' }}>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-space text-center">Event Schedule</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 font-space">MON</div>
                <div className="text-white/80 font-inter text-xs sm:text-sm mb-1 sm:mb-2">August 25</div>
                <div className="text-white/60 font-inter text-xs">Virtual Kick-Off & Welcome</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 font-space">WED</div>
                <div className="text-white/80 font-inter text-xs sm:text-sm mb-1 sm:mb-2">August 27</div>
                <div className="text-white/60 font-inter text-xs">Expert Panel Discussion</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 font-space">FRI</div>
                <div className="text-white/80 font-inter text-xs sm:text-sm mb-1 sm:mb-2">August 29</div>
                <div className="text-white/60 font-inter text-xs">Wellness Fair Celebration</div>
              </div>
            </div>
          </div>

          {/* Key Event Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 font-space">FREE</div>
              <div className="text-white/80 font-inter text-sm sm:text-base">All Events & Resources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 font-space">5+</div>
              <div className="text-white/80 font-inter text-sm sm:text-base">Expert Speakers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 font-space">100+</div>
              <div className="text-white/80 font-inter text-sm sm:text-base">Community Members Expected</div>
            </div>
          </div>

          {/* Registration Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-8 border border-white/20 animate-fade-in" style={{ animationDelay: '1.3s' }}>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-space text-center">What to Expect</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-space">Virtual Events</h4>
              <ul className="space-y-3 text-white/80 font-inter">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Monday kick-off discussion and welcome
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Expert panel with lactation consultants
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Community voices and shared experiences
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Q&A sessions with professionals
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-space">In-Person Fair</h4>
              <ul className="space-y-3 text-white/80 font-inter">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Free resources and community booths
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Wellness activities and fitness session
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Smoothie demo with Jocelyn
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  Food, music, and celebration
                </li>
              </ul>
            </div>
            </div>
          </div>

          {/* Bottom Tagline */}
          <div className="text-center mt-8 sm:mt-12 mb-8">
            <div className="text-white/80 font-space font-medium text-base sm:text-lg animate-fade-in" style={{ animationDelay: '2s' }}>
              REGISTER. JOIN. CELEBRATE.
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={13}
        previousRoute="/slides/roadmap"
        nextRoute="/slides/contact"
      />
    </UniversalSlideBackground>
  );
};

export default AskSlide;