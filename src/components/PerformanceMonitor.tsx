import React, { useEffect, useState } from 'react';
import { useBackgroundSync } from '@/hooks/useBackgroundSync';

interface PerformanceMetrics {
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  firstInputDelay?: number;
  cumulativeLayoutShift?: number;
}

/**
 * Component that monitors Core Web Vitals and performance metrics
 */
const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const { addPendingOperation, isOnline } = useBackgroundSync();

  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.name) {
          case 'first-contentful-paint':
            setMetrics(prev => ({ ...prev, firstContentfulPaint: entry.startTime }));
            break;
          case 'largest-contentful-paint':
            setMetrics(prev => ({ ...prev, largestContentfulPaint: entry.startTime }));
            break;
        }
        
        // Log performance metrics
        if (entry.entryType === 'paint' || entry.entryType === 'largest-contentful-paint') {
          const metric = {
            type: 'analytics_event',
            data: {
              event_name: 'core_web_vital',
              event_data: {
                metric_name: entry.name,
                metric_value: entry.startTime,
                timestamp: new Date().toISOString(),
                user_agent: navigator.userAgent,
                url: window.location.href,
              },
              session_id: sessionStorage.getItem('session_id') || 'unknown',
              timestamp: new Date().toISOString(),
            }
          };

          if (isOnline) {
            // Send immediately if online
            console.log('Performance metric recorded:', metric);
          } else {
            // Queue for later if offline
            addPendingOperation(metric);
          }
        }
      }
    });

    // Observe paint timing and LCP
    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });

    // Monitor First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as any; // Cast to access first-input specific properties
        setMetrics(prev => ({ ...prev, firstInputDelay: fidEntry.processingStart - fidEntry.startTime }));
      }
    });
    
    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.log('First Input Delay monitoring not supported');
    }

    // Monitor Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          setMetrics(prev => ({ ...prev, cumulativeLayoutShift: clsValue }));
        }
      }
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.log('Layout Shift monitoring not supported');
    }

    return () => {
      observer.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, [addPendingOperation, isOnline]);

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-background/90 backdrop-blur border rounded-lg p-3 text-xs font-mono z-50 max-w-xs">
      <h4 className="font-semibold mb-2">Performance Metrics</h4>
      <div className="space-y-1 text-xs">
        {metrics.firstContentfulPaint && (
          <div>FCP: {Math.round(metrics.firstContentfulPaint)}ms</div>
        )}
        {metrics.largestContentfulPaint && (
          <div>LCP: {Math.round(metrics.largestContentfulPaint)}ms</div>
        )}
        {metrics.firstInputDelay && (
          <div>FID: {Math.round(metrics.firstInputDelay)}ms</div>
        )}
        {metrics.cumulativeLayoutShift && (
          <div>CLS: {metrics.cumulativeLayoutShift.toFixed(4)}</div>
        )}
      </div>
    </div>
  );
};

export default PerformanceMonitor;