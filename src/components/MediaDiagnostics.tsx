import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';
import { usePublishedSlides } from '@/hooks/usePublishedSlides';
import { useSlideImages } from '@/hooks/useSlideImages';
import { supabase } from '@/integrations/supabase/client';
import { 
  Bug, 
  Database, 
  Cloud, 
  HardDrive, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle 
} from 'lucide-react';

interface DiagnosticResult {
  component: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  details?: string[];
}

const MediaDiagnostics: React.FC = () => {
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  
  const { images, cloudImages } = useMediaLibrary();
  const { publishedSlides } = usePublishedSlides();
  const { slideConfig } = useSlideImages();

  const runDiagnostics = async () => {
    setIsRunning(true);
    const results: DiagnosticResult[] = [];

    try {
      // Test 1: Supabase Connection
      try {
        const { data, error } = await supabase.from('published_slide_configurations').select('count').limit(1);
        if (error) throw error;
        results.push({
          component: 'Supabase Database',
          status: 'healthy',
          message: 'Database connection successful'
        });
      } catch (error) {
        results.push({
          component: 'Supabase Database',
          status: 'error',
          message: 'Database connection failed',
          details: [error instanceof Error ? error.message : 'Unknown error']
        });
      }

      // Test 2: IndexedDB Health
      try {
        const testWrite = await new Promise((resolve, reject) => {
          const request = indexedDB.open('media-storage', 1);
          request.onsuccess = () => resolve(true);
          request.onerror = () => reject(request.error);
        });
        
        results.push({
          component: 'IndexedDB Storage',
          status: 'healthy',
          message: 'Local storage accessible'
        });
      } catch (error) {
        results.push({
          component: 'IndexedDB Storage',
          status: 'error',
          message: 'Local storage inaccessible',
          details: [error instanceof Error ? error.message : 'Unknown error']
        });
      }

      // Test 3: Image Consistency
      const localImageCount = images.filter(img => img.source === 'local').length;
      const cloudImageCount = cloudImages.length;
      const publishedSlideCount = Object.keys(publishedSlides).length;
      const slideConfigCount = Object.keys(slideConfig).length;

      if (localImageCount === 0 && cloudImageCount > 0) {
        results.push({
          component: 'Image Sync',
          status: 'warning',
          message: 'Cloud images not synced locally',
          details: [`${cloudImageCount} cloud images`, `${localImageCount} local images`]
        });
      } else if (localImageCount > 0 || cloudImageCount > 0) {
        results.push({
          component: 'Image Sync',
          status: 'healthy',
          message: 'Images synchronized',
          details: [`${localImageCount} local`, `${cloudImageCount} cloud`]
        });
      } else {
        results.push({
          component: 'Image Sync',
          status: 'warning',
          message: 'No images found',
          details: ['Consider uploading images or restoring from published slides']
        });
      }

      // Test 4: Slide Configuration
      if (slideConfigCount > 0) {
        const validConfigs = Object.values(slideConfig).filter(config => config && config.imageId).length;
        if (validConfigs === slideConfigCount) {
          results.push({
            component: 'Slide Configuration',
            status: 'healthy',
            message: `All ${slideConfigCount} slides configured`
          });
        } else {
          results.push({
            component: 'Slide Configuration',
            status: 'warning',
            message: `${validConfigs}/${slideConfigCount} slides properly configured`
          });
        }
      } else {
        results.push({
          component: 'Slide Configuration',
          status: 'warning',
          message: 'No slide configurations found'
        });
      }

      // Test 5: Published Slides Status
      if (publishedSlideCount > 0) {
        results.push({
          component: 'Published Slides',
          status: 'healthy',
          message: `${publishedSlideCount} slides published`
        });
      } else {
        results.push({
          component: 'Published Slides',
          status: 'warning',
          message: 'No published slides found'
        });
      }

    } catch (error) {
      results.push({
        component: 'Diagnostic Runner',
        status: 'error',
        message: 'Failed to complete diagnostics',
        details: [error instanceof Error ? error.message : 'Unknown error']
      });
    }

    setDiagnosticResults(results);
    setIsRunning(false);
  };

  const getStatusIcon = (status: DiagnosticResult['status']) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: DiagnosticResult['status']) => {
    const variants = {
      healthy: 'default',
      warning: 'secondary',
      error: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status]} className="ml-2">
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="w-5 h-5" />
          Media System Diagnostics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={runDiagnostics} 
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Running Diagnostics...
            </>
          ) : (
            <>
              <Bug className="w-4 h-4 mr-2" />
              Run System Check
            </>
          )}
        </Button>

        {diagnosticResults.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Diagnostic Results</h4>
            {diagnosticResults.map((result, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className="font-medium">{result.component}</span>
                    {getStatusBadge(result.status)}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1">
                  {result.message}
                </p>
                
                {result.details && result.details.length > 0 && (
                  <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                    {result.details.map((detail, idx) => (
                      <li key={idx} className="ml-4">• {detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaDiagnostics;