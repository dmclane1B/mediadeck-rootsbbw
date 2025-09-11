import React, { useState, useRef, useEffect } from 'react';
import { CDNImageOptimizer, ImageTransformOptions } from '@/utils/cdnOptimization';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  cloudPath?: string;
  src?: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: React.ReactNode;
  fallbackToPlaceholder?: boolean;
  lazy?: boolean;
  priority?: boolean;
  size?: 'thumbnail' | 'medium' | 'large' | 'original';
  customTransform?: ImageTransformOptions;
  enableBlurPlaceholder?: boolean;
}

const OptimizedImage = ({ 
  cloudPath,
  src,
  alt, 
  className = '', 
  onLoad, 
  onError,
  placeholder,
  fallbackToPlaceholder = false,
  lazy = true,
  priority = false,
  size = 'medium',
  customTransform,
  enableBlurPlaceholder = true
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const [showBlur, setShowBlur] = useState(enableBlurPlaceholder);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Preload critical images
  useEffect(() => {
    if (priority && cloudPath) {
      CDNImageOptimizer.preloadImage(cloudPath, 'high');
    }
  }, [priority, cloudPath]);

  const handleLoad = () => {
    setIsLoading(false);
    setShowBlur(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Generate optimized image URLs
  const getImageSrc = () => {
    if (src) return src;
    if (!cloudPath) return '';
    
    if (customTransform) {
      return CDNImageOptimizer.getOptimizedUrl(cloudPath, customTransform);
    }
    
    // Use predefined size configurations
    const sizeMap = {
      thumbnail: { width: 300, height: 300, quality: 80 },
      medium: { width: 800, height: 600, quality: 85 },
      large: { width: 1200, height: 900, quality: 90 },
      original: { quality: 95 }
    };
    
    return CDNImageOptimizer.getOptimizedUrl(cloudPath, {
      ...sizeMap[size]
    });
  };

  const getResponsiveProps = () => {
    if (!cloudPath) return {};
    
    const responsive = CDNImageOptimizer.generateSrcSet(cloudPath);
    return {
      srcSet: responsive.srcSet,
      sizes: responsive.sizes
    };
  };

  const getBlurPlaceholderSrc = () => {
    if (!cloudPath || !enableBlurPlaceholder) return '';
    return CDNImageOptimizer.getBlurPlaceholder(cloudPath);
  };

  // Don't render anything if not in view and lazy loading
  if (!isInView) {
    return (
      <div ref={containerRef} className={cn('relative', className)}>
        {placeholder || <Skeleton className="w-full h-full" />}
      </div>
    );
  }

  // Handle error state
  if (hasError) {
    if (fallbackToPlaceholder) {
      return (
        <div className={cn('relative', className)}>
          {placeholder || <Skeleton className="w-full h-full" />}
        </div>
      );
    }
    return (
      <div className={cn('bg-muted flex items-center justify-center text-muted-foreground', className)}>
        <div className="text-center">
          <div className="text-2xl mb-2">📷</div>
          <p className="text-sm">Failed to load image</p>
        </div>
      </div>
    );
  }

  const imageSrc = getImageSrc();
  const blurSrc = getBlurPlaceholderSrc();

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
      {/* Blur placeholder */}
      {showBlur && blurSrc && (
        <img
          src={blurSrc}
          alt=""
          className={cn(
            'absolute inset-0 w-full h-full object-cover filter blur-sm scale-105 transition-opacity duration-300',
            isLoading ? 'opacity-100' : 'opacity-0'
          )}
          aria-hidden="true"
        />
      )}
      
      {/* Loading skeleton */}
      {isLoading && !showBlur && (
        <div className="absolute inset-0">
          {placeholder || <Skeleton className="w-full h-full" />}
        </div>
      )}
      
      {/* Main image */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        {...(cloudPath ? getResponsiveProps() : {})}
      />
    </div>
  );
};

export default OptimizedImage;