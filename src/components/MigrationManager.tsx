import React, { useEffect, useState } from 'react';
import { migrateSlideIds, isMigrationNeeded } from '@/utils/slideIdMigration';

interface MigrationManagerProps {
  children: React.ReactNode;
}

export const MigrationManager: React.FC<MigrationManagerProps> = ({ children }) => {
  const [migrationComplete, setMigrationComplete] = useState(false);

  useEffect(() => {
    const runMigration = async () => {
      try {
        // Check if migration is needed
        const needsMigration = await isMigrationNeeded();
        
        if (needsMigration) {
          console.log('🔄 Starting slide ID migration...');
          const result = await migrateSlideIds();
          
          if (result.migrated > 0) {
            console.log(`✅ Successfully migrated ${result.migrated} slide configurations`);
          }
          
          if (result.errors.length > 0) {
            console.warn('⚠️ Migration completed with errors:', result.errors);
          }
        } else {
          console.log('✅ No migration needed');
        }
      } catch (error) {
        console.error('❌ Migration failed:', error);
      } finally {
        setMigrationComplete(true);
      }
    };

    runMigration();
  }, []);

  // Always render children, migration runs in background
  return <>{children}</>;
};

export default MigrationManager;