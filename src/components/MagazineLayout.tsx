import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface MagazineLayoutProps {
  title: string;
  subtitle?: string;
  category: string;
  slideNumber: string;
  children: React.ReactNode;
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
  backgroundImage?: string;
}

const MagazineLayout: React.FC<MagazineLayoutProps> = ({
  title,
  subtitle,
  category,
  slideNumber,
  children,
  testimonial,
  backgroundImage
}) => {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-background relative overflow-hidden">
      {/* Background Image - Always show subtle logo */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/roots-logo-new.png"
          alt="Roots Community Health Logo" 
          className="w-full h-full object-contain opacity-5 sm:opacity-10"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/98"></div>
      </div>

      {/* Magazine Header */}
      <div className="relative z-10 border-b border-border/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 sm:mb-6">
            <div className="flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-primary font-roots">
                ROOTS COMMUNITY HEALTH
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide mt-1">
                OUR STORIES · OUR VOICES · ON OUR TERMS
              </p>
            </div>
            <div className="text-right sm:text-right text-left">
              <Badge variant="outline" className="mb-2 text-xs sm:text-sm">
                {category}
              </Badge>
              <div className="text-2xl sm:text-3xl font-bold text-primary font-roots">
                {slideNumber}
              </div>
            </div>
          </div>
          
          <Separator className="mb-6" />
          
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-roots leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-brand">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-24">
        {children}
      </div>

      {/* Testimonial Section */}
      {testimonial && (
        <div className="relative z-10 bg-muted/30 border-t border-border/20 pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
            <Card className="p-4 sm:p-6 md:p-8 bg-background/95 backdrop-blur-sm">
              <blockquote className="text-base sm:text-lg md:text-xl text-foreground italic leading-relaxed mb-4">
                "{testimonial.quote}"
              </blockquote>
              <footer className="text-sm text-muted-foreground">
                <strong className="text-foreground">{testimonial.author}</strong>
                {testimonial.role && (
                  <span className="block mt-1">{testimonial.role}</span>
                )}
              </footer>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default MagazineLayout;