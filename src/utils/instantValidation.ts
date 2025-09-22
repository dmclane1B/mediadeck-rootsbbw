import { runFullValidation } from './fullValidationReport';

/**
 * Immediately run validation and log results
 * This function executes validation and provides immediate console feedback
 */
export const runInstantValidation = async () => {
  console.log('🚀 STARTING COMPREHENSIVE VALIDATION...\n');
  
  try {
    const report = await runFullValidation();
    
    // Console output for immediate feedback
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║                    VALIDATION SUMMARY                        ║');
    console.log('╚══════════════════════════════════════════════════════════════╝');
    console.log(`📊 Total Slides: ${report.summary.totalSlides}`);
    console.log(`✅ Healthy: ${report.summary.healthySlides} (${Math.round((report.summary.healthySlides / report.summary.totalSlides) * 100)}%)`);
    console.log(`⚠️  Warnings: ${report.summary.slidesWithWarnings}`);
    console.log(`❌ Errors: ${report.summary.slidesWithErrors}`);
    console.log(`🏥 Overall Health: ${report.summary.overallHealthPercentage}%\n`);
    
    // Detailed results
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║                    DETAILED RESULTS                         ║');
    console.log('╚══════════════════════════════════════════════════════════════╝');
    
    report.slideResults.forEach((slide, index) => {
      const statusIcon = slide.status === 'healthy' ? '✅' : 
                        slide.status === 'warning' ? '⚠️' : '❌';
      
      console.log(`\n${index + 1}. ${statusIcon} ${slide.slideId.toUpperCase()}`);
      console.log(`   📁 File: ${slide.fileName}`);
      console.log(`   🌐 Route: ${slide.route}`);
      console.log(`   📝 Content: ${slide.contentSource}`);
      console.log(`   🎯 Theme: ${slide.themeAlignment}`);
      
      if (slide.issues.length > 0) {
        console.log('   🚨 Issues:');
        slide.issues.forEach(issue => {
          console.log(`      • ${issue}`);
        });
      }
      
      if (slide.contentIssues.length > 0) {
        console.log('   ⚠️  Content Issues:');
        slide.contentIssues.forEach(issue => {
          console.log(`      • ${issue.description}`);
          if (issue.suggestedFix) {
            console.log(`        💡 Fix: ${issue.suggestedFix}`);
          }
        });
      }
      
      if (slide.suggestions.length > 0) {
        console.log('   💡 Suggestions:');
        slide.suggestions.forEach(suggestion => {
          console.log(`      • ${suggestion}`);
        });
      }
    });
    
    // Recommendations
    if (report.recommendations.length > 0) {
      console.log('\n╔══════════════════════════════════════════════════════════════╗');
      console.log('║                    RECOMMENDATIONS                          ║');
      console.log('╚══════════════════════════════════════════════════════════════╝');
      report.recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. ${rec}`);
      });
    }
    
    // Priority actions
    const criticalIssues = report.slideResults.filter(s => s.status === 'error');
    if (criticalIssues.length > 0) {
      console.log('\n╔══════════════════════════════════════════════════════════════╗');
      console.log('║                    PRIORITY ACTIONS                         ║');
      console.log('╚══════════════════════════════════════════════════════════════╝');
      console.log('🚨 IMMEDIATE ACTION REQUIRED:');
      criticalIssues.forEach(slide => {
        console.log(`   • Fix ${slide.slideId} (${slide.fileName})`);
        slide.issues.forEach(issue => {
          console.log(`     - ${issue}`);
        });
      });
    }
    
    console.log('\n🔍 Validation completed successfully!');
    console.log('💡 Visit Media Dashboard > Validation tab for detailed UI view\n');
    
    return report;
    
  } catch (error) {
    console.error('❌ Validation failed:', error);
    throw error;
  }
};

    console.log('🔍 Auto-running validation for immediate feedback...');
    console.log('👀 Check Media Dashboard > Validation tab for detailed UI view');
    console.log('📊 Results will appear below:\n');
    runInstantValidation().catch(console.error);