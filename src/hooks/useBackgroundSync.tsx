import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BackgroundSyncOptions {
  enabled?: boolean;
  syncInterval?: number; // in milliseconds
}

/**
 * Hook that provides background sync capabilities for offline functionality
 */
export const useBackgroundSync = (options: BackgroundSyncOptions = {}) => {
  const { enabled = true, syncInterval = 30000 } = options; // 30 seconds default
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingOperations, setPendingOperations] = useState<any[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Monitor online/offline status
  useEffect(() => {
    if (!enabled) return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [enabled]);

  // Load pending operations from localStorage
  useEffect(() => {
    if (!enabled) return;

    const stored = localStorage.getItem('pendingOperations');
    if (stored) {
      try {
        setPendingOperations(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse pending operations:', error);
        localStorage.removeItem('pendingOperations');
      }
    }
  }, [enabled]);

  // Save pending operations to localStorage
  useEffect(() => {
    if (!enabled) return;
    
    localStorage.setItem('pendingOperations', JSON.stringify(pendingOperations));
  }, [pendingOperations, enabled]);

  const addPendingOperation = useCallback((operation: any) => {
    if (!enabled) return;
    
    const operationWithId = {
      ...operation,
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
    };
    
    setPendingOperations(prev => [...prev, operationWithId]);
  }, [enabled]);

  const processPendingOperations = useCallback(async () => {
    if (!enabled || !isOnline || pendingOperations.length === 0) return;

    const successfulOperations: any[] = [];
    
    for (const operation of pendingOperations) {
      try {
        switch (operation.type) {
          case 'analytics_event':
            // Process analytics events
            await supabase
              .from('analytics_events')
              .insert(operation.data);
            break;
          
          case 'image_upload':
            // Process image uploads - would need specific implementation
            console.log('Processing image upload:', operation.data);
            break;
          
          default:
            console.warn('Unknown operation type:', operation.type);
        }
        
        successfulOperations.push(operation);
      } catch (error) {
        console.error('Failed to process operation:', operation, error);
        
        // Remove operations that are too old (24 hours)
        const operationDate = new Date(operation.timestamp);
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        if (operationDate < dayAgo) {
          successfulOperations.push(operation);
        }
      }
    }

    // Remove successfully processed operations
    if (successfulOperations.length > 0) {
      setPendingOperations(prev => 
        prev.filter(op => !successfulOperations.includes(op))
      );
    }

    setLastSyncTime(new Date());
  }, [enabled, isOnline, pendingOperations]);

  // Automatic sync when coming back online
  useEffect(() => {
    if (enabled && isOnline) {
      processPendingOperations();
    }
  }, [isOnline, enabled, processPendingOperations]);

  // Periodic sync for online status
  useEffect(() => {
    if (!enabled || !isOnline) return;

    const interval = setInterval(() => {
      processPendingOperations();
    }, syncInterval);

    return () => clearInterval(interval);
  }, [enabled, isOnline, syncInterval, processPendingOperations]);

  const forcSync = useCallback(() => {
    if (enabled) {
      processPendingOperations();
    }
  }, [enabled, processPendingOperations]);

  return {
    isOnline,
    pendingOperations: pendingOperations.length,
    lastSyncTime,
    addPendingOperation,
    forcSync,
  };
};