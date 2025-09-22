import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Home, Target, Lightbulb, BarChart3, TrendingUp, Users, Shield, Zap, MapPin, Calendar, DollarSign, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';
import MagazineLayout from '@/components/MagazineLayout';
import CommunitySection from '@/components/CommunitySection';

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
    route: "/slides/monday-kickoff",
    section: "Events"
  },
  {
    number: 5,
    title: "Expert Panel",
    description: "Board-certified lactation consultant",
    icon: Shield,
    route: "/slides/expert-panel",
    section: "Events"
  },
  {
    number: 6,
    title: "Community Voices",
    description: "Panel discussion with local mothers",
    icon: Users,
    route: "/slides/community-voices",
    section: "Events"
  },
  {
    number: 7,
    title: "Nutrition Education",
    description: "Essential nutrition guidance & lactation support",
    icon: TrendingUp,
    route: "/slides/nutrition-education",
    section: "Events"
  },
  {
    number: 8,
    title: "Workout Session",
    description: "Fitness and wellness activities",
    icon: Zap,
    route: "/slides/workout-session",
    section: "Activities"
  },
  {
    number: 9,
    title: "Smoothie Demo",
    description: "Led by our very own Jocelyn",
    icon: Users,
    route: "/slides/smoothie-demo",
    section: "Activities"
  },
  {
    number: 10,
    title: "Resources & Support",
    description: "Available community services",
    icon: MapPin,
    route: "/slides/resources-support",
    section: "Support"
  },
  {
    number: 11,
    title: "Community Partners",
    description: "Organizations supporting the week",
    icon: Users,
    route: "/slides/community-partners",
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
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent } = useSlideContent();
  const slideImage = getSlideImageForDisplay('overview');
  const slideContent = getSlideContent('overview');

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
    <MagazineLayout
      title={slideContent?.title || 'BLACK BREASTFEEDING WEEK EVENT OVERVIEW'}
      subtitle={slideContent?.subtitle || 'A Vibrant Celebration of Community Support and Education'}
      category="EVENT OVERVIEW"
      slideNumber="02"
      testimonial={slideContent?.customFields?.testimonial}
      backgroundImage="/src/assets/roots-logo.png"
    >
      {/* Navigation */}
      <div className="absolute top-4 left-4 z-20">
        <Button 
          variant="outline" 
          onClick={handleHome}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          ← Home
        </Button>
      </div>

      {/* Event Highlights Section */}
      <CommunitySection
        title="Event Highlights"
        description="Our community came together for an incredible week of education, celebration, and support for Black mothers and families."
        variant="highlights"
        items={[
          {
            title: "Community Participation",
            content: slideContent?.sections?.[0]?.content || [
              'Over 50 community members participating',
              '5 days of comprehensive programming',
              'Expert-led educational sessions',
              'Community testimonials and story sharing'
            ],
            highlight: true
          },
          {
            title: "Professional Support",
            content: slideContent?.sections?.[1]?.content || [
              'Board-certified lactation consultants',
              'Healthcare provider partnerships',
              'Free resources and support materials',
              'Follow-up care coordination'
            ]
          }
        ]}
      />

      {/* Featured Image */}
      <div className="my-12">
        <ImageShowcase
          imageUrl={slideImage?.url}
          imageAlt={slideImage?.alt || 'Community members celebrating together at Black Breastfeeding Week event'}
          onImageSelect={() => navigate('/media')}
          variant="hero"
          className="animate-fade-in rounded-lg shadow-lg"
        />
      </div>

      {/* Program Schedule Navigation */}
      <CommunitySection
        title="Week Schedule Overview"
        description="Navigate through our comprehensive program designed to support, educate, and celebrate our community."
        items={slides.slice(2).map((slide, index) => ({
          title: `Day ${index + 1}: ${slide.title}`,
          content: slide.description,
          highlight: index === 0
        }))}
      />

      {/* Quick Access Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.slice(0, 6).map((slide) => {
          const IconComponent = slide.icon;
          return (
            <Card 
              key={slide.number}
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border border-border/20"
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
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1 font-space">
                    {slide.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {slide.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Event Details */}
      <div className="text-center mt-12 p-6 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground text-lg">
          <strong className="text-foreground">Event Details:</strong> {slideContent?.customFields?.eventDetails || 'August 25-31, 2025 | Community Centers & Virtual Platforms'}
        </p>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={2}
        previousRoute="/"
        nextRoute="/slides/challenges"
      />
    </MagazineLayout>
  );
};

export default OverviewSlide;