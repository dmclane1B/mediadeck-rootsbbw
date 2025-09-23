/**
 * Development-only content validation utilities
 * These tools are designed for AI assistant use during development
 */

interface SlideValidation {
  slideId: string;
  contentSource: 'hardcoded' | 'centralized' | 'mixed';
  themeAlignment: 'aligned' | 'misaligned' | 'neutral';
  issues: string[];
  suggestions: string[];
}

const BUSINESS_KEYWORDS = [
  'revenue', 'profit', 'B2B', 'SaaS', 'ROI', 'KPI', 'conversion rate',
  'customer acquisition', 'venture capital', 'pitch deck', 'investment',
  'market share', 'disruption', 'scalability', 'monetization', 'PitchCom', 
  'DX1', 'RF Technology', 'Military Encryption', 'Baseball', 'go route', 
  'Game Day Signals'
];

const COMMUNITY_HEALTH_KEYWORDS = [
  'breastfeeding', 'lactation', 'community', 'health', 'maternal',
  'family', 'support', 'wellness', 'nutrition', 'care', 'mothers',
  'Black Breastfeeding Week', 'infant', 'resources', 'consultant',
  'healthcare', 'professional', 'expert', 'panel', 'education',
  'workshop', 'fitness', 'workout', 'evidence-based'
];

export class DevelopmentValidator {
  
  /**
   * Validates slide content before making updates
   */
  static validateSlideBeforeUpdate(slideComponent: string): SlideValidation {
    const issues: string[] = [];
    const suggestions: string[] = [];
    
    // Check for hardcoded content
    const hasHardcodedContent = this.detectHardcodedContent(slideComponent);
    const usesSlideContent = slideComponent.includes('useSlideContent') || 
                            slideComponent.includes('slideContent.');
    
    let contentSource: SlideValidation['contentSource'] = 'centralized';
    if (hasHardcodedContent && !usesSlideContent) {
      contentSource = 'hardcoded';
      issues.push('Component uses hardcoded content instead of slideContent.ts');
      suggestions.push('Replace hardcoded content with useSlideContent hook');
    } else if (hasHardcodedContent && usesSlideContent) {
      contentSource = 'mixed';
      issues.push('Component mixes hardcoded content with centralized content');
      suggestions.push('Remove all hardcoded content and use only slideContent.ts');
    }
    
    // Check theme alignment with improved logic
    const businessKeywordCount = BUSINESS_KEYWORDS.filter(keyword =>
      slideComponent.toLowerCase().includes(keyword.toLowerCase())
    ).length;
    
    const communityKeywordCount = COMMUNITY_HEALTH_KEYWORDS.filter(keyword =>
      slideComponent.toLowerCase().includes(keyword.toLowerCase())  
    ).length;
    
    let themeAlignment: SlideValidation['themeAlignment'] = 'neutral';
    
    // Only flag as misaligned if there are business keywords AND no community health content
    if (businessKeywordCount > 0 && communityKeywordCount === 0) {
      themeAlignment = 'misaligned';
      issues.push(`Contains ${businessKeywordCount} business/tech keywords inappropriate for community health theme`);
      suggestions.push('Replace business content with community health focused content');
    } else if (communityKeywordCount > 2) {
      themeAlignment = 'aligned';
    } else if (communityKeywordCount > 0) {
      themeAlignment = 'aligned'; // Any community health content should be considered aligned
    }
    
    return {
      slideId: this.extractSlideId(slideComponent),
      contentSource,
      themeAlignment,
      issues,
      suggestions
    };
  }
  
  /**
   * Provides content recommendations based on slide theme
   */
  static generateContentSuggestions(slideId: string, currentTheme?: string): string[] {
    const suggestions: string[] = [];
    
    const communityHealthContent = {
      'title-slide': [
        'Welcome to Black Breastfeeding Week',
        'Celebrating Community Health and Support',
        'Empowering Families Through Wellness'
      ],
      'overview-slide': [
        'Community health initiatives',
        'Family support services',
        'Maternal and infant wellness programs'
      ],
      'resources-support': [
        'Lactation support services',
        'Community health resources',
        'Family wellness programs',
        'Nutrition counseling and education'
      ],
      'challenges': [
        'Addressing health disparities',
        'Building supportive communities',
        'Improving access to care'
      ]
    };
    
    if (communityHealthContent[slideId as keyof typeof communityHealthContent]) {
      suggestions.push(...communityHealthContent[slideId as keyof typeof communityHealthContent]);
    }
    
    return suggestions;
  }
  
  /**
   * Analyzes entire codebase for content consistency issues
   */
  static async auditAllSlides(slideFiles: Record<string, string>): Promise<SlideValidation[]> {
    const results: SlideValidation[] = [];
    
    Object.entries(slideFiles).forEach(([filename, content]) => {
      const validation = this.validateSlideBeforeUpdate(content);
      validation.slideId = filename.replace('.tsx', '');
      results.push(validation);
    });
    
    return results;
  }
  
  private static detectHardcodedContent(component: string): boolean {
    // More accurate detection - only flag if content is truly hardcoded AND not using slideContent
    const usesSlideContent = component.includes('useSlideContent') || 
                            component.includes('slideContent?.') ||
                            component.includes('getSlideContent');
    
    if (usesSlideContent) {
      return false; // If using slideContent system, not hardcoded
    }
    
    // Look for patterns that indicate hardcoded content
    const hardcodedPatterns = [
      /className="[^"]*">\s*[A-Z][^<]{30,}/g, // Long hardcoded text in elements
      /\b[A-Z][A-Z\s]{15,}\b.*(?!slideContent)/g, // Long all-caps text without slideContent
    ];
    
    let hardcodedCount = 0;
    hardcodedPatterns.forEach(pattern => {
      const matches = component.match(pattern);
      if (matches) hardcodedCount += matches.length;
    });
    
    return hardcodedCount > 1; // Only flag if multiple hardcoded patterns found
  }
  
  private static extractSlideId(component: string): string {
    const match = component.match(/function\s+(\w+)/);
    return match ? match[1].replace('Slide', '').toLowerCase() : 'unknown';
  }
}

/**
 * Pre-update validation checklist for AI assistant
 */
export const PRE_UPDATE_CHECKLIST = {
  beforeSlideUpdate: [
    'Run DevelopmentValidator.validateSlideBeforeUpdate()',
    'Check for hardcoded content vs slideContent.ts usage',
    'Verify theme alignment with community health focus',
    'Ensure no business/tech keywords remain',
    'Validate image-content alignment'
  ],
  
  afterSlideUpdate: [
    'Verify slideContent.ts has appropriate content',
    'Check that component uses useSlideContent hook',
    'Ensure no hardcoded strings remain',
    'Validate theme consistency',
    'Test content displays correctly'
  ]
};