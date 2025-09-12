import React, { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Skeleton } from '@/components/ui/skeleton';

interface LazySlideWrapperProps {
  children: React.ReactNode;
}

const SlideLoadingSkeleton = () => (
  <div className="min-h-screen bg-background flex flex-col">
    {/* Header skeleton */}
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
    </div>
    
    {/* Main content skeleton */}
    <div className="flex-1 p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-64 w-full" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
    
    {/* Navigation skeleton */}
    <div className="p-6 flex justify-between">
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-20" />
    </div>
  </div>
);

const LazySlideWrapper: React.FC<LazySlideWrapperProps> = ({ children }) => (
  <Suspense fallback={<SlideLoadingSkeleton />}>
    {children}
  </Suspense>
);

export default LazySlideWrapper;