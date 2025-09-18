import { indexedDBManager } from './indexedDBManager';

// Mapping from old slide IDs to new slide IDs
export const SLIDE_ID_MIGRATION_MAP: Record<string, string> = {
  'product-glimpse': 'monday-kickoff',
  'market-overview': 'community-voices',
  'proof-demand': 'nutrition-education',
  'sales-strategy': 'workout-session',
  'customer-persona': 'smoothie-demo',
  'value-propositions': 'resources-support',
  'team-leadership': 'community-partners',
  // Keep existing mappings for slides that didn't change
  'title': 'title',
  'overview': 'overview',
  'challenges': 'challenges',
  'roadmap': 'roadmap',
  'ask': 'ask',
  'contact': 'contact'
};

/**
 * Migrates slide configurations from old slide IDs to new slide IDs
 * This handles the transition from business presentation slides to Black Breastfeeding Week slides
 */
export async function migrateSlideIds(): Promise<{ migrated: number; errors: string[] }> {
  const result = { migrated: 0, errors: [] };
  
  try {
    // Initialize IndexedDB first
    await indexedDBManager.initialize();
    
    // Get all existing slide configurations
    const allConfigs = await indexedDBManager.getAllSlideConfigurations();
    
    for (const config of allConfigs) {
      const { slideId, imageId, imageAlt, lastUpdated } = config;
      
      // Check if this slide ID needs migration
      if (SLIDE_ID_MIGRATION_MAP[slideId] && SLIDE_ID_MIGRATION_MAP[slideId] !== slideId) {
        const newSlideId = SLIDE_ID_MIGRATION_MAP[slideId];
        
        try {
          // Check if the new slide ID already has a configuration
          const existingNewConfig = await indexedDBManager.getSlideConfiguration(newSlideId);
          
          if (!existingNewConfig) {
            // Create new configuration with the new slide ID
            await indexedDBManager.setSlideConfiguration({
              slideId: newSlideId,
              imageId,
              imageAlt,
              lastUpdated: lastUpdated || new Date().toISOString()
            });
            
            // Remove the old configuration
            await indexedDBManager.removeSlideConfiguration(slideId);
            
            result.migrated++;
            console.log(`Migrated slide configuration: ${slideId} → ${newSlideId}`);
          } else {
            // New slide ID already exists, just remove the old one
            await indexedDBManager.removeSlideConfiguration(slideId);
            console.log(`Removed duplicate old configuration: ${slideId} (${newSlideId} already exists)`);
          }
        } catch (error) {
          const errorMsg = `Failed to migrate ${slideId} to ${newSlideId}: ${error instanceof Error ? error.message : 'Unknown error'}`;
          result.errors.push(errorMsg);
          console.error(errorMsg);
        }
      }
    }
    
    console.log(`Migration complete: ${result.migrated} slides migrated, ${result.errors.length} errors`);
    return result;
  } catch (error) {
    const errorMsg = `Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
    result.errors.push(errorMsg);
    console.error(errorMsg);
    return result;
  }
}

/**
 * Check if migration is needed by looking for any old slide IDs in the database
 */
export async function isMigrationNeeded(): Promise<boolean> {
  try {
    await indexedDBManager.initialize();
    const allConfigs = await indexedDBManager.getAllSlideConfigurations();
    
    // Check if any old slide IDs exist that need migration
    return allConfigs.some(config => 
      SLIDE_ID_MIGRATION_MAP[config.slideId] && 
      SLIDE_ID_MIGRATION_MAP[config.slideId] !== config.slideId
    );
  } catch (error) {
    console.error('Error checking if migration is needed:', error);
    return false;
  }
}
