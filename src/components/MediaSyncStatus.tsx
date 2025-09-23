import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, AlertTriangle, Cloud, HardDrive, RefreshCw } from 'lucide-react';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';
import { useToast } from '@/hooks/use-toast';

interface SyncStatusInfo {
  localImages: number;
  cloudImages: number;
  syncedImages: number;
  cloudOnlyImages: number;
  totalImages: number;
  syncPercentage: number;
}

const MediaSyncStatus: React.FC = () => {
  const { images, cloudImages, loading, restoreFromCloudImages, restoreFromPublishedSlides } = useMediaLibrary();
  const { toast } = useToast();
  const [syncing, setSyncing] = useState(false);
  const [statusInfo, setStatusInfo] = useState<SyncStatusInfo | null>(null);

  useEffect(() => {
    if (!loading) {
      const localImages = images.filter(img => img.source === 'local').length;
      const syncedImages = images.filter(img => img.source === 'synced').length;
      const cloudOnlyCount = cloudImages.filter(cloudImg => 
        !images.some(localImg => 
          localImg.id === cloudImg.id || localImg.cloudPath === cloudImg.cloudPath
        )
      ).length;
      
      const totalImages = images.length + cloudOnlyCount;
      const syncPercentage = totalImages > 0 ? Math.round(((images.length) / totalImages) * 100) : 100;

      setStatusInfo({
        localImages,
        cloudImages: cloudImages.length,
        syncedImages,
        cloudOnlyImages: cloudOnlyCount,
        totalImages,
        syncPercentage
      });
    }
  }, [images, cloudImages, loading]);

  const handleFullSync = async () => {
    setSyncing(true);
    try {
      // First restore from published slides to get slide assignments
      const slideRestored = await restoreFromPublishedSlides();
      
      // Then restore any remaining cloud images
      const cloudRestored = await restoreFromCloudImages();
      
      const totalRestored = Math.max(slideRestored, cloudRestored);
      
      if (totalRestored > 0) {
        toast({
          title: "Sync Complete",
          description: `Successfully synced ${totalRestored} images from cloud storage.`,
        });
      } else {
        toast({
          title: "Already in Sync",
          description: "All images are already synced locally.",
        });
      }
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: error instanceof Error ? error.message : "Failed to sync images.",
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading Media Status...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (!statusInfo) return null;

  const getSyncStatusBadge = () => {
    if (statusInfo.cloudOnlyImages === 0) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Fully Synced
        </Badge>
      );
    }
    
    if (statusInfo.syncPercentage >= 80) {
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <Cloud className="w-3 h-3 mr-1" />
          Mostly Synced ({statusInfo.syncPercentage}%)
        </Badge>
      );
    }
    
    return (
      <Badge variant="secondary" className="bg-amber-100 text-amber-800">
        <AlertTriangle className="w-3 h-3 mr-1" />
        Partial Sync ({statusInfo.syncPercentage}%)
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            Media Sync Status
          </span>
          {getSyncStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-blue-500" />
                Local Images
              </span>
              <span className="font-medium">{statusInfo.localImages + statusInfo.syncedImages}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-green-500" />
                Cloud Images
              </span>
              <span className="font-medium">{statusInfo.cloudImages}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Images</span>
              <span className="font-medium">{statusInfo.totalImages}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Cloud Only</span>
              <span className="font-medium text-amber-600">{statusInfo.cloudOnlyImages}</span>
            </div>
          </div>
        </div>

        {statusInfo.cloudOnlyImages > 0 && (
          <div className="space-y-3 pt-2 border-t">
            <p className="text-sm text-muted-foreground">
              {statusInfo.cloudOnlyImages} images are available in cloud storage but not cached locally.
            </p>
            
            <Button 
              onClick={handleFullSync}
              disabled={syncing}
              size="sm"
              className="w-full"
            >
              {syncing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync All Cloud Images
                </>
              )}
            </Button>
          </div>
        )}

        {statusInfo.cloudOnlyImages === 0 && statusInfo.totalImages > 0 && (
          <div className="text-center py-2">
            <p className="text-sm text-green-600 font-medium">
              ✓ All images are synced and available locally
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaSyncStatus;