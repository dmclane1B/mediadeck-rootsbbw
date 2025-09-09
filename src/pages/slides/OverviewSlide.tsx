import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Home, Target, Lightbulb, BarChart3, TrendingUp, Users, Shield, Zap, MapPin, Calendar, DollarSign, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';

const slides = [
  {
    number: 1,
    title: "Title",
    description: "Introduction to DX1",
    icon: Target,
    route: "/",
    section: "Introduction"
  },
  {
    number: 2,
    title: "Overview",
    description: "Presentation overview",
    icon: BarChart3,
    route: "/slides/overview",
    section: "Navigation"
  },
  {
    number: 3,
    title: "Challenges",
    description: "Current market problems",
    icon: Target,
    route: "/slides/challenges",
    section: "Problem"
  },
  {
    number: 4,
    title: "Product Glimpse",
    description: "Our solution overview",
    icon: Lightbulb,
    route: "/slides/product-glimpse",
    section: "Solution"
  },
  {
    number: 5,
    title: "Product Page",
    description: "Detailed product features",
    icon: Shield,
    route: "/slides/product-page",
    section: "Solution"
  },
  {
    number: 6,
    title: "Market Overview",
    description: "Market size and opportunity",
    icon: BarChart3,
    route: "/slides/market-overview",
    section: "Market"
  },
  {
    number: 7,
    title: "Proof of Demand",
    description: "Market validation evidence",
    icon: TrendingUp,
    route: "/slides/proof-demand",
    section: "Market"
  },
  {
    number: 8,
    title: "Sales Strategy",
    description: "Go-to-market approach",
    icon: Zap,
    route: "/slides/sales-strategy",
    section: "Business"
  },
  {
    number: 9,
    title: "Customer Persona",
    description: "Target audience profile",
    icon: Users,
    route: "/slides/customer-persona",
    section: "Business"
  },
  {
    number: 10,
    title: "Value Propositions",
    description: "Our competitive advantages",
    icon: MapPin,
    route: "/slides/value-propositions",
    section: "Business"
  },
  {
    number: 11,
    title: "Team Leadership",
    description: "Our core team",
    icon: Users,
    route: "/slides/team-leadership",
    section: "Team"
  },
  {
    number: 12,
    title: "Roadmap",
    description: "Future development plans",
    icon: Calendar,
    route: "/slides/roadmap",
    section: "Execution"
  },
  {
    number: 13,
    title: "The Ask",
    description: "Investment opportunity",
    icon: DollarSign,
    route: "/slides/ask",
    section: "Investment"
  },
  {
    number: 14,
    title: "Contact",
    description: "Get in touch with our team",
    icon: Mail,
    route: "/slides/contact",
    section: "Connect"
  }
];

const OverviewSlide = () => {
  const navigate = useNavigate();

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


      {/* DX1 Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <img src="/lovable-uploads/b608d56d-eb3b-4b0b-b339-8fdffa17d540.png" alt="DX1 Logo" className="h-8 w-auto ml-auto mb-2" />
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
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 font-space">
              PRESENTATION OVERVIEW
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Navigate through our comprehensive pitch deck covering problem, solution, market opportunity, and investment ask
            </p>
            <div className="w-32 h-1 bg-primary mx-auto mt-8"></div>
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
              <strong>Estimated Duration:</strong> 15-20 minutes
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