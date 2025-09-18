import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Image, FileText, AlertTriangle } from 'lucide-react';
import { useSlideImageResolver } from '@/utils/slideImageResolver';
import { useSlideContent } from '@/hooks/useSlideContent';
import { defaultSlideContent } from '@/data/slideContent';

interface SlideHealthCheckProps {
  onFixIssues?: () => void;
}

interface HealthCheckResult {
  slideId: string;
  title: string;
  hasImage: boolean;
  hasContent: boolean;
  issues: string[];
  status: 'healthy' | 'warning' | 'error';
}

export const SlideHealthCheck: React.FC<SlideHealthCheckProps> = ({ onFixIssues }) => {
  const { getSlideImageForDisplay } = useSlideImageResolver();
  const { getSlideContent } = useSlideContent();

  const slideIds = [
    'title', 'overview', 'challenges', 'monday-kickoff', 'expert-panel', 
    'community-voices', 'nutrition-education', 'workout-session', 
    'smoothie-demo', 'resources-support', 'community-partners', 
    'roadmap', 'ask', 'contact'
  ];

  const checkSlideHealth = (slideId: string): HealthCheckResult => {
    const slideImage = getSlideImageForDisplay(slideId);
    const slideContent = getSlideContent(slideId);
    const defaultContent = defaultSlideContent[slideId];
    
    const issues: string[] = [];
    let status: 'healthy' | 'warning' | 'error' = 'healthy';

    // Check for image
    const hasImage = !!slideImage;
    if (!hasImage) {
      issues.push('No image assigned');
      status = 'warning';
    }

    // Check for content
    const hasContent = !!slideContent;
    if (!hasContent) {
      issues.push('No content found');
      status = 'error';
    } else if (!slideContent.title || !slideContent.description) {
      issues.push('Incomplete content');
      status = 'warning';
    }

    // Check if using default vs customized content
    if (slideContent && defaultContent && 
        JSON.stringify(slideContent) === JSON.stringify(defaultContent)) {
      issues.push('Using default content only');
    }

    return {
      slideId,
      title: slideContent?.title || slideId,
      hasImage,
      hasContent,
      issues,
      status: issues.length === 0 ? 'healthy' : status
    };
  };

  const healthResults = slideIds.map(checkSlideHealth);
  const totalSlides = healthResults.length;
  const healthySlides = healthResults.filter(r => r.status === 'healthy').length;
  const warningSlides = healthResults.filter(r => r.status === 'warning').length;
  const errorSlides = healthResults.filter(r => r.status === 'error').length;
  const slidesWithImages = healthResults.filter(r => r.hasImage).length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      healthy: 'default' as const,
      warning: 'secondary' as const,
      error: 'destructive' as const
    };
    return variants[status as keyof typeof variants] || 'secondary';
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <h2 className="text-2xl font-bold text-foreground mb-4 font-space">Slide Health Check</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-1">{healthySlides}</div>
            <div className="text-sm text-muted-foreground">Healthy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-1">{warningSlides}</div>
            <div className="text-sm text-muted-foreground">Warnings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-destructive mb-1">{errorSlides}</div>
            <div className="text-sm text-muted-foreground">Errors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-1">{slidesWithImages}/{totalSlides}</div>
            <div className="text-sm text-muted-foreground">With Images</div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={onFixIssues}
            variant="default"
            className="flex-1"
            disabled={errorSlides === 0 && warningSlides === 0}
          >
            {errorSlides > 0 || warningSlides > 0 ? 'Fix Issues' : 'All Good!'}
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/media'}
          >
            Media Dashboard
          </Button>
        </div>
      </Card>

      {/* Detailed Results */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Slide Details</h3>
        
        <div className="space-y-3">
          {healthResults.map((result) => (
            <div key={result.slideId} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(result.status)}
                <div>
                  <div className="font-medium text-foreground">{result.title}</div>
                  <div className="text-sm text-muted-foreground">ID: {result.slideId}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Image className={`w-4 h-4 ${result.hasImage ? 'text-success' : 'text-muted-foreground'}`} />
                  <FileText className={`w-4 h-4 ${result.hasContent ? 'text-success' : 'text-destructive'}`} />
                </div>
                
                <Badge variant={getStatusBadge(result.status)}>
                  {result.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SlideHealthCheck;