import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ImageShowcase from './ImageShowcase';

interface CommunitySectionProps {
  title: string;
  description?: string;
  items: Array<{
    title?: string;
    content: string | string[];
    image?: {
      url: string;
      alt: string;
    };
    highlight?: boolean;
  }>;
  variant?: 'default' | 'highlights' | 'voices';
}

const CommunitySection: React.FC<CommunitySectionProps> = ({
  title,
  description,
  items,
  variant = 'default'
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground font-space">
          {title}
        </h3>
        {description && (
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className={`grid gap-6 ${
        variant === 'highlights' ? 'grid-cols-1 md:grid-cols-2' : 
        variant === 'voices' ? 'grid-cols-1' :
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {items.map((item, index) => (
          <Card 
            key={index} 
            className={`p-6 transition-all duration-300 hover:shadow-lg ${
              item.highlight ? 'border-primary/30 bg-primary/5' : ''
            }`}
          >
            {item.image && (
              <div className="mb-4">
                <ImageShowcase
                  imageUrl={item.image.url}
                  imageAlt={item.image.alt}
                  variant="standard"
                  className="rounded-lg"
                />
              </div>
            )}
            
            {item.title && (
              <h4 className="text-lg font-semibold text-foreground mb-3 font-space">
                {item.title}
              </h4>
            )}
            
            <div className="text-muted-foreground space-y-2">
              {Array.isArray(item.content) ? (
                <ul className="space-y-2">
                  {item.content.map((contentItem, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>{contentItem}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="leading-relaxed">{item.content}</p>
              )}
            </div>
            
            {item.highlight && (
              <Badge variant="outline" className="mt-3">
                Community Highlight
              </Badge>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunitySection;