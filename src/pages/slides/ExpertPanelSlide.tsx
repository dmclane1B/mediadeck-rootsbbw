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
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent } = useSlideContent();
  const slideImage = getSlideImageForDisplay('expert-panel');
  const slideContent = getSlideContent('expert-panel');

  const handleHome = () => navigate('/');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/src/assets/geometric-pattern.png')] bg-repeat animate-pulse"></div>
      </div>
      
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95"></div>

      {/* Navigation */}
      <div className="absolute top-8 left-8 z-10">
        <Button 
          variant="outline" 
          onClick={handleHome}
          className="transition-all duration-300 hover:scale-105"
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
      </div>

      {/* Branding */}
      <div className="absolute top-8 right-8 z-10 text-right">
        <div className="text-primary text-2xl font-space font-bold mb-2">ROOTS</div>
        <div className="text-muted-foreground text-xl font-space font-bold">05</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-20 px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4 border border-primary/20">
              {slideContent?.customFields?.category || 'EVENTS'}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 font-space">
              {slideContent?.subtitle || 'Expert Panel'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {slideContent?.description || 'Learn from board-certified lactation consultants and healthcare professionals about best practices and evidence-based support.'}
            </p>
          </div>

          {/* Image Showcase */}
          <div className="mb-16">
            <ImageShowcase
              imageUrl={slideImage?.url}
              imageAlt={slideImage?.alt || 'Expert Panel'}
              onImageSelect={() => navigate('/media')}
              variant="hero"
              className="animate-fade-in"
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Featured Experts */}
            <div className="space-y-6">
              <Card className="p-8 bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Featured Experts</h3>
                </div>
                <div className="space-y-4">
                  {Array.isArray(slideContent?.sections?.[0]?.content) 
                    ? slideContent.sections[0].content.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                          <p className="text-muted-foreground">{item}</p>
                        </div>
                      ))
                    : (
                      <>
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
                      </>
                    )
                  }
                </div>
              </Card>
            </div>

            {/* Event Details */}
            <div className="space-y-6">
              <Card className="p-8 bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Event Details</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Tuesday, August 26, 2025</p>
                      <p className="text-sm text-muted-foreground">Black Breastfeeding Week</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">7:00 PM - 8:30 PM</p>
                      <p className="text-sm text-muted-foreground">90 minutes with Q&A</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                    <Video className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Virtual Event via Zoom</p>
                      <p className="text-sm text-muted-foreground">Link provided after registration</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Key Topics */}
              <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
                <h4 className="text-lg font-semibold text-foreground mb-4">Key Topics Covered</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-sm text-muted-foreground">• Evidence-based practices</div>
                  <div className="text-sm text-muted-foreground">• Common challenges</div>
                  <div className="text-sm text-muted-foreground">• Cultural considerations</div>
                  <div className="text-sm text-muted-foreground">• Support resources</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-foreground mb-4">Join Our Expert Panel</h3>
              <p className="text-muted-foreground mb-6">Get evidence-based guidance from certified professionals and connect with your community.</p>
              <Button size="lg" className="px-8 py-3">
                Register for Free
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation 
        currentSlide={5}
        previousRoute="/slides/monday-kickoff"
        nextRoute="/slides/community-voices"
      />
    </div>
  );
};

export default ExpertPanelSlide;