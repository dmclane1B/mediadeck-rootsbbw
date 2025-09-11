/**
 * Image Performance Utilities
 * Handles performance optimizations for image loading and caching
 */

export interface ImageCacheEntry {
  url: string;
  timestamp: number;
  size: number;
}

export class ImagePerformanceManager {
  private static readonly CACHE_NAME = 'image-cache-v1';
  private static readonly MAX_CACHE_SIZE = 100 * 1024 * 1024; // 100MB
  private static readonly MAX_CACHE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days
  
  /**
   * Initialize service worker for image caching
   */
  static async initializeImageCaching(): Promise<void> {
    if ('serviceWorker' in navigator && 'caches' in window) {
      try {
        await this.setupImageCache();
        console.log('[ImagePerf] Image caching initialized');
      } catch (error) {
        console.warn('[ImagePerf] Failed to initialize image caching:', error);
      }
    }
  }

  /**
   * Setup image cache with appropriate strategies
   */
  private static async setupImageCache(): Promise<void> {
    const cache = await caches.open(this.CACHE_NAME);
    
    // Pre-cache critical images
    const criticalImages = this.getCriticalImages();
    if (criticalImages.length > 0) {
      await cache.addAll(criticalImages);
    }
  }

  /**
   * Get list of critical images to pre-cache
   */
  private static getCriticalImages(): string[] {
    // These could be dynamically determined or configured
    return [
      '/src/assets/roots-logo.png',
      '/src/assets/background-community-optimized.webp'
    ];
  }

  /**
   * Prefetch image with intelligent loading
   */
  static prefetchImage(url: string, priority: 'high' | 'low' = 'low'): void {
    // Use different strategies based on connection
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && (
      connection.effectiveType === '2g' || 
      connection.effectiveType === 'slow-2g' ||
      connection.saveData
    );

    if (isSlowConnection && priority === 'low') {
      // Skip prefetching on slow connections for low priority images
      return;
    }

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    link.as = 'image';
    
    if (priority === 'high') {
      link.setAttribute('fetchpriority', 'high');
    }

    document.head.appendChild(link);

    // Clean up after a delay
    setTimeout(() => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
    }, 5000);
  }

  /**
   * Implement blur-up technique for progressive loading
   */
  static createBlurUpEffect(
    container: HTMLElement, 
    lowQualityUrl: string, 
    highQualityUrl: string
  ): Promise<void> {
    return new Promise((resolve) => {
      const lowQualityImg = new Image();
      const highQualityImg = new Image();
      
      // Create blur placeholder
      lowQualityImg.onload = () => {
        lowQualityImg.style.filter = 'blur(10px)';
        lowQualityImg.style.transform = 'scale(1.05)';
        lowQualityImg.style.transition = 'opacity 0.3s ease';
        container.appendChild(lowQualityImg);
        
        // Start loading high quality image
        highQualityImg.src = highQualityUrl;
      };

      // Replace with high quality when ready
      highQualityImg.onload = () => {
        highQualityImg.style.transition = 'opacity 0.3s ease';
        container.appendChild(highQualityImg);
        
        // Fade out low quality image
        setTimeout(() => {
          lowQualityImg.style.opacity = '0';
          setTimeout(() => {
            if (lowQualityImg.parentNode) {
              container.removeChild(lowQualityImg);
            }
            resolve();
          }, 300);
        }, 50);
      };

      lowQualityImg.src = lowQualityUrl;
    });
  }

  /**
   * Optimize image loading based on device capabilities
   */
  static getOptimalImageStrategy(): {
    shouldLazyLoad: boolean;
    preferredFormat: 'webp' | 'avif' | 'jpeg';
    maxConcurrentLoads: number;
  } {
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && (
      connection.effectiveType === '2g' || 
      connection.effectiveType === 'slow-2g'
    );

    // Check device memory if available
    const deviceMemory = (navigator as any).deviceMemory || 4;
    const isLowMemory = deviceMemory < 2;

    return {
      shouldLazyLoad: isSlowConnection || isLowMemory,
      preferredFormat: this.getBestImageFormat(),
      maxConcurrentLoads: isSlowConnection ? 2 : isLowMemory ? 3 : 6
    };
  }

  /**
   * Get best supported image format
   */
  private static getBestImageFormat(): 'webp' | 'avif' | 'jpeg' {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    if (canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0) {
      return 'avif';
    }
    if (canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0) {
      return 'webp';
    }
    return 'jpeg';
  }

  /**
   * Monitor image loading performance
   */
  static measureImageLoadingPerformance(imageUrl: string): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name.includes(imageUrl)) {
            console.log(`[ImagePerf] ${imageUrl} loaded in ${entry.duration}ms`);
            
            // Send to analytics if configured
            if ((window as any).gtag) {
              (window as any).gtag('event', 'image_load_time', {
                custom_parameter_1: imageUrl,
                custom_parameter_2: entry.duration
              });
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
    }
  }

  /**
   * Clean up old cached images
   */
  static async cleanupImageCache(): Promise<void> {
    if (!('caches' in window)) return;

    try {
      const cache = await caches.open(this.CACHE_NAME);
      const requests = await cache.keys();
      const now = Date.now();

      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const dateHeader = response.headers.get('date');
          if (dateHeader) {
            const age = now - new Date(dateHeader).getTime();
            if (age > this.MAX_CACHE_AGE) {
              await cache.delete(request);
            }
          }
        }
      }
    } catch (error) {
      console.warn('[ImagePerf] Cache cleanup failed:', error);
    }
  }
}

// Initialize on module load
if (typeof window !== 'undefined') {
  ImagePerformanceManager.initializeImageCaching();
  
  // Clean up cache periodically
  setInterval(() => {
    ImagePerformanceManager.cleanupImageCache();
  }, 24 * 60 * 60 * 1000); // Daily cleanup
}