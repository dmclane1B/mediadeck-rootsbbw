// Centralized Database Initialization Service
// This ensures only one initialization happens across all components

import { indexedDBManager } from './indexedDBManager';

class DatabaseInitializer {
  private static instance: DatabaseInitializer;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;
  private initializationStarted = false;

  static getInstance(): DatabaseInitializer {
    if (!DatabaseInitializer.instance) {
      DatabaseInitializer.instance = new DatabaseInitializer();
    }
    return DatabaseInitializer.instance;
  }

  async ensureInitialized(): Promise<void> {
    // If already initialized, return immediately
    if (this.isInitialized) {
      console.log('[DatabaseInitializer] Already initialized');
      return;
    }

    // If initialization is in progress, wait for it
    if (this.initializationPromise) {
      console.log('[DatabaseInitializer] Initialization in progress, waiting...');
      return this.initializationPromise;
    }

    // Start initialization
    if (!this.initializationStarted) {
      console.log('[DatabaseInitializer] Starting database initialization...');
      this.initializationStarted = true;

      this.initializationPromise = this.performInitialization();
      
      try {
        await this.initializationPromise;
      } catch (error) {
        // Reset state on failure so we can try again
        this.initializationStarted = false;
        this.initializationPromise = null;
        throw error;
      }
    }

    return this.initializationPromise;
  }

  private async performInitialization(): Promise<void> {
    try {
      console.log('[DatabaseInitializer] Initializing IndexedDB...');
      
      // Initialize the IndexedDB manager
      await indexedDBManager.initialize();
      
      this.isInitialized = true;
      console.log('[DatabaseInitializer] Database initialization completed successfully');
      
    } catch (error) {
      console.error('[DatabaseInitializer] Database initialization failed:', error);
      this.isInitialized = false;
      throw error;
    }
  }

  // Reset initialization state (for testing or error recovery)
  reset(): void {
    console.log('[DatabaseInitializer] Resetting initialization state');
    this.isInitialized = false;
    this.initializationPromise = null;
    this.initializationStarted = false;
  }

  // Check if database is ready
  isReady(): boolean {
    return this.isInitialized;
  }
}

// Export singleton instance
export const databaseInitializer = DatabaseInitializer.getInstance();

// Convenience function for components
export const ensureDatabaseInitialized = () => databaseInitializer.ensureInitialized();