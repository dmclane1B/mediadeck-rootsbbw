import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Cloud, HardDrive, CheckCircle, AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

const ImageRestoreStatus: React.FC = () => {
  const {
    images,
    cloudImages,
    restoreFromPublishedSlides,
    restoreFromCloudImages,
    restoring,
    cloudLoading,
    cloudError,
    lastCloudSync,
    statusLog,
    reloadCloudImages,
  } = useMediaLibrary();
  const { toast } = useToast();
  const [isReloading, setIsReloading] = React.useState(false);

  const localCount = images.filter(img => img.source === 'local').length;
  const cloudCount = cloudImages.length;
  const missingFromLocal = cloudImages.filter(cloudImg =>
    !images.some(localImg => localImg.cloudPath === cloudImg.cloudPath)
  ).length;
  const recentStatus = statusLog.slice(-3).reverse();
  const lastSyncedText = lastCloudSync
    ? formatDistanceToNow(new Date(lastCloudSync), { addSuffix: true })
    : 'Never';

  const handleQuickRestore = async () => {
    try {
      // Try restoring from all cloud sources
      const slideCount = await restoreFromPublishedSlides();
      const cloudCount = await restoreFromCloudImages();
      const totalRestored = Math.max(slideCount, cloudCount);
      await reloadCloudImages();

      if (totalRestored > 0) {
        toast({
          title: "Images Restored",
          description: `Successfully restored ${totalRestored} images from cloud storage.`,
        });
      } else {
        toast({
          title: "All Images Current",
          description: "All cloud images are already available locally.",
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

  const handleReloadCloudStatus = async () => {
    setIsReloading(true);
    try {
      await reloadCloudImages();
      toast({
        title: "Cloud status updated",
        description: "Refetched cloud media inventory."
      });
    } catch (error) {
      toast({
        title: "Reload failed",
        description: error instanceof Error ? error.message : 'Unable to reload cloud images.',
        variant: 'destructive',
      });
    } finally {
      setIsReloading(false);
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
        <div className="flex items-start justify-between text-xs text-muted-foreground">
          <div>
            <span className="font-medium text-foreground">Last cloud check:</span>{' '}
            {cloudLoading ? 'Syncing…' : lastSyncedText}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReloadCloudStatus}
            disabled={isReloading || cloudLoading}
          >
            {isReloading ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Refreshing
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-3 w-3" />
                Refresh
              </>
            )}
          </Button>
        </div>

        {cloudError && (
          <Alert variant="destructive">
            <div className="flex flex-col gap-1">
              <AlertTitle className="text-sm">Cloud sync issue</AlertTitle>
              <AlertDescription className="text-xs">{cloudError}</AlertDescription>
            </div>
          </Alert>
        )}

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

        {recentStatus.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Recent activity</p>
            <ul className="space-y-1 text-[11px] text-muted-foreground">
              {recentStatus.map(entry => (
                <li key={entry.id}>
                  <span className={entry.level === 'error'
                    ? 'text-destructive font-semibold'
                    : entry.level === 'warning'
                      ? 'text-amber-600 font-semibold'
                      : 'text-foreground font-semibold'}>
                    {entry.level}:
                  </span>{' '}
                  {entry.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageRestoreStatus;