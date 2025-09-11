import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DollarSign, Users, Zap, Globe, BarChart3, Target, Smartphone, Shield, TrendingUp, Layers, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImages } from '@/hooks/useSlideImages';

const AskSlide = () => {
  const navigate = useNavigate();
  const { getSlideImage } = useSlideImages();
  const slideImage = getSlideImage('ask');

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
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/src/assets/background-community-optimized.webp" type="image/webp" />
          <img 
            src="/src/assets/background-community.png" 
            alt="Community Support" 
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-secondary/95 to-primary/95"></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
        >
          ← Home
        </Button>
      </div>

      {/* Roots Community Health Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <div className="text-white text-2xl font-space font-bold mb-2">ROOTS</div>
        <div className="text-white/80 text-xl font-space font-bold">13</div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight font-space mb-8">
            REGISTER <span className="text-white/80">TODAY</span>
          </h1>
          <div className="w-32 h-1 bg-white/80 mx-auto mb-8 animate-scale-in"></div>
          <p className="text-xl text-white/80 max-w-4xl mx-auto font-inter leading-relaxed">
            Don't miss this meaningful opportunity to join our community celebration and support network
          </p>
        </div>

        {/* Image Showcase */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <ImageShowcase
            imageId={slideImage?.imageId}
            imageAlt={slideImage?.imageAlt}
            onImageSelect={() => navigate('/media')}
            variant="standard"
          />
        </div>

        {/* RSVP Call-to-Action */}
        <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-12 py-6 border border-white/20">
            <Calendar className="w-12 h-12 text-white" />
            <div className="text-4xl font-bold text-white font-space">AUG 25-31</div>
            <div className="text-white/80 text-xl font-inter">Register Now</div>
          </div>
        </div>

        {/* Event Highlight */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="bg-gradient-to-r from-accent/20 to-primary/20 backdrop-blur-sm rounded-2xl p-6 border border-accent/30">
            <div className="flex items-center justify-center gap-4 text-center">
              <Users className="w-8 h-8 text-accent" />
              <div>
                <div className="text-2xl font-bold text-white font-space">Free Community Events</div>
                <div className="text-accent text-sm font-inter">Virtual & in-person opportunities to connect and learn</div>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {registrationSteps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className={`bg-white/10 backdrop-blur-sm p-6 border transition-all duration-300 hover:scale-105 ${
                item.highlight ? 'border-accent/40 bg-accent/5' : 'border-white/20 hover:bg-white/15'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full flex-shrink-0 ${
                    item.highlight ? 'bg-accent/20' : 'bg-white/20'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${item.highlight ? 'text-accent' : 'text-white'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-2xl font-bold text-white font-space">
                        {item.step}
                      </div>
                      <h3 className="text-lg font-bold text-white font-space leading-tight">{item.title}</h3>
                    </div>
                    <p className="text-white/80 font-inter text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Event Timeline */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-16 animate-fade-in" style={{ animationDelay: '1s' }}>
          <h3 className="text-2xl font-bold text-white mb-6 font-space text-center">Event Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 font-space">MON</div>
              <div className="text-white/80 font-inter text-sm mb-2">August 25</div>
              <div className="text-white/60 font-inter text-xs">Virtual Kick-Off & Welcome</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 font-space">WED</div>
              <div className="text-white/80 font-inter text-sm mb-2">August 27</div>
              <div className="text-white/60 font-inter text-xs">Expert Panel Discussion</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2 font-space">FRI</div>
              <div className="text-white/80 font-inter text-sm mb-2">August 29</div>
              <div className="text-white/60 font-inter text-xs">Wellness Fair Celebration</div>
            </div>
          </div>
        </div>

        {/* Key Event Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 font-space">FREE</div>
            <div className="text-white/80 font-inter">All Events & Resources</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 font-space">5+</div>
            <div className="text-white/80 font-inter">Expert Speakers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2 font-space">100+</div>
            <div className="text-white/80 font-inter">Community Members Expected</div>
          </div>
        </div>

        {/* Registration Information */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 animate-fade-in" style={{ animationDelay: '1.3s' }}>
          <h3 className="text-2xl font-bold text-white mb-6 font-space text-center">What to Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      </div>

      {/* Bottom Tagline */}
      <div className="absolute bottom-16 left-8 text-white/80 font-space font-medium animate-fade-in" style={{ animationDelay: '2s' }}>
        REGISTER. JOIN. CELEBRATE.
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={13}
        previousRoute="/slides/roadmap"
        nextRoute="/slides/contact"
      />
    </div>
  );
};

export default AskSlide;