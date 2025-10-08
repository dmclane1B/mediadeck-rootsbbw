import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Upload, AlertTriangle, Cloud, HardDrive } from 'lucide-react';

interface SlideImageStatusProps {
  hasImage: boolean;
  isLoading?: boolean;
  error?: string | null;
  isPublished?: boolean;
  source?: 'published' | 'local';
  className?: string;
}

const SlideImageStatus: React.FC<SlideImageStatusProps> = ({ 
  hasImage, 
  isLoading = false, 
  error = null,
  isPublished = false,
  source,
  className = "" 
}) => {
  if (isLoading) {
    return (
      <Badge variant="secondary" className={`animate-pulse ${className}`}>
        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-ping mr-2" />
        Loading...
      </Badge>
    );
  }

  if (error) {
    return (
      <Badge variant="destructive" className={className}>
        <AlertTriangle className="w-3 h-3 mr-1" />
        Error
      </Badge>
    );
  }

  if (hasImage) {
    if (isPublished || source === 'published') {
      return (
        <Badge variant="default" className={`bg-blue-100 text-blue-800 hover:bg-blue-200 ${className}`}>
          <Cloud className="w-3 h-3 mr-1" />
          Published
        </Badge>
      );
    }
    
    if (source === 'local') {
      return (
        <Badge variant="default" className={`bg-purple-100 text-purple-800 hover:bg-purple-200 ${className}`}>
          <HardDrive className="w-3 h-3 mr-1" />
          Local Only
        </Badge>
      );
    }
    
    return (
      <Badge variant="default" className={`bg-green-100 text-green-800 hover:bg-green-200 ${className}`}>
        <Check className="w-3 h-3 mr-1" />
        Image Set
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={`text-muted-foreground ${className}`}>
      <Upload className="w-3 h-3 mr-1" />
      No Image
    </Badge>
  );
};

export default SlideImageStatus;