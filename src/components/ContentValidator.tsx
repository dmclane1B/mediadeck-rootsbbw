import React, { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

interface ContentValidatorProps {
  children: React.ReactNode;
}

interface ValidationIssue {
  type: 'error' | 'warning';
  message: string;
  details?: string;
}

// Keywords that should NOT appear in Black Breastfeeding Week content
const BLACKLISTED_KEYWORDS = [
  'PitchCom', 'DX1', 'go route', 'Game Day Signals', 'RF Technology',
  'Military Encryption', 'Bluetooth Limited', 'Baseball Specific',
  'competitor', 'analytics dashboard', 'revenue', 'encryption',
  'technology stack', 'API integration'
];

// Keywords that SHOULD appear in community health content  
const EXPECTED_KEYWORDS = [
  'breastfeeding', 'lactation', 'community', 'health', 'family',
  'support', 'mothers', 'Black Breastfeeding Week', 'wellness',
  'resources', 'care'
];

const ContentValidator: React.FC<ContentValidatorProps> = ({ children }) => {
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const validateContent = () => {
      setIsValidating(true);
      const foundIssues: ValidationIssue[] = [];
      
      // Get all text content from the component tree
      const textContent = document.body.innerText.toLowerCase();
      
      // Check for blacklisted keywords
      BLACKLISTED_KEYWORDS.forEach(keyword => {
        if (textContent.includes(keyword.toLowerCase())) {
          foundIssues.push({
            type: 'error',
            message: `Inappropriate content detected: "${keyword}"`,
            details: 'This content does not match the Black Breastfeeding Week theme'
          });
        }
      });
      
      // Check for missing expected keywords (warning only)
      const hasExpectedContent = EXPECTED_KEYWORDS.some(keyword => 
        textContent.includes(keyword.toLowerCase())
      );
      
      if (!hasExpectedContent) {
        foundIssues.push({
          type: 'warning',
          message: 'Content may not be aligned with community health theme',
          details: 'Consider adding more relevant content about breastfeeding, community health, or family support'
        });
      }
      
      setIssues(foundIssues);
      setIsValidating(false);
    };

    // Run validation after component mounts and content loads
    const timer = setTimeout(validateContent, 1000);
    return () => clearTimeout(timer);
  }, [children]);

  // Run validation silently for development use
  return <>{children}</>;
};

export default ContentValidator;