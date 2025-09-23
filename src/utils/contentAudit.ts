// Content Audit Utility for Black Breastfeeding Week Slide Deck
// This utility helps identify inappropriate content that doesn't match the community health theme

export interface ContentIssue {
  slideId: string;
  slideName: string;
  issueType: 'hardcoded' | 'theme-mismatch' | 'missing-content';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  location?: string;
  suggestedFix?: string;
}

// Content that should NOT appear in Black Breastfeeding Week slides
const INAPPROPRIATE_KEYWORDS = [
  // Business/Tech terms that don't belong in community health context
  'PitchCom', 'DX1', 'go route', 'Game Day Signals', 'RF Technology',
  'Military Encryption', 'Bluetooth Limited', 'Baseball Specific',
  'competitor analysis', 'analytics dashboard', 'pitch deck', 'investment',
  'venture capital', 'market share', 'disruption', 'scalability',
  
  // Sports-specific terms that don't belong
  'quarterback', 'baseball', 'football', 'game day', 'pitch signals',
  'coaching staff', 'team roster', 'season stats', 'playoffs',
  
  // Generic business terms that are inappropriate for community health
  'B2B', 'SaaS', 'enterprise', 'monetization', 'conversion rate',
  'customer acquisition', 'churn rate', 'KPIs', 'ROI', 'profit margin'
];

// Content that SHOULD appear in community health slides
const APPROPRIATE_KEYWORDS = [
  'breastfeeding', 'lactation', 'community', 'health', 'family',
  'support', 'mothers', 'Black Breastfeeding Week', 'wellness',
  'resources', 'care', 'nutrition', 'postpartum', 'infant',
  'maternal', 'doula', 'midwife', 'healthcare', 'counseling',
  'peer support', 'education', 'workshop', 'cultural', 'equity'
];

export class ContentAuditor {
  private issues: ContentIssue[] = [];

  // Audit text content for inappropriate keywords
  auditTextContent(slideId: string, slideName: string, content: string): ContentIssue[] {
    const foundIssues: ContentIssue[] = [];
    const lowerContent = content.toLowerCase();

    // Check for inappropriate keywords
    INAPPROPRIATE_KEYWORDS.forEach(keyword => {
      if (lowerContent.includes(keyword.toLowerCase())) {
        foundIssues.push({
          slideId,
          slideName,
          issueType: 'theme-mismatch',
          severity: 'critical',
          description: `Found inappropriate content: "${keyword}"`,
          location: `Text content contains "${keyword}"`,
          suggestedFix: `Remove "${keyword}" and replace with community health content`
        });
      }
    });

    // Check if content has appropriate community health theme
    const hasAppropriateContent = APPROPRIATE_KEYWORDS.some(keyword => 
      lowerContent.includes(keyword.toLowerCase())
    );

    if (!hasAppropriateContent && content.trim().length > 50) {
      foundIssues.push({
        slideId,
        slideName,
        issueType: 'theme-mismatch',
        severity: 'medium',
        description: 'Content may not align with Black Breastfeeding Week theme',
        suggestedFix: 'Add relevant community health, breastfeeding, or family support content'
      });
    }

    return foundIssues;
  }

  // Audit slide for hardcoded content vs using slideContent.ts
  auditSlideStructure(slideId: string, slideName: string, hasSlideContent: boolean): ContentIssue[] {
    const foundIssues: ContentIssue[] = [];

    if (!hasSlideContent) {
      foundIssues.push({
        slideId,
        slideName,
        issueType: 'hardcoded',
        severity: 'high',
        description: 'Slide uses hardcoded content instead of slideContent.ts',
        suggestedFix: 'Migrate content to slideContent.ts and use useSlideContent hook'
      });
    }

    return foundIssues;
  }

  // Check if slide has appropriate image
  auditSlideImage(slideId: string, slideName: string, hasImage: boolean, imageAlt?: string): ContentIssue[] {
    const foundIssues: ContentIssue[] = [];

    if (!hasImage) {
      foundIssues.push({
        slideId,
        slideName,
        issueType: 'missing-content',
        severity: 'medium',
        description: 'Slide missing image',
        suggestedFix: 'Add appropriate community health or Black Breastfeeding Week image'
      });
    } else if (imageAlt) {
      // Check if image alt text is appropriate
      const issues = this.auditTextContent(slideId, slideName, imageAlt);
      foundIssues.push(...issues.map(issue => ({
        ...issue,
        location: 'Image alt text',
        description: `Image alt text issue: ${issue.description}`
      })));
    }

    return foundIssues;
  }

  // Run comprehensive audit
  runAudit(slides: Array<{ id: string; name: string; content?: string; hasImage?: boolean; imageAlt?: string; hasSlideContent?: boolean }>): ContentIssue[] {
    this.issues = [];

    slides.forEach(slide => {
      // Audit text content
      if (slide.content) {
        this.issues.push(...this.auditTextContent(slide.id, slide.name, slide.content));
      }

      // Audit slide structure
      this.issues.push(...this.auditSlideStructure(slide.id, slide.name, slide.hasSlideContent || false));

      // Audit slide image
      this.issues.push(...this.auditSlideImage(slide.id, slide.name, slide.hasImage || false, slide.imageAlt));
    });

    return this.issues;
  }

  // Get summary of issues by severity
  getIssueSummary(): { critical: number; high: number; medium: number; low: number; total: number } {
    return {
      critical: this.issues.filter(i => i.severity === 'critical').length,
      high: this.issues.filter(i => i.severity === 'high').length,
      medium: this.issues.filter(i => i.severity === 'medium').length,
      low: this.issues.filter(i => i.severity === 'low').length,
      total: this.issues.length
    };
  }

  // Get issues by slide
  getIssuesBySlide(): Record<string, ContentIssue[]> {
    return this.issues.reduce((acc, issue) => {
      if (!acc[issue.slideId]) {
        acc[issue.slideId] = [];
      }
      acc[issue.slideId].push(issue);
      return acc;
    }, {} as Record<string, ContentIssue[]>);
  }

  // Generate report
  generateReport(): string {
    const summary = this.getIssueSummary();
    const issuesBySlide = this.getIssuesBySlide();
    
    let report = `# Content Audit Report - Black Breastfeeding Week Slide Deck\n\n`;
    report += `## Summary\n`;
    report += `- **Total Issues**: ${summary.total}\n`;
    report += `- **Critical**: ${summary.critical}\n`;
    report += `- **High**: ${summary.high}\n`;
    report += `- **Medium**: ${summary.medium}\n`;
    report += `- **Low**: ${summary.low}\n\n`;

    if (summary.total === 0) {
      report += `✅ **All slides are properly aligned with the Black Breastfeeding Week theme!**\n\n`;
      return report;
    }

    report += `## Issues by Slide\n\n`;
    
    Object.entries(issuesBySlide).forEach(([slideId, issues]) => {
      const slideName = issues[0]?.slideName || slideId;
      report += `### ${slideName} (${slideId})\n`;
      
      issues.forEach((issue, index) => {
        const severityEmoji = {
          critical: '🔴',
          high: '🟠', 
          medium: '🟡',
          low: '🔵'
        }[issue.severity];
        
        report += `${index + 1}. ${severityEmoji} **${issue.severity.toUpperCase()}**: ${issue.description}\n`;
        if (issue.location) report += `   - Location: ${issue.location}\n`;
        if (issue.suggestedFix) report += `   - Suggested Fix: ${issue.suggestedFix}\n`;
        report += '\n';
      });
    });

    return report;
  }
}

// Export singleton instance
export const contentAuditor = new ContentAuditor();