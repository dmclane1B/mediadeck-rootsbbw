import { useEffect, useState } from 'react';
import { indexedDBManager } from '@/utils/indexedDBManager';
import { Card } from '@/components/ui/card';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface StorageInitializerProps {
  children: React.ReactNode;
}

export const StorageInitializer = ({ children }: StorageInitializerProps) => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [migrationInfo, setMigrationInfo] = useState<string | null>(null);

  useEffect(() => {
    const initializeStorage = async () => {
      try {
        setIsInitializing(true);
        setError(null);
        
        // Initialize IndexedDB
        await indexedDBManager.initialize();
        
        // Attempt migration from localStorage
        const migrationResult = await indexedDBManager.migrateFromLocalStorage();
        
        if (migrationResult.migrated > 0) {
          setMigrationInfo(`Migrated ${migrationResult.migrated} slide configurations from browser storage`);
        }
        
        if (migrationResult.errors.length > 0) {
          console.warn('Migration warnings:', migrationResult.errors);
        }
        
        // Small delay to show success state
        setTimeout(() => {
          setIsInitializing(false);
        }, 1000);
        
      } catch (error) {
        console.error('Storage initialization failed:', error);
        setError(error instanceof Error ? error.message : 'Unknown storage error');
        setIsInitializing(false);
      }
    };

    initializeStorage();
  }, []);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <h2 className="text-xl font-semibold">Initializing Storage</h2>
            <p className="text-muted-foreground">
              Setting up your media library and slide configurations...
            </p>
            {migrationInfo && (
              <div className="flex items-center space-x-2 text-sm text-success">
                <CheckCircle className="h-4 w-4" />
                <span>{migrationInfo}</span>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h2 className="text-xl font-semibold">Storage Error</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Failed to initialize storage system:
            </p>
            <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </p>
            <p className="text-xs text-muted-foreground">
              Try refreshing the page or clearing your browser storage.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};