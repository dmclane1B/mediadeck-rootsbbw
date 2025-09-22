import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, MessageSquare, Building2, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
const ContactSlide = () => {
  const navigate = useNavigate();
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const slideImage = getSlideImageForDisplay('contact');
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
  const contactInfo = [
    {
      type: 'Main Office',
      value: '8972 MacArthur Blvd, Oakland, CA 94605',
      description: 'Visit us at our East Oakland location',
      icon: MapPin,
      action: 'https://goo.gl/maps/RootsCommunityHealth'
    },
    {
      type: 'Phone',
      value: '(510) 777-2777',
      description: 'Call us for appointments and inquiries',
      icon: Phone,
      action: 'tel:+15107772777'
    },
    {
      type: 'Email',
      value: 'info@rootscommunityhealth.org',
      description: 'General inquiries and information',
      icon: Mail,
      action: 'mailto:info@rootscommunityhealth.org'
    },
    {
      type: 'Website',
      value: 'rootscommunityhealth.org',
      description: 'Learn more about our services',
      icon: Globe,
      action: 'https://rootscommunityhealth.org'
    },
    {
      type: 'Schedule Appointment',
      value: 'Book Care Today',
      description: 'Schedule medical or behavioral health care',
      icon: Calendar,
      action: 'tel:+15107772777'
    },
    {
      type: 'Community Resources',
      value: 'Find Help & Support',
      description: 'Access navigation and community services',
      icon: Users,
      action: 'https://rootscommunityhealth.org'
    }
  ];
  const teamContacts = [
    {
      name: 'Medical Care Team',
      description: 'Primary care, family medicine, and specialized health services',
      icon: Users
    },
    {
      name: 'Behavioral Health Team',
      description: 'Mental health counseling and behavioral support services',
      icon: MessageSquare
    },
    {
      name: 'Community Navigation',
      description: 'Health navigation, housing support, and community resources',
      icon: Building2
    }
  ];
  return <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/roots-logo-brand.png" 
          alt="Roots Community Health Logo" 
          className="w-full h-full object-contain opacity-5"
          loading="lazy"
        />
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

      {/* Roots Community Health Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <img src="/lovable-uploads/8f771217-3f89-469e-9a26-608410b785c2.png" alt="Roots Community Health Logo" className="h-10 w-auto ml-auto mb-2" />
        <div className="text-foreground text-xl font-space font-bold">14</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CONNECT WITH US
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Ready to access comprehensive community health services? Connect with Roots Community Health and let us help you on your wellness journey.
            </p>
          </div>

          {/* Image Showcase */}
          <div className="mb-8">
            <ImageShowcase
              imageUrl={slideImage?.url}
              imageAlt={slideImage?.alt}
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Our Health Services</h2>
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