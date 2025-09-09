import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image, Upload, Eye } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import ImagePreviewModal from '@/components/ImagePreviewModal';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';

// Enhanced URL validation utility with better base64 support
const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  const trimmedUrl = url.trim();
  if (!trimmedUrl) return false;
  
  // Check for common invalid patterns
  const invalidPatterns = ['undefined', 'null', '[object Object]', 'NaN'];
  if (invalidPatterns.includes(trimmedUrl)) return false;
  
  // Handle data URLs (base64) with regex - more reliable for long strings
  if (trimmedUrl.startsWith('data:')) {
    const dataUrlPattern = /^data:image\/(jpeg|jpg|png|gif|webp|svg\+xml);base64,[A-Za-z0-9+/]+=*$/;
    return dataUrlPattern.test(trimmedUrl);
  }
  
  // Handle blob URLs
  if (trimmedUrl.startsWith('blob:')) {
    return true;
  }
  
  // Handle relative paths
  if (trimmedUrl.match(/^[./]/) || trimmedUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    return true;
  }
  
  // Handle http/https URLs with URL constructor
  try {
    const urlObj = new URL(trimmedUrl);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};

interface ImageShowcaseProps {
  imageUrl?: string;
  imageId?: string;
  imageAlt?: string;
  onImageSelect?: () => void;
  className?: string;
  variant?: 'hero' | 'standard' | 'compact';
  showPlaceholder?: boolean;
}

const ImageShowcase = ({ 
  imageUrl, 
  imageId,
  imageAlt = 'Slide image', 
  onImageSelect, 
  className = '',
  variant = 'standard',
  showPlaceholder = true 
}: ImageShowcaseProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const { images } = useMediaLibrary();
  
  // Get image from media library if imageId is provided
  const resolvedImage = useMemo(() => {
    if (imageUrl) {
      return { url: imageUrl, alt: imageAlt };
    }
    if (imageId) {
      const mediaImage = images.find(img => img.id === imageId);
      return mediaImage ? { url: mediaImage.url, alt: mediaImage.name } : null;
    }
    return null;
  }, [imageUrl, imageId, imageAlt, images]);
  
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

  // Only render image if we have resolved image data
  if (resolvedImage && isValidImageUrl(resolvedImage.url)) {
    return (
      <>
        <div className={`group ${baseClasses} ${className}`}>
          <LazyImage
            src={resolvedImage.url}
            alt={resolvedImage.alt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            fallbackToPlaceholder={true}
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
          imageUrl={resolvedImage.url}
          imageName={resolvedImage.alt}
          imageAlt={resolvedImage.alt}
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