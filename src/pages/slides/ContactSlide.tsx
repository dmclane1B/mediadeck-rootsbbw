import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Phone, MapPin, Globe, Calendar, MessageSquare, Building2, Users, Camera, ExternalLink, Download, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import SlideBackground from '@/components/SlideBackground';
import SideTab from '@/components/SideTab';

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

  const galleryLink1 = "https://studio.jamiitech.com/Roots-Clinic-1/BBFW-2025";
  const galleryLink2 = "https://studio.jamiitech.com/Roots-Clinic-1/Brown-Table-Talk-Let-it-Flow-Sis";

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

  return (
    <SlideBackground className="flex flex-col">
      {/* Side Tab */}
      <SideTab text="CONNECT WITH US" />

      {/* Navigation */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-10">
        <Button 
          variant="green" 
          onClick={handleHome}
          className="transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[44px] text-xs sm:text-sm px-2 sm:px-4"
        >
          ← <span className="hidden sm:inline">Home</span>
        </Button>
      </div>

      {/* Roots Community Health Branding */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-10 text-right">
        <img src="/lovable-uploads/8f771217-3f89-469e-9a26-608410b785c2.png" alt="Roots Community Health Logo" className="h-8 sm:h-10 w-auto ml-auto mb-1 sm:mb-2" />
        <div className="text-primary text-base sm:text-xl font-space font-bold">14</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 relative z-10 pb-24 pt-20 sm:pt-24">
        <div className="max-w-6xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CONNECT WITH US
            </h1>
            <p className="text-sm sm:text-base text-foreground/80 max-w-2xl mx-auto">
              Ready to access comprehensive community health services? We're here to help.
            </p>
          </div>

          {/* Tabbed Content */}
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
              <TabsTrigger value="events">Events & Galleries</TabsTrigger>
              <TabsTrigger value="services">Our Services</TabsTrigger>
            </TabsList>

            {/* Tab 1: Contact Info */}
            <TabsContent value="contact" className="space-y-6">
              {/* Image Showcase */}
              <div className="mb-4">
                <ImageShowcase
                  imageUrl={slideImage?.url}
                  imageAlt={slideImage?.alt}
                  onImageSelect={() => navigate('/media')}
                  variant="standard"
                  className="animate-fade-in"
                />
              </div>

              {/* Contact Methods Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <Card 
                      key={index} 
                      className="p-4 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer group hover:scale-105 touch-manipulation" 
                      onClick={() => window.open(contact.action, '_blank')}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2 text-sm">{contact.type}</h3>
                        <p className="text-primary font-medium mb-2 text-xs break-all">{contact.value}</p>
                        <p className="text-xs text-foreground/60">{contact.description}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Tab 2: Events & Galleries */}
            <TabsContent value="events" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Event Photo Galleries</h2>
                <p className="text-sm text-foreground/60 mb-6">
                  📸 Black Breastfeeding Week 2025 | August 25-31 | Roots Community Health
                </p>
              </div>

              {/* YouTube Video */}
              <div className="mb-8">
                <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/auwkHL3T48c"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Gallery Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                <Button
                  size="lg"
                  variant="hero"
                  onClick={() => window.open(galleryLink1, '_blank')}
                  className="text-base px-8 py-8 rounded-xl shadow-xl min-h-[56px] flex-col h-auto gap-2"
                >
                  <Camera className="w-6 h-6" />
                  <span className="font-semibold">Black Breastfeeding Week 2025</span>
                  <ExternalLink className="w-5 h-5" />
                </Button>

                <Button
                  size="lg"
                  variant="hero"
                  onClick={() => window.open(galleryLink2, '_blank')}
                  className="text-base px-8 py-8 rounded-xl shadow-xl min-h-[56px] flex-col h-auto gap-2"
                >
                  <Camera className="w-6 h-6" />
                  <span className="font-semibold">Brown Table Talk: Let it Flow Sis</span>
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </div>

              {/* Download & Share Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                      <Download className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Download Photos</h3>
                    <p className="text-sm text-foreground/60">
                      High-resolution images available for download
                    </p>
                  </div>
                </Card>

                <Card className="p-6 bg-card/60 backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                      <Share2 className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Share Memories</h3>
                    <p className="text-sm text-foreground/60">
                      Tag us on social media with your favorite moments
                    </p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Tab 3: Our Services */}
            <TabsContent value="services" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Health Services</h2>
                <p className="text-sm text-foreground/60 mb-6">
                  Comprehensive health services for our community
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {teamContacts.map((team, index) => {
                  const IconComponent = team.icon;
                  return (
                    <Card key={index} className="p-6 bg-card/60 backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-300">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-secondary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-3 text-base">{team.name}</h3>
                        <p className="text-sm text-foreground/60">{team.description}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Navigation Footer */}
      <SlideNavigation 
        currentSlide={14}
        previousRoute="/slides/ask"
        isLastSlide={true}
      />
    </SlideBackground>
  );
};

export default ContactSlide;
