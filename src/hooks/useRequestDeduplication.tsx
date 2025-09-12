import { useRef, useCallback } from 'react';

interface RequestCache {
  [key: string]: Promise<any>;
}

/**
 * Hook that prevents duplicate API requests by caching ongoing requests
 */
export const useRequestDeduplication = () => {
  const requestCache = useRef<RequestCache>({});

  const deduplicatedRequest = useCallback(async (
    key: string,
    requestFn: () => Promise<any>,
    ttl = 5000 // 5 second TTL for request deduplication
  ) => {
    // If request is already in progress, return the existing promise
    if (requestCache.current[key]) {
      return requestCache.current[key];
    }

    // Create new request and cache it
    const requestPromise = requestFn()
      .finally(() => {
        // Clean up cache after TTL
        setTimeout(() => {
          delete requestCache.current[key];
        }, ttl);
      });

    requestCache.current[key] = requestPromise;
    return requestPromise;
  }, []);

  const clearCache = useCallback(() => {
    requestCache.current = {};
  }, []);

  const getCacheSize = useCallback(() => {
    return Object.keys(requestCache.current).length;
  }, []);

  return {
    deduplicatedRequest,
    clearCache,
    getCacheSize,
  };
};