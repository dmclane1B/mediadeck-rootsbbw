import React, { Suspense, lazy } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load the SlideTemplates component
const SlideTemplates = lazy(() => import('./SlideTemplates'));

interface LazySlideTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

const TemplatesLoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <Skeleton className="h-8 w-64 mx-auto" />
      <Skeleton className="h-4 w-96 mx-auto" />
    </div>
    
    {/* Category filter skeleton */}
    <div className="flex flex-wrap gap-2 justify-center">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-8 w-16" />
      ))}
    </div>
    
    {/* Template grid skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="border rounded-lg p-6 space-y-4">
          <Skeleton className="aspect-video w-full" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  </div>
);

const LazySlideTemplates: React.FC<LazySlideTemplatesProps> = ({ onSelectTemplate }) => (
  <Suspense fallback={<TemplatesLoadingSkeleton />}>
    <SlideTemplates onSelectTemplate={onSelectTemplate} />
  </Suspense>
);

export default LazySlideTemplates;