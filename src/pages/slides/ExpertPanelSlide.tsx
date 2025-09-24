import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, Users, GraduationCap, Calendar, Clock, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SlideNavigation from '@/components/SlideNavigation';
import ImageShowcase from '@/components/ImageShowcase';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';
const ExpertPanelSlide = () => {
  const navigate = useNavigate();
  const {
    getSlideImageForDisplay
  } = useSlideImageResolver();
  const {
    getSlideContent
  } = useSlideContent();
  const slideImage = getSlideImageForDisplay('expert-panel');
  const slideContent = getSlideContent('expert-panel');
  const handleHome = () => navigate('/');
  return <div className="min-h-screen min-h-[100dvh] bg-background relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/roots-logo-new.png" 
          alt="Roots Community Health Logo" 
          className="w-full h-full object-contain opacity-5 sm:opacity-10"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/95"></div>
      </div>

      {/* Navigation */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-10">
        <Button variant="outline" onClick={handleHome} className="transition-all duration-300 hover:scale-105 min-h-[44px] text-xs sm:text-sm px-2 sm:px-4">
          <Home className="w-4 h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Home</span>
        </Button>
      </div>

      {/* Branding */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-10 text-right">
        <div className="text-primary text-lg sm:text-2xl font-roots font-bold mb-1 sm:mb-2">ROOTS</div>
        <div className="text-muted-foreground text-base sm:text-xl font-roots font-bold">05</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-16 sm:pt-24 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block px-3 sm:px-4 py-2 bg-primary/10 text-primary text-xs sm:text-sm font-semibold rounded-full mb-4 border border-primary/20">
              {slideContent?.customFields?.category || 'EVENTS'}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 font-roots leading-tight">
              {slideContent?.subtitle || 'Expert Panel'}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
              {slideContent?.description || 'Learn from board-certified lactation consultants and healthcare professionals about best practices and evidence-based support.'}
            </p>
          </div>

          {/* Image Showcase */}
          <div className="mb-16">
            <ImageShowcase imageUrl={slideImage?.url} imageAlt={slideImage?.alt || 'Expert Panel'} onImageSelect={() => navigate('/media')} variant="hero" className="animate-fade-in" />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 pb-24">
            {/* Featured Experts */}
            <div className="space-y-6">
              <Card className="p-4 sm:p-6 lg:p-8 bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Featured Experts</h3>
                </div>
                <div className="space-y-4">
                  {Array.isArray(slideContent?.sections?.[0]?.content) ? slideContent.sections[0].content.map((item, index) => <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                          <p className="text-muted-foreground">{item}</p>
                        </div>) : <>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                          <p className="text-muted-foreground">Board-certified lactation consultant</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                          <p className="text-muted-foreground">Pediatric specialists</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                          <p className="text-muted-foreground">Community health advocates</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                          <p className="text-muted-foreground">Q&A session included</p>
                        </div>
                      </>}
                </div>
              </Card>
            </div>

            {/* Event Details */}
            <div className="space-y-6">
              <Card className="p-4 sm:p-6 lg:p-8 bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Event Details</h3>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-primary/5 rounded-lg">
                    <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">Tuesday, August 26, 2025</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Black Breastfeeding Week</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-primary/5 rounded-lg">
                    <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">7:00 PM - 8:30 PM</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">90 minutes with Q&A</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-primary/5 rounded-lg">
                    <Video className="w-4 sm:w-5 h-4 sm:h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">Virtual Event via Zoom</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Link provided after registration</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Key Topics */}
              <Card className="p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
                <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Key Topics Covered</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <div className="text-xs sm:text-sm text-muted-foreground">• Evidence-based practices</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">• Common challenges</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">• Cultural considerations</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">• Support resources</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="max-w-2xl mx-auto">
              
              
              
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation currentSlide={5} previousRoute="/slides/monday-kickoff" nextRoute="/slides/community-voices" />
    </div>;
};
export default ExpertPanelSlide;