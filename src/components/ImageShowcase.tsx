import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image, Upload, Eye } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import ImagePreviewModal from '@/components/ImagePreviewModal';

interface ImageShowcaseProps {
  imageUrl?: string;
  imageAlt?: string;
  onImageSelect?: () => void;
  className?: string;
  variant?: 'hero' | 'standard' | 'compact';
  showPlaceholder?: boolean;
}

const ImageShowcase = ({ 
  imageUrl, 
  imageAlt = 'Slide image', 
  onImageSelect, 
  className = '',
  variant = 'standard',
  showPlaceholder = true 
}: ImageShowcaseProps) => {
  const [showPreview, setShowPreview] = useState(false);
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'hero':
        return 'h-80 md:h-96 lg:h-[32rem]';
      case 'compact':
        return 'h-48 md:h-64';
      case 'standard':
      default:
        return 'h-64 md:h-80 lg:h-96';
    }
  };

  const baseClasses = `relative w-full overflow-hidden rounded-xl ${getVariantClasses()}`;

  if (imageUrl) {
    return (
      <>
        <div className={`group ${baseClasses} ${className}`}>
          <LazyImage
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          
          {/* Overlay for interaction */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
            {onImageSelect && (
              <Button
                variant="secondary"
                onClick={onImageSelect}
                className="bg-white/90 text-primary hover:bg-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Change Image
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => setShowPreview(true)}
              className="bg-white/90 text-primary hover:bg-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />
        </div>

        {/* Preview Modal */}
        <ImagePreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          imageUrl={imageUrl}
          imageName={imageAlt}
          imageAlt={imageAlt}
        />
      </>
    );
  }

  if (!showPlaceholder) {
    return null;
  }

  return (
    <Card className={`${baseClasses} ${className} border-2 border-dashed border-border hover:border-primary/50 transition-colors`}>
      <div className="flex items-center justify-center h-full bg-muted/30">
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Image className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            Add Slide Image
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload an image to showcase on this slide
          </p>
          {onImageSelect && (
            <Button onClick={onImageSelect} variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Choose Image
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ImageShowcase;