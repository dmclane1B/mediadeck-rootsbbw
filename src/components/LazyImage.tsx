import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ImagePerformanceManager } from '@/utils/imagePerformance';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: React.ReactNode;
  fallbackToPlaceholder?: boolean;
}

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  onLoad, 
  onError,
  placeholder,
  fallbackToPlaceholder = false 
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
          
          // Measure performance
          ImagePerformanceManager.measureImageLoadingPerformance(src);
        }
      },
      { threshold: 0.1, rootMargin: '50px' } // Added root margin for better UX
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (!isInView) {
    return (
      <div ref={imgRef} className={className}>
        {placeholder || <Skeleton className="w-full h-full" />}
      </div>
    );
  }

  if (hasError) {
    if (fallbackToPlaceholder) {
      return (
        <div className={className}>
          {placeholder || <Skeleton className="w-full h-full" />}
        </div>
      );
    }
    return (
      <div className={`${className} bg-muted flex items-center justify-center`}>
        <div className="text-center text-muted-foreground">
          <div className="text-2xl mb-2">📷</div>
          <p className="text-sm">Failed to load image</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0">
          {placeholder || <Skeleton className="w-full h-full" />}
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </div>
  );
};

export default LazyImage;