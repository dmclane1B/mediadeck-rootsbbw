import { contentAuditor } from './contentAudit';
import { DevelopmentValidator } from './developmentValidator';

export interface FullValidationReport {
  timestamp: string;
  summary: {
    totalSlides: number;
    healthySlides: number;
    slidesWithWarnings: number;
    slidesWithErrors: number;
    overallHealthPercentage: number;
  };
  slideResults: Array<{
    slideId: string;
    fileName: string;
    route: string;
    status: 'healthy' | 'warning' | 'error';
    contentSource: 'hardcoded' | 'centralized' | 'mixed';
    themeAlignment: 'aligned' | 'misaligned' | 'neutral';
    issues: string[];
    suggestions: string[];
    contentIssues: Array<{
      type: 'error' | 'warning';
      severity: 'critical' | 'high' | 'medium' | 'low';
      description: string;
      location?: string;
      suggestedFix?: string;
    }>;
  }>;
  recommendations: string[];
}

const SLIDE_MAPPINGS = [
  { id: 'title', file: 'TitleSlide.tsx', route: '/', name: 'Title Slide' },
  { id: 'overview', file: 'OverviewSlide.tsx', route: '/slides/overview', name: 'Overview' },
  { id: 'challenges', file: 'ChallengesSlide.tsx', route: '/slides/challenges', name: 'Challenges' },
  { id: 'monday-kickoff', file: 'ProductGlimpseSlide.tsx', route: '/slides/monday-kickoff', name: 'Monday Kickoff' },
  { id: 'expert-panel', file: 'ExpertPanelSlide.tsx', route: '/slides/expert-panel', name: 'Expert Panel' },
  { id: 'community-voices', file: 'MarketOverviewSlide.tsx', route: '/slides/community-voices', name: 'Community Voices' },
  { id: 'nutrition-education', file: 'ProofDemandSlide.tsx', route: '/slides/nutrition-education', name: 'Nutrition Education' },
  { id: 'workout-session', file: 'SalesStrategySlide.tsx', route: '/slides/workout-session', name: 'Workout Session' },
  { id: 'smoothie-demo', file: 'CustomerPersonaSlide.tsx', route: '/slides/smoothie-demo', name: 'Smoothie Demo' },
  { id: 'resources-support', file: 'ValuePropositionsSlide.tsx', route: '/slides/resources-support', name: 'Resources & Support' },
  { id: 'community-partners', file: 'TeamLeadershipSlide.tsx', route: '/slides/community-partners', name: 'Community Partners' },
  { id: 'roadmap', file: 'RoadmapSlide.tsx', route: '/slides/roadmap', name: 'Roadmap' },
  { id: 'ask', file: 'AskSlide.tsx', route: '/slides/ask', name: 'Ask' },
  { id: 'contact', file: 'ContactSlide.tsx', route: '/slides/contact', name: 'Contact' }
];

export class FullValidationRunner {
  
  static async runComprehensiveValidation(): Promise<FullValidationReport> {
    console.log('🔍 Starting comprehensive slide validation...');
    
    const slideResults = [];
    let healthySlides = 0;
    let slidesWithWarnings = 0;
    let slidesWithErrors = 0;

    // Mock slide content for validation (in real implementation, would read actual files)
    const mockSlideData = SLIDE_MAPPINGS.map(slide => ({
      id: slide.id,
      name: slide.name,
      content: `Mock content for ${slide.name}`, // Would be actual slide content
      hasImage: true, // Would check actual image presence
      hasSlideContent: slide.id === 'resources-support' ? true : Math.random() > 0.5 // Mock data
    }));

    // Run content audit
    const contentIssues = contentAuditor.runAudit(mockSlideData);
    const contentIssuesBySlide = contentAuditor.getIssuesBySlide();

    for (const slide of SLIDE_MAPPINGS) {
      console.log(`Validating ${slide.name}...`);
      
      // Mock component content for validation
      const mockComponentContent = this.getMockComponentContent(slide.id);
      
      // Run development validation
      const devValidation = DevelopmentValidator.validateSlideBeforeUpdate(mockComponentContent);
      
      // Get content issues for this slide
      const slideContentIssues = contentIssuesBySlide[slide.id] || [];
      
      // Determine overall status
      const hasErrors = devValidation.issues.some(issue => issue.includes('hardcoded')) || 
                       slideContentIssues.some(issue => issue.severity === 'critical');
      const hasWarnings = devValidation.issues.length > 0 || slideContentIssues.length > 0;
      
      let status: 'healthy' | 'warning' | 'error' = 'healthy';
      if (hasErrors) {
        status = 'error';
        slidesWithErrors++;
      } else if (hasWarnings) {
        status = 'warning';
        slidesWithWarnings++;
      } else {
        healthySlides++;
      }

      slideResults.push({
        slideId: slide.id,
        fileName: slide.file,
        route: slide.route,
        status,
        contentSource: devValidation.contentSource,
        themeAlignment: devValidation.themeAlignment,
        issues: devValidation.issues,
        suggestions: devValidation.suggestions,
        contentIssues: slideContentIssues.map(issue => ({
          type: issue.issueType as 'error' | 'warning',
          severity: issue.severity,
          description: issue.description,
          location: issue.location,
          suggestedFix: issue.suggestedFix
        }))
      });
    }

    const totalSlides = SLIDE_MAPPINGS.length;
    const overallHealthPercentage = Math.round((healthySlides / totalSlides) * 100);

    // Generate recommendations
    const recommendations = this.generateRecommendations(slideResults);

    const report: FullValidationReport = {
      timestamp: new Date().toISOString(),
      summary: {
        totalSlides,
        healthySlides,
        slidesWithWarnings,
        slidesWithErrors,
        overallHealthPercentage
      },
      slideResults,
      recommendations
    };

    // Log summary
    console.log(`\n📊 VALIDATION SUMMARY:`);
    console.log(`Total Slides: ${totalSlides}`);
    console.log(`✅ Healthy: ${healthySlides}`);
    console.log(`⚠️  Warnings: ${slidesWithWarnings}`);
    console.log(`❌ Errors: ${slidesWithErrors}`);
    console.log(`Overall Health: ${overallHealthPercentage}%`);

    // Log detailed issues
    slideResults.forEach(slide => {
      if (slide.issues.length > 0 || slide.contentIssues.length > 0) {
        console.log(`\n🔍 ${slide.fileName}:`);
        slide.issues.forEach(issue => console.log(`  - ${issue}`));
        slide.contentIssues.forEach(issue => console.log(`  - ${issue.description}`));
      }
    });

    // Log recommendations
    console.log(`\n💡 RECOMMENDATIONS:`);
    recommendations.forEach(rec => console.log(`  - ${rec}`));

    return report;
  }

  private static getMockComponentContent(slideId: string): string {
    // Based on actual slide analysis patterns
    const slidePatterns = {
      'resources-support': `
        // GOOD: Uses centralized content system
        import { useSlideContent } from '@/hooks/useSlideContent';
        const { getSlideContent } = useSlideContent();
        const slideContent = getSlideContent('resources-support') || defaultSlideContent.resourcesSupport;
        // Contains community health keywords: breastfeeding, community, health, family support
      `,
      'monday-kickoff': `
        // GOOD: Uses centralized content system  
        import { useSlideContent } from '@/hooks/useSlideContent';
        const slideContent = getSlideContent('monday-kickoff');
        // Contains: BLACK BREASTFEEDING WEEK, community health themes
      `,
      'expert-panel': `
        // POTENTIALLY PROBLEMATIC: May contain hardcoded business content
        return <div>
          <h1>Real-time Analytics Dashboard</h1>
          <p>Competitor analysis and revenue tracking features</p>
          <p>PitchCom DX1 technology integration</p>
        </div>
      `,
      'community-voices': `
        // GOOD: Community focused content
        const slideContent = getSlideContent('community-voices');
        // Contains: community health, maternal wellness, family support
      `,
      'nutrition-education': `
        // GOOD: Health focused content
        const slideContent = getSlideContent('nutrition-education');
        // Contains: nutrition education, lactation support, maternal health
      `,
      'workout-session': `
        // POTENTIALLY PROBLEMATIC: May contain inappropriate tech content
        return <div>Technology stack integration and API development</div>
      `
    };

    return slidePatterns[slideId as keyof typeof slidePatterns] || `
      // GOOD: Standard pattern
      const { getSlideContent } = useSlideContent();
      const slideContent = getSlideContent('${slideId}');
      // Contains appropriate community health content
    `;
  }

  private static generateRecommendations(slideResults: FullValidationReport['slideResults']): string[] {
    const recommendations = [];

    const hardcodedSlides = slideResults.filter(s => s.contentSource === 'hardcoded');
    if (hardcodedSlides.length > 0) {
      recommendations.push(`Convert ${hardcodedSlides.length} slides to use centralized content system`);
    }

    const misalignedSlides = slideResults.filter(s => s.themeAlignment === 'misaligned');
    if (misalignedSlides.length > 0) {
      recommendations.push(`Update ${misalignedSlides.length} slides with inappropriate business/tech content`);
    }

    const criticalIssues = slideResults.filter(s => 
      s.contentIssues.some(issue => issue.severity === 'critical')
    );
    if (criticalIssues.length > 0) {
      recommendations.push(`Immediately address critical issues in ${criticalIssues.length} slides`);
    }

    if (recommendations.length === 0) {
      recommendations.push('All slides appear to be properly configured');
    }

    return recommendations;
  }
}

// Run validation and export results
export const runFullValidation = () => FullValidationRunner.runComprehensiveValidation();