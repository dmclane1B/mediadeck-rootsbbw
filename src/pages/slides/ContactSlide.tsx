import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, MessageSquare, Building2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImages } from '@/hooks/useSlideImages';
const ContactSlide = () => {
  const navigate = useNavigate();
  const { getSlideImage } = useSlideImages();
  const slideImage = getSlideImage('contact');
  const handleNext = () => navigate('/');
  const handlePrevious = () => navigate('/slides/ask');
  const handleHome = () => navigate('/');
  useSwipeNavigation({
    onPrevious: handlePrevious,
    onNext: handleNext
  });
  useKeyboardNavigation({
    onPrevious: handlePrevious,
    onNext: handleNext,
    onHome: handleHome
  });
  const contactInfo = [{
    type: 'Email',
    value: 'contact@dx1.io',
    description: 'For general inquiries and partnerships',
    icon: Mail,
    action: 'mailto:contact@dx1.io'
  }, {
    type: 'Investment Inquiries',
    value: 'investors@dx1.io',
    description: 'For funding and investment opportunities',
    icon: Building2,
    action: 'mailto:investors@dx1.io'
  }, {
    type: 'Phone',
    value: '+1 (555) 123-4567',
    description: 'Direct line for immediate assistance',
    icon: Phone,
    action: 'tel:+15551234567'
  }, {
    type: 'LinkedIn',
    value: 'linkedin.com/company/dx1-io',
    description: 'Connect with us professionally',
    icon: Linkedin,
    action: 'https://linkedin.com/company/dx1-io'
  }, {
    type: 'Website',
    value: 'www.dx1.io',
    description: 'Learn more about our platform',
    icon: Globe,
    action: 'https://www.dx1.io'
  }, {
    type: 'Schedule Meeting',
    value: 'Book a Demo',
    description: 'Schedule a personalized demo',
    icon: Calendar,
    action: 'https://calendly.com/dx1-demo'
  }];
  const teamContacts = [{
    name: 'Leadership Team',
    description: 'Connect with our founding team for strategic discussions',
    icon: Users
  }, {
    name: 'Technical Team',
    description: 'Discuss integration and technical requirements',
    icon: MessageSquare
  }, {
    name: 'Business Development',
    description: 'Explore partnership and collaboration opportunities',
    icon: Building2
  }];
  return <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500" />
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

      {/* DX1 Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <img src="/lovable-uploads/b608d56d-eb3b-4b0b-b339-8fdffa17d540.png" alt="DX1 Logo" className="h-8 w-auto ml-auto mb-2" />
        <div className="text-foreground text-xl font-space font-bold">14</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              GET IN TOUCH
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Ready to transform your industry? Let's connect and explore how DX1 can drive your digital transformation.
            </p>
          </div>

          {/* Image Showcase */}
          <div className="mb-8">
            <ImageShowcase
              imageId={slideImage?.imageId}
              imageAlt={slideImage?.imageAlt}
              onImageSelect={() => navigate('/media')}
              variant="standard"
              className="animate-fade-in"
            />
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((contact, index) => {
            const IconComponent = contact.icon;
            return <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer group hover:scale-105" onClick={() => window.open(contact.action, '_blank')}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{contact.type}</h3>
                    <p className="text-primary font-medium mb-2">{contact.value}</p>
                    <p className="text-sm text-foreground/60">{contact.description}</p>
                  </div>
                </Card>;
          })}
          </div>

          {/* Team Contact Sections */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Connect with Our Teams</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamContacts.map((team, index) => {
              const IconComponent = team.icon;
              return <Card key={index} className="p-6 bg-card/60 backdrop-blur-sm border-border/30">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                        <IconComponent className="w-5 h-5 text-secondary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{team.name}</h3>
                      <p className="text-sm text-foreground/60">{team.description}</p>
                    </div>
                  </Card>;
            })}
            </div>
          </div>

          {/* Office Location */}
          
        </div>
      </div>

      {/* Navigation Footer */}
      <SlideNavigation 
        currentSlide={14}
        previousRoute="/slides/ask"
        isLastSlide={true}
      />
    </div>;
};
export default ContactSlide;