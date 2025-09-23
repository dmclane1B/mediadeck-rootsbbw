import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, HardDrive, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ImageRestoreStatus: React.FC = () => {
  const { images, cloudImages, restoreFromPublishedSlides, restoring } = useMediaLibrary();
  const { toast } = useToast();

  const localCount = images.filter(img => img.source === 'local').length;
  const cloudCount = cloudImages.length;
  const missingFromLocal = cloudImages.filter(cloudImg => 
    !images.some(localImg => localImg.cloudPath === cloudImg.cloudPath)
  ).length;

  const handleQuickRestore = async () => {
    try {
      const restoredCount = await restoreFromPublishedSlides();
      
      if (restoredCount > 0) {
        toast({
          title: "Images Restored",
          description: `Successfully restored ${restoredCount} images.`,
        });
      } else {
        toast({
          title: "All Images Current",
          description: "All images are already available locally.",
        });
      }
    } catch (error) {
      toast({
        title: "Restoration Failed",
        description: error instanceof Error ? error.message : "Failed to restore images.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="w-5 h-5" />
          Image Sync Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-blue-500" />
            <span className="text-sm">Local: {localCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-green-500" />
            <span className="text-sm">Cloud: {cloudCount}</span>
          </div>
        </div>

        {missingFromLocal > 0 ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <Badge variant="secondary" className="text-amber-600">
                {missingFromLocal} images need restoration
              </Badge>
            </div>
            
            <Button 
              onClick={handleQuickRestore}
              disabled={restoring}
              size="sm"
              className="w-full"
            >
              {restoring ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Restoring...
                </>
              ) : (
                <>
                  <Cloud className="w-4 h-4 mr-2" />
                  Restore Missing Images
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <Badge variant="secondary" className="text-green-600">
              All images synced
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageRestoreStatus;