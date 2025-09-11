import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImageIcon, ExternalLink } from 'lucide-react';
import LazyImage from '@/components/LazyImage';
import { useSlideImages } from '@/hooks/useSlideImages';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';

interface SlideImagePreviewProps {
  slideId: string;
  onNavigateToImages?: () => void;
}

const SlideImagePreview = ({ slideId, onNavigateToImages }: SlideImagePreviewProps) => {
  const { slideConfig } = useSlideImages();
  const { images } = useMediaLibrary();

  const slideImage = slideConfig[slideId];
  const imageData = slideImage ? images.find(img => img.id === slideImage.imageId) : null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <ImageIcon className="h-4 w-4" />
          Current Image
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {imageData ? (
          <>
            <div className="aspect-video relative overflow-hidden rounded-md border bg-muted">
              <LazyImage
                src={imageData.url}
                alt={slideImage?.imageAlt || imageData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground truncate">
                {imageData.name}
              </p>
              <div className="flex justify-between text-xs text-muted-foreground">
                {imageData.dimensions && (
                  <span>{imageData.dimensions.width} × {imageData.dimensions.height}</span>
                )}
                {imageData.size && (
                  <span>{formatFileSize(imageData.size)}</span>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="aspect-video flex items-center justify-center rounded-md border border-dashed bg-muted/50">
            <div className="text-center text-muted-foreground">
              <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No image assigned</p>
            </div>
          </div>
        )}
        
        {onNavigateToImages && (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={onNavigateToImages}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Manage Images
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SlideImagePreview;