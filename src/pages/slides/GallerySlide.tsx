import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, ExternalLink, Download, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import SlideNavigation from '@/components/SlideNavigation';
import SlideBackground from '@/components/SlideBackground';
import SideTab from '@/components/SideTab';

const GallerySlide = () => {
  const navigate = useNavigate();

  const handlePrevious = () => navigate('/slides/contact');
  const handleNext = () => navigate('/');
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

  // Placeholder for gallery link - can be updated per event
  const galleryLink = "https://photos.rootscommunityhealth.org/bbw-2025";

  return (
    <SlideBackground className="flex flex-col">
      {/* Side Tab */}
      <SideTab text="PHOTO GALLERY" />

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
        <img 
          src="/lovable-uploads/8f771217-3f89-469e-9a26-608410b785c2.png" 
          alt="Roots Community Health Logo" 
          className="h-8 sm:h-10 w-auto ml-auto mb-1 sm:mb-2" 
        />
        <div className="text-primary text-base sm:text-xl font-space font-bold">15</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 relative z-10 pb-24">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full mb-4 sm:mb-6">
              <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              EVENT PHOTO GALLERY
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/80 max-w-3xl mx-auto px-4">
              Relive the highlights from Black Breastfeeding Week 2025. View the complete collection of event photos, testimonials, and moments that made this celebration special.
            </p>
          </div>

          {/* Featured Photo Grid Preview */}
          <div className="mb-8 sm:mb-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {/* Preview placeholders - these would be replaced with actual featured photos */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card 
                  key={i}
                  className="aspect-square bg-gradient-to-br from-primary/5 to-accent/5 border-border/30 flex items-center justify-center overflow-hidden group hover:scale-105 transition-all duration-300"
                >
                  <div className="text-foreground/20 group-hover:text-foreground/40 transition-colors">
                    <Camera className="w-8 h-8 sm:w-12 sm:h-12" />
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-sm text-foreground/60 italic">
              Preview: Featured moments from the event week
            </p>
          </div>

          {/* Main Call-to-Action */}
          <div className="mb-8">
            <Button
              size="lg"
              variant="hero"
              onClick={() => window.open(galleryLink, '_blank')}
              className="text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 rounded-xl shadow-xl min-h-[56px]"
            >
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              View Full Photo Gallery
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </div>

          {/* Additional Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Card className="p-4 sm:p-6 bg-card/60 backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                  <Download className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Download Photos</h3>
                <p className="text-xs sm:text-sm text-foreground/60">
                  High-resolution images available for download
                </p>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 bg-card/60 backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-3">
                  <Share2 className="w-5 sm:w-6 h-5 sm:h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Share Memories</h3>
                <p className="text-xs sm:text-sm text-foreground/60">
                  Tag us on social media with your favorite moments
                </p>
              </div>
            </Card>
          </div>

          {/* Event Details Footer */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/20">
            <p className="text-sm text-foreground/60">
              📸 Black Breastfeeding Week 2025 | August 25-31 | Roots Community Health
            </p>
          </div>

        </div>
      </div>

      {/* Navigation Footer */}
      <SlideNavigation 
        currentSlide={15}
        previousRoute="/slides/contact"
        isLastSlide={true}
      />
    </SlideBackground>
  );
};

export default GallerySlide;
