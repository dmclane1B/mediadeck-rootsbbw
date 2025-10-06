import { useEffect, useState } from 'react';
import { databaseInitializer } from '@/utils/databaseInitializer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { detectIndexedDBAvailability, getStorageErrorMessage } from '@/utils/storageDetection';
import { useStorage } from '@/contexts/StorageContext';

interface StorageInitializerProps {
  children: React.ReactNode;
}

export const StorageInitializer = ({ children }: StorageInitializerProps) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storageReason, setStorageReason] = useState<string | undefined>();
  const [showOptions, setShowOptions] = useState(false);
  const { setStorageMode, setIsStorageAvailable } = useStorage();

  const initializeStorage = async (forceMemoryMode = false) => {
    try {
      setIsInitializing(true);
      setError(null);
      setShowOptions(false);
      
      if (forceMemoryMode) {
        console.log('[StorageInitializer] Starting in memory-only mode...');
        setStorageMode('memory');
        setIsStorageAvailable(false);
        setIsInitializing(false);
        return;
      }

      console.log('[StorageInitializer] Detecting IndexedDB availability...');
      const detection = await detectIndexedDBAvailability();
      
      if (!detection.available) {
        console.warn('[StorageInitializer] IndexedDB unavailable:', detection.reason);
        setStorageReason(detection.reason);
        setError(getStorageErrorMessage(detection.reason));
        setShowOptions(true);
        setIsInitializing(false);
        return;
      }

      console.log('[StorageInitializer] IndexedDB available, initializing...');
      
      // Set 5-second timeout for initialization
      const initPromise = databaseInitializer.ensureInitialized();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Initialization timeout')), 5000)
      );
      
      await Promise.race([initPromise, timeoutPromise]);
      
      console.log('[StorageInitializer] Database initialized successfully');
      setStorageMode('indexeddb');
      setIsStorageAvailable(true);
      setIsInitializing(false);
      
    } catch (error) {
      console.error('[StorageInitializer] Storage initialization failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown storage error';
      setError(getStorageErrorMessage(errorMessage));
      setStorageReason(errorMessage);
      setShowOptions(true);
      setIsInitializing(false);
    }
  };

  useEffect(() => {
    initializeStorage();
  }, []);

  const handleContinueWithoutStorage = () => {
    console.log('[StorageInitializer] User chose to continue in limited mode');
    initializeStorage(true);
  };

  const handleRetry = () => {
    console.log('[StorageInitializer] User chose to retry initialization');
    initializeStorage(false);
  };

  const handleClearData = async () => {
    console.log('[StorageInitializer] User chose to clear site data');
    try {
      // Clear localStorage
      localStorage.clear();
      
      // Clear all IndexedDB databases
      const databases = await indexedDB.databases();
      for (const db of databases) {
        if (db.name) {
          indexedDB.deleteDatabase(db.name);
        }
      }
      
      // Reload the page
      window.location.reload();
    } catch (e) {
      console.error('Failed to clear data:', e);
      // Fallback to just reloading
      window.location.reload();
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <h2 className="text-xl font-semibold">Loading...</h2>
            <p className="text-muted-foreground">
              Setting up your experience
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (error && showOptions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="flex flex-col items-center space-y-6">
            <AlertCircle className="h-12 w-12 text-amber-500" />
            <h2 className="text-xl font-semibold">Storage Unavailable</h2>
            <p className="text-sm text-muted-foreground text-center">
              {error}
            </p>
            
            {storageReason && (
              <p className="text-xs text-muted-foreground bg-muted p-3 rounded-md w-full text-center">
                Technical details: {storageReason}
              </p>
            )}

            <div className="flex flex-col gap-3 w-full">
              <Button 
                onClick={handleContinueWithoutStorage}
                className="w-full"
                variant="default"
              >
                Continue in Limited Mode
              </Button>
              
              <Button 
                onClick={handleRetry}
                className="w-full"
                variant="outline"
              >
                Retry Initialization
              </Button>
              
              <Button 
                onClick={handleClearData}
                className="w-full"
                variant="ghost"
              >
                Clear Site Data & Reload
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Limited mode uses published content from the cloud. Local uploads will not be available.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};