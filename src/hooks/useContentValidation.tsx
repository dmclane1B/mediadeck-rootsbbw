import { useEffect, useState } from 'react';
import { contentAuditor } from '@/utils/contentAudit';
import { useSlideContent } from './useSlideContent';

export interface ValidationResult {
  slideId: string;
  hasErrors: boolean;
  hasWarnings: boolean;
  issues: Array<{
    type: 'error' | 'warning';
    message: string;
    details?: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
  }>;
}

const BLACKLISTED_KEYWORDS = [
  'PitchCom', 'DX1', 'go route', 'Game Day Signals', 'RF Technology',
  'Military Encryption', 'Bluetooth Limited', 'Baseball Specific',
  'competitor', 'analytics dashboard', 'pitch deck', 'investment',
  'venture capital', 'technology stack', 'API integration', 'Real-time Analytics',
  'predictive analytics', 'machine learning', 'data visualization'
];

const EXPECTED_KEYWORDS = [
  'breastfeeding', 'lactation', 'community', 'health', 'family',
  'support', 'mothers', 'Black Breastfeeding Week', 'wellness',
  'resources', 'care', 'nutrition', 'maternal', 'infant',
  'expert', 'panel', 'consultant', 'healthcare', 'professional',
  'evidence-based', 'workshop', 'education', 'fitness', 'workout'
];

export const useContentValidation = () => {
  const { content } = useSlideContent();
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  const validateSlideContent = (slideId: string, slideContent: any): ValidationResult => {
    const issues: ValidationResult['issues'] = [];
    
    // Convert content to text for analysis
    const textContent = JSON.stringify(slideContent).toLowerCase();
    
    // Check for blacklisted keywords
    BLACKLISTED_KEYWORDS.forEach(keyword => {
      if (textContent.includes(keyword.toLowerCase())) {
        issues.push({
          type: 'error',
          message: `Inappropriate content detected: "${keyword}"`,
          details: 'This content does not match the Black Breastfeeding Week theme',
          severity: 'critical'
        });
      }
    });
    
    // Check for expected keywords
    const hasExpectedContent = EXPECTED_KEYWORDS.some(keyword => 
      textContent.includes(keyword.toLowerCase())
    );
    
    if (!hasExpectedContent) {
      issues.push({
        type: 'warning',
        message: 'Content may not be aligned with community health theme',
        details: 'Consider adding more relevant content about breastfeeding, community health, or family support',
        severity: 'medium'
      });
    }

    return {
      slideId,
      hasErrors: issues.some(issue => issue.type === 'error'),
      hasWarnings: issues.some(issue => issue.type === 'warning'),
      issues
    };
  };

  const runFullValidation = async (): Promise<ValidationResult[]> => {
    setIsValidating(true);
    
    try {
      const results: ValidationResult[] = [];
      
      // Validate each slide's content
      Object.entries(content).forEach(([slideId, slideContent]) => {
        const validation = validateSlideContent(slideId, slideContent);
        results.push(validation);
      });
      
      setValidationResults(results);
      return results;
    } finally {
      setIsValidating(false);
    }
  };

  const getValidationSummary = () => {
    const totalSlides = validationResults.length;
    const slidesWithErrors = validationResults.filter(r => r.hasErrors).length;
    const slidesWithWarnings = validationResults.filter(r => r.hasWarnings).length;
    const healthySlides = totalSlides - slidesWithErrors - slidesWithWarnings;

    return {
      totalSlides,
      healthySlides,
      slidesWithWarnings,
      slidesWithErrors,
      overallHealth: totalSlides > 0 ? Math.round((healthySlides / totalSlides) * 100) : 100
    };
  };

  // Auto-validate when content changes
  useEffect(() => {
    if (Object.keys(content).length > 0) {
      runFullValidation();
    }
  }, [content]);

  return {
    validationResults,
    isValidating,
    runFullValidation,
    validateSlideContent,
    getValidationSummary
  };
};