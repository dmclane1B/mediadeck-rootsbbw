import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Home, Target, Lightbulb, BarChart3, TrendingUp, Users, Shield, Zap, MapPin, Calendar, DollarSign, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImages } from '@/hooks/useSlideImages';

const slides = [
  {
    number: 1,
    title: "Welcome",
    description: "Black Breastfeeding Week 2025",
    icon: Target,
    route: "/",
    section: "Introduction"
  },
  {
    number: 2,
    title: "Week Overview",
    description: "Complete schedule and activities",
    icon: BarChart3,
    route: "/slides/overview",
    section: "Schedule"
  },
  {
    number: 3,
    title: "Why This Matters",
    description: "Addressing challenges in our community",
    icon: Target,
    route: "/slides/challenges",
    section: "Impact"
  },
  {
    number: 4,
    title: "Monday Kick-Off",
    description: "Virtual welcome & discussion",
    icon: Lightbulb,
    route: "/slides/product-glimpse",
    section: "Events"
  },
  {
    number: 5,
    title: "Expert Panel",
    description: "Board-certified lactation consultant",
    icon: Shield,
    route: "/slides/product-page",
    section: "Events"
  },
  {
    number: 6,
    title: "Community Voices",
    description: "Panel discussion with local mothers",
    icon: Users,
    route: "/slides/market-overview",
    section: "Events"
  },
  {
    number: 7,
    title: "Wellness Fair",
    description: "Friday celebration and resources",
    icon: TrendingUp,
    route: "/slides/proof-demand",
    section: "Events"
  },
  {
    number: 8,
    title: "Workout Session",
    description: "Fitness and wellness activities",
    icon: Zap,
    route: "/slides/sales-strategy",
    section: "Activities"
  },
  {
    number: 9,
    title: "Smoothie Demo",
    description: "Led by our very own Jocelyn",
    icon: Users,
    route: "/slides/customer-persona",
    section: "Activities"
  },
  {
    number: 10,
    title: "Resources & Support",
    description: "Available community services",
    icon: MapPin,
    route: "/slides/value-propositions",
    section: "Support"
  },
  {
    number: 11,
    title: "Community Partners",
    description: "Organizations supporting the week",
    icon: Users,
    route: "/slides/team-leadership",
    section: "Partners"
  },
  {
    number: 12,
    title: "How to Participate",
    description: "RSVP and join the movement",
    icon: Calendar,
    route: "/slides/roadmap",
    section: "Action"
  },
  {
    number: 13,
    title: "Register Today",
    description: "Don't miss these important events",
    icon: DollarSign,
    route: "/slides/ask",
    section: "RSVP"
  },
  {
    number: 14,
    title: "Contact Us",
    description: "Roots Community Health information",
    icon: Mail,
    route: "/slides/contact",
    section: "Connect"
  }
];

const OverviewSlide = () => {
  const navigate = useNavigate();
  const { getSlideImage } = useSlideImages();
  const slideImage = getSlideImage('overview');

  const handleNext = () => navigate('/slides/challenges');
  const handlePrevious = () => navigate('/');
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

  const handleSlideClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/bcb3b88f-d227-437e-af8d-ddc0c670649e.png" 
          alt="UCLA Softball Player" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/95 to-slate-100/95"></div>
      </div>


      {/* Roots Community Health Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <div className="text-primary text-2xl font-space font-bold mb-2">ROOTS</div>
        <div className="text-slate-500 text-xl font-space font-bold">02</div>
      </div>

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Button 
          variant="outline" 
          onClick={handleHome}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          ← Home
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-20 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 font-space">
              BLACK BREASTFEEDING WEEK
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
              A comprehensive week of events, education, and community support celebrating and promoting breastfeeding in the Black community
            </p>
            <div className="w-32 h-1 bg-primary mx-auto"></div>
          </div>

          {/* Image Showcase */}
          <div className="mb-16">
            <ImageShowcase
              imageId={slideImage?.imageId}
              imageAlt={slideImage?.imageAlt}
              onImageSelect={() => navigate('/media')}
              variant="hero"
              className="animate-fade-in"
            />
          </div>

          {/* Slides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {slides.map((slide) => {
              const IconComponent = slide.icon;
              return (
                <Card 
                  key={slide.number}
                  className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-slate-200"
                  onClick={() => handleSlideClick(slide.route)}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                          {slide.number.toString().padStart(2, '0')}
                        </span>
                        <span className="text-xs text-slate-500 uppercase tracking-wide">
                          {slide.section}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1 font-space">
                        {slide.title}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {slide.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Estimated Duration */}
          <div className="text-center mt-12">
            <p className="text-slate-500">
              <strong>Event Week:</strong> August 25-31, 2025 | <strong>Location:</strong> Community & Virtual Events
            </p>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={2}
        previousRoute="/"
        nextRoute="/slides/challenges"
      />
    </div>
  );
};

export default OverviewSlide;