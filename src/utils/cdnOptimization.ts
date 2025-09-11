import { supabase } from '@/integrations/supabase/client';

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'origin';
  resize?: 'cover' | 'contain' | 'fill';
}

export interface ResponsiveImageSizes {
  thumbnail: ImageTransformOptions;
  medium: ImageTransformOptions;
  large: ImageTransformOptions;
  original?: ImageTransformOptions;
}

export const RESPONSIVE_SIZES: ResponsiveImageSizes = {
  thumbnail: { width: 300, height: 300, quality: 80, resize: 'cover' },
  medium: { width: 800, height: 600, quality: 85, resize: 'contain' },
  large: { width: 1200, height: 900, quality: 90, resize: 'contain' },
  original: { quality: 95 }
};

export class CDNImageOptimizer {
  private static readonly BUCKET_NAME = 'media';

  /**
   * Check if the browser supports WebP
   */
  static supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  /**
   * Check if the browser supports AVIF
   */
  static supportsAVIF(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  }

  /**
   * Get the best supported format for the browser
   */
  static getBestFormat(): 'webp' | 'jpeg' {
    if (this.supportsWebP()) return 'webp';
    return 'jpeg';
  }

  /**
   * Generate optimized image URL with Supabase transformations
   */
  static getOptimizedUrl(
    cloudPath: string, 
    options: ImageTransformOptions = {}
  ): string {
    try {      
      const { data } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(cloudPath, {
          transform: {
            width: options.width,
            height: options.height,
            quality: options.quality || 85,
            resize: options.resize || 'contain'
          }
        });

      return data.publicUrl;
    } catch (error) {
      console.error('[CDN] Failed to generate optimized URL:', error);
      // Fallback to regular public URL
      const { data } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(cloudPath);
      return data.publicUrl;
    }
  }

  /**
   * Generate responsive srcSet for different screen sizes
   */
  static generateSrcSet(cloudPath: string): {
    srcSet: string;
    sizes: string;
    defaultSrc: string;
  } {
    const srcSetEntries = [
      `${this.getOptimizedUrl(cloudPath, RESPONSIVE_SIZES.thumbnail)} 300w`,
      `${this.getOptimizedUrl(cloudPath, RESPONSIVE_SIZES.medium)} 800w`,
      `${this.getOptimizedUrl(cloudPath, RESPONSIVE_SIZES.large)} 1200w`,
    ];

    return {
      srcSet: srcSetEntries.join(', '),
      sizes: '(max-width: 300px) 300px, (max-width: 800px) 800px, 1200px',
      defaultSrc: this.getOptimizedUrl(cloudPath, RESPONSIVE_SIZES.medium)
    };
  }

  /**
   * Preload critical images
   */
  static preloadImage(cloudPath: string, priority: 'high' | 'low' = 'low'): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = this.getOptimizedUrl(cloudPath, RESPONSIVE_SIZES.medium);
    link.fetchPriority = priority;
    document.head.appendChild(link);
  }

  /**
   * Create blur placeholder for progressive loading
   */
  static getBlurPlaceholder(cloudPath: string): string {
    return this.getOptimizedUrl(cloudPath, {
      width: 20,
      height: 20,
      quality: 10
    });
  }

  /**
   * Generate multiple variants for upload
   */
  static generateImageVariants(originalFile: File): Promise<{
    original: File;
    webp?: Blob;
    thumbnail: Blob;
  }> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        try {
          const variants: any = { original: originalFile };

          // Create thumbnail
          const thumbSize = 300;
          const scale = Math.min(thumbSize / img.width, thumbSize / img.height);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Generate thumbnail
          canvas.toBlob((blob) => {
            if (blob) variants.thumbnail = blob;
            
            // Generate WebP if supported
            if (this.supportsWebP()) {
              canvas.toBlob((webpBlob) => {
                if (webpBlob) variants.webp = webpBlob;
                resolve(variants);
              }, 'image/webp', 0.8);
            } else {
              resolve(variants);
            }
          }, 'image/jpeg', 0.8);

        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image for variant generation'));
      img.src = URL.createObjectURL(originalFile);
    });
  }
}

/**
 * Enhanced cache configuration for better performance
 */
export const CACHE_CONFIG = {
  images: {
    maxAge: '1y',
    staleWhileRevalidate: '1d',
    immutable: true
  },
  thumbnails: {
    maxAge: '30d',
    staleWhileRevalidate: '7d'
  }
};