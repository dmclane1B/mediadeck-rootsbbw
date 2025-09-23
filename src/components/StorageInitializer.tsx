import { useEffect, useState } from 'react';
import { databaseInitializer } from '@/utils/databaseInitializer';
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
        
        console.log('[StorageInitializer] Starting centralized database initialization...');
        
        // Use centralized database initializer
        await databaseInitializer.ensureInitialized();
        
        console.log('[StorageInitializer] Database initialization completed');
        setMigrationInfo('Database initialized successfully');
        
        // Small delay to show success state
        setTimeout(() => {
          setIsInitializing(false);
        }, 800);
        
      } catch (error) {
        console.error('[StorageInitializer] Storage initialization failed:', error);
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