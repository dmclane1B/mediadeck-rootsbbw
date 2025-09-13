import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Plus, Eye, Image } from 'lucide-react';
import LazyImage from './LazyImage';
import ImagePreviewModal from './ImagePreviewModal';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';

// Helper function to validate image URLs
const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  // Data URLs (base64)
  if (url.startsWith('data:image/')) return true;
  
  // Blob URLs
  if (url.startsWith('blob:')) return true;
  
  // Relative paths
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) return true;
  
  // Absolute URLs
  if (url.match(/^https?:\/\//)) return true;
  
  return false;
};

interface ImageShowcaseProps {
  imageUrl?: string;
  imageId?: string;
  imageAlt?: string;
  onImageSelect?: () => void;
  className?: string;
  variant?: 'featured' | 'hero' | 'standard' | 'compact';
  showPlaceholder?: boolean;
}

const ImageShowcase: React.FC<ImageShowcaseProps> = ({
  imageUrl,
  imageId,
  imageAlt,
  onImageSelect,
  className = '',
  variant = 'standard',
  showPlaceholder = true
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const { images } = useMediaLibrary();

  // Resolve image source - prioritize imageUrl, then fetch from media library by imageId, then fallback by name
  const resolvedImage = useMemo(() => {
    if (imageUrl && isValidImageUrl(imageUrl)) {
      return {
        url: imageUrl,
        alt: imageAlt || 'Slide image'
      };
    }
    
    if (imageId) {
      const foundImage = images.find(img => img.id === imageId);
      if (foundImage && isValidImageUrl(foundImage.url)) {
        return {
          url: foundImage.url,
          alt: imageAlt || foundImage.name || 'Slide image'
        };
      }
    }
    
    // Fallback: search by name if imageAlt is provided (works when imageId wasn't found or wasn't provided)
    if (imageAlt) {
      const foundImageByName = images.find(img => 
        img.name.toLowerCase() === imageAlt.toLowerCase()
      );
      if (foundImageByName && isValidImageUrl(foundImageByName.url)) {
        console.log(`[ImageShowcase] Using fallback image by name: ${imageAlt} -> ${foundImageByName.id}`);
        return {
          url: foundImageByName.url,
          alt: imageAlt || foundImageByName.name || 'Slide image'
        };
      }
    }
    
    return null;
  }, [imageUrl, imageId, imageAlt, images]);

  // Get variant-specific classes for height
  const getVariantClasses = () => {
    switch (variant) {
      case 'featured':
        return 'h-[24rem] md:h-[32rem] lg:h-[40rem] xl:h-[48rem]';
      case 'hero':
        return 'h-96 md:h-[28rem] lg:h-[36rem] xl:h-[42rem]';
      case 'compact':
        return 'h-48 md:h-64';
      case 'standard':
      default:
        return 'h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]';
    }
  };

  const baseClasses = `relative w-full overflow-hidden rounded-xl ${getVariantClasses()}`;

  // Show image if available and valid
  if (resolvedImage && isValidImageUrl(resolvedImage.url)) {
    return (
      <>
        <div className={`group ${baseClasses} ${className}`}>
          <LazyImage
            src={resolvedImage.url}
            alt={resolvedImage.alt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            fallbackToPlaceholder={true}
            onError={() => {
              console.warn('Failed to load slide image:', resolvedImage.url);
            }}
          />
          
          {/* Image Status Indicator */}
          <div className="absolute top-2 right-2 bg-green-500/80 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            ✓ Image Set
          </div>
          
          {/* Overlay for preview */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
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

  // Show non-interactive placeholder if no image and placeholder is enabled
  if (showPlaceholder) {
    return (
      <Card className={`${baseClasses} ${className} border-2 border-dashed border-border`}>
        <div className="flex items-center justify-center h-full bg-muted/30">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Image className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              No Image Set
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use the Media Dashboard to assign an image to this slide
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // Return null if no placeholder should be shown
  return null;
};

export default ImageShowcase;