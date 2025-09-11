import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Upload, AlertTriangle } from 'lucide-react';

interface SlideImageStatusProps {
  hasImage: boolean;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

const SlideImageStatus: React.FC<SlideImageStatusProps> = ({ 
  hasImage, 
  isLoading = false, 
  error = null, 
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