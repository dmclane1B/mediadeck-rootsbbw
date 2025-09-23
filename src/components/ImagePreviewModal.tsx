import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageName: string;
  imageAlt?: string;
}

const ImagePreviewModal = ({ 
  isOpen, 
  onClose, 
  imageUrl, 
  imageName, 
  imageAlt = 'Preview image' 
}: ImagePreviewModalProps) => {
  const [zoom, setZoom] = useState(100);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageName;
    link.click();
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 25, 300));
  const zoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!left-2 !right-2 !top-[5%] !bottom-[5%] sm:!left-[50%] sm:!right-auto sm:!top-[50%] sm:!bottom-auto !translate-x-0 !translate-y-0 sm:!translate-x-[-50%] sm:!translate-y-[-50%] !w-auto sm:!w-full !max-w-[calc(100vw-1rem)] sm:!max-w-5xl !h-[calc(100vh-10%)] sm:!h-[90vh] !p-0 !flex !flex-col !gap-0 !overflow-hidden !mx-0 sm:!mx-auto [&>button[data-dialog-close]]:hidden" aria-describedby="image-preview-description">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-2 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-base sm:text-lg">{imageName}</h3>
              <p className="text-sm text-muted-foreground">Zoom: {zoom}%</p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="outline" size="sm" onClick={zoomOut} disabled={zoom <= 50} className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={zoomIn} disabled={zoom >= 300} className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload} className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onClose} className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Image Container */}
        <div className="w-full h-full pt-14 sm:pt-20 overflow-auto bg-muted/20">
          <div className="flex items-center justify-center min-h-full p-2 sm:p-4">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="max-w-none transition-transform duration-200"
              style={{ 
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'center'
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewModal;