// Detect if IndexedDB is available and working
export async function detectIndexedDBAvailability(): Promise<{
  available: boolean;
  reason?: string;
}> {
  try {
    // Check if IndexedDB exists
    if (!window.indexedDB) {
      return { available: false, reason: 'IndexedDB not supported' };
    }

    // Try to open a test database
    const testDbName = '_storage_test_' + Date.now();
    const testRequest = indexedDB.open(testDbName, 1);

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve({ available: false, reason: 'IndexedDB timeout' });
      }, 3000);

      testRequest.onerror = () => {
        clearTimeout(timeout);
        const error = testRequest.error;
        if (error?.name === 'QuotaExceededError') {
          resolve({ available: false, reason: 'Storage quota exceeded' });
        } else {
          resolve({ available: false, reason: error?.message || 'Unknown error' });
        }
      };

      testRequest.onsuccess = () => {
        clearTimeout(timeout);
        const db = testRequest.result;
        db.close();
        
        // Try to delete the test database
        try {
          indexedDB.deleteDatabase(testDbName);
        } catch (e) {
          console.warn('Could not delete test database:', e);
        }
        
        resolve({ available: true });
      };

      testRequest.onupgradeneeded = () => {
        // Just let it create the database
      };
    });
  } catch (error) {
    console.error('Error detecting IndexedDB:', error);
    return { 
      available: false, 
      reason: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Detect if we're in private/incognito mode
export function isPrivateMode(): boolean {
  try {
    // Try to use localStorage as a proxy test
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return false;
  } catch (e) {
    return true;
  }
}

// Get user-friendly error message
export function getStorageErrorMessage(reason?: string): string {
  if (!reason) return 'Storage is temporarily unavailable';
  
  if (reason.includes('quota') || reason.includes('QuotaExceededError')) {
    return 'Browser storage is full. Clear your browser cache to continue.';
  }
  
  if (reason.includes('not supported')) {
    return 'Your browser does not support local storage.';
  }
  
  if (isPrivateMode()) {
    return 'Private browsing detected. Some features may be limited.';
  }
  
  return 'Storage is temporarily unavailable. You can continue in limited mode.';
}
