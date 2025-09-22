import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, XCircle, Play, RefreshCw } from 'lucide-react';
import { runFullValidation, FullValidationReport } from '@/utils/fullValidationReport';

interface ValidationRunnerProps {
  autoRun?: boolean;
}

const ValidationRunner: React.FC<ValidationRunnerProps> = ({ autoRun = false }) => {
  const [report, setReport] = useState<FullValidationReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [lastRun, setLastRun] = useState<string | null>(null);

  const runValidation = async () => {
    setIsRunning(true);
    try {
      console.log('🚀 Starting comprehensive validation...');
      const validationReport = await runFullValidation();
      setReport(validationReport);
      setLastRun(new Date().toLocaleTimeString());
      
      // Log to console for development
      console.table(validationReport.slideResults.map(slide => ({
        Slide: slide.slideId,
        Status: slide.status,
        'Content Source': slide.contentSource,
        'Theme Alignment': slide.themeAlignment,
        Issues: slide.issues.length + slide.contentIssues.length
      })));
      
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (autoRun) {
      runValidation();
    }
  }, [autoRun]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy': return <Badge variant="default" className="bg-green-500">Healthy</Badge>;
      case 'warning': return <Badge variant="secondary">Warning</Badge>;
      case 'error': return <Badge variant="destructive">Error</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Content Validation Runner</span>
            <div className="flex items-center gap-2">
              {lastRun && (
                <span className="text-sm text-muted-foreground">
                  Last run: {lastRun}
                </span>
              )}
              <Button
                onClick={runValidation}
                disabled={isRunning}
                size="sm"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Validation
                  </>
                )}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        {report && (
          <CardContent>
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{report.summary.healthySlides}</div>
                <div className="text-sm text-muted-foreground">Healthy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{report.summary.slidesWithWarnings}</div>
                <div className="text-sm text-muted-foreground">Warnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{report.summary.slidesWithErrors}</div>
                <div className="text-sm text-muted-foreground">Errors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{report.summary.overallHealthPercentage}%</div>
                <div className="text-sm text-muted-foreground">Overall Health</div>
              </div>
            </div>

            {/* Recommendations */}
            {report.recommendations.length > 0 && (
              <Alert className="mb-4">
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>
                  <div className="font-semibold mb-2">Recommendations:</div>
                  <ul className="list-disc pl-4 space-y-1">
                    {report.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm">{rec}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        )}
      </Card>

      {/* Detailed Results */}
      {report && (
        <Card>
          <CardHeader>
            <CardTitle>Slide-by-Slide Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {report.slideResults.map((slide) => (
                <div key={slide.slideId} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(slide.status)}
                      <div>
                        <h3 className="font-semibold">{slide.fileName}</h3>
                        <p className="text-sm text-muted-foreground">{slide.route}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(slide.status)}
                      <Badge variant="outline" className="text-xs">
                        {slide.contentSource}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {slide.themeAlignment}
                      </Badge>
                    </div>
                  </div>

                  {/* Issues */}
                  {(slide.issues.length > 0 || slide.contentIssues.length > 0) && (
                    <div className="mt-3 space-y-2">
                      {slide.issues.map((issue, index) => (
                        <div key={`issue-${index}`} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                          {issue}
                        </div>
                      ))}
                      {slide.contentIssues.map((issue, index) => (
                        <div key={`content-${index}`} className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
                          <div className="font-medium">{issue.description}</div>
                          {issue.suggestedFix && (
                            <div className="text-xs mt-1">Fix: {issue.suggestedFix}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggestions */}
                  {slide.suggestions.length > 0 && (
                    <div className="mt-3">
                      <div className="text-sm font-medium mb-1">Suggestions:</div>
                      <ul className="text-sm text-blue-600 space-y-1">
                        {slide.suggestions.map((suggestion, index) => (
                          <li key={index} className="pl-2">• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ValidationRunner;