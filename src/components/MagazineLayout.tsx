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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundImage}
            alt="Community background" 
            className="w-full h-full object-cover opacity-5"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/98 to-muted/95"></div>
        </div>
      )}

      {/* Magazine Header */}
      <div className="relative z-10 border-b border-border/20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-primary font-space">
                ROOTS COMMUNITY HEALTH
              </h1>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mt-1">
                OUR STORIES · OUR VOICES · ON OUR TERMS
              </p>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="mb-2">
                {category}
              </Badge>
              <div className="text-3xl font-bold text-primary font-space">
                {slideNumber}
              </div>
            </div>
          </div>
          
          <Separator className="mb-6" />
          
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-space leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-muted-foreground font-inter">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {children}
      </div>

      {/* Testimonial Section */}
      {testimonial && (
        <div className="relative z-10 bg-muted/30 border-t border-border/20">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <Card className="p-8 bg-background/95 backdrop-blur-sm">
              <blockquote className="text-lg md:text-xl text-foreground italic leading-relaxed mb-4">
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