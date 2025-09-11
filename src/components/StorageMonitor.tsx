import React, { useState } from 'react';
import { CloudMediaManager } from '@/utils/cloudMedia';
import { useIndexedDBStorage } from '@/hooks/useIndexedDBStorage';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  HardDrive, 
  Trash2, 
  AlertTriangle, 
  AlertCircle, 
  RefreshCw,
  Settings,
  Cloud,
  CloudOff
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface StorageMonitorProps {
  compact?: boolean;
}

const StorageMonitor: React.FC<StorageMonitorProps> = ({ compact = false }) => {
  const { 
    storageInfo, 
    updateStorageInfo, 
    performCleanup, 
    autoCleanup,
    shouldShowWarning,
    shouldShowCritical,
    formatBytes 
  } = useIndexedDBStorage();
  
  const { getCloudStorageInfo, restoreFromCloud } = useMediaLibrary();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showCleanupDialog, setShowCleanupDialog] = useState(false);
  const [cloudInfo, setCloudInfo] = useState<{ cloudFileCount: number; cloudError?: string; isCloudSynced: boolean } | null>(null);
  
  const [cleanupOptions, setCleanupOptions] = useState({
    maxAge: 30,
    maxTotalSize: 400,
    keepRecentCount: 100
  });

  // Load cloud info
  React.useEffect(() => {
    const loadCloudInfo = async () => {
      try {
        const info = await getCloudStorageInfo();
        setCloudInfo(info);
      } catch (error) {
        console.error('Failed to load cloud info:', error);
      }
    };
    loadCloudInfo();
  }, [getCloudStorageInfo]);

  // Cloud restore function
  const handleCloudRestore = async () => {
    setIsLoading(true);
    try {
      const restoredCount = await restoreFromCloud();
      await updateStorageInfo(); // Refresh storage info
      
      if (restoredCount > 0) {
        toast({
          title: "Cloud Restore Complete",
          description: `Successfully restored ${restoredCount} images from cloud storage.`,
        });
      } else {
        toast({
          title: "No Images to Restore",
          description: "No images found in cloud storage to restore.",
        });
      }
    } catch (error) {
      console.error('Cloud restore error:', error);
      toast({
        title: "Cloud Restore Failed",
        description: "Failed to restore images from cloud storage.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoCleanup = async () => {
    setIsLoading(true);
    try {
      const deletedCount = await autoCleanup();
      toast({
        title: "Cleanup Complete",
        description: `Removed ${deletedCount} unused images to free up space.`,
      });
    } catch (error) {
      toast({
        title: "Cleanup Failed",
        description: "There was an error cleaning up storage.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomCleanup = async () => {
    setIsLoading(true);
    try {
      const deletedCount = await performCleanup({
        maxAge: cleanupOptions.maxAge,
        maxTotalSize: cleanupOptions.maxTotalSize * 1024 * 1024, // Convert MB to bytes
        keepRecentCount: cleanupOptions.keepRecentCount
      });
      
      toast({
        title: "Custom Cleanup Complete",
        description: `Removed ${deletedCount} images based on your criteria.`,
      });
      
      setShowCleanupDialog(false);
    } catch (error) {
      toast({
        title: "Cleanup Failed",
        description: "There was an error performing custom cleanup.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressColor = () => {
    if (shouldShowCritical()) return "bg-destructive";
    if (shouldShowWarning()) return "bg-yellow-500";
    return "bg-primary";
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <HardDrive className="h-4 w-4" />
        <span>{formatBytes(storageInfo.usedSize)} used</span>
        {shouldShowCritical() && (
          <AlertCircle className="h-4 w-4 text-destructive" />
        )}
        {shouldShowWarning() && !shouldShowCritical() && (
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <HardDrive className="h-5 w-5" />
          Storage Monitor
          <Button
            variant="ghost"
            size="sm"
            onClick={updateStorageInfo}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Storage Usage Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Storage Used</span>
            <span>{Math.round(storageInfo.usagePercent)}%</span>
          </div>
          <Progress 
            value={storageInfo.usagePercent} 
            className="h-3"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatBytes(storageInfo.usedSize)}</span>
            <span>{formatBytes(storageInfo.estimatedQuota)}</span>
          </div>
        </div>

        {/* Storage Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium">Images Stored</div>
            <div className="text-muted-foreground">{storageInfo.imageCount}</div>
          </div>
          <div>
            <div className="font-medium">Available</div>
            <div className="text-muted-foreground">
              {formatBytes(storageInfo.estimatedQuota - storageInfo.usedSize)}
            </div>
          </div>
        </div>

        {/* Warnings */}
        {shouldShowCritical() && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Storage is critically full! Consider cleaning up unused images.
            </AlertDescription>
          </Alert>
        )}
        
        {shouldShowWarning() && !shouldShowCritical() && (
          <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Storage is getting full. You may want to clean up old images.
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAutoCleanup}
            disabled={isLoading}
            className="flex-1"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Auto Cleanup
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleCloudRestore}
            disabled={isLoading}
          >
            <Cloud className="h-4 w-4 mr-2" />
            Restore from Cloud
          </Button>
          
          <Dialog open={showCleanupDialog} onOpenChange={setShowCleanupDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Custom
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Custom Cleanup Options</DialogTitle>
                <DialogDescription>
                  Configure cleanup criteria to remove unused images.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="maxAge">Remove images older than (days)</Label>
                  <Input
                    id="maxAge"
                    type="number"
                    value={cleanupOptions.maxAge}
                    onChange={(e) => setCleanupOptions(prev => ({
                      ...prev,
                      maxAge: parseInt(e.target.value) || 30
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxSize">Keep total storage under (MB)</Label>
                  <Input
                    id="maxSize"
                    type="number"
                    value={cleanupOptions.maxTotalSize}
                    onChange={(e) => setCleanupOptions(prev => ({
                      ...prev,
                      maxTotalSize: parseInt(e.target.value) || 400
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="keepCount">Keep at most (recent images)</Label>
                  <Input
                    id="keepCount"
                    type="number"
                    value={cleanupOptions.keepRecentCount}
                    onChange={(e) => setCleanupOptions(prev => ({
                      ...prev,
                      keepRecentCount: parseInt(e.target.value) || 100
                    }))}
                  />
                </div>
                
                <Button
                  onClick={handleCustomCleanup}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Perform Cleanup
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default StorageMonitor;