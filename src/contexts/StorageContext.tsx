import React, { createContext, useContext, useState, ReactNode } from 'react';

export type StorageMode = 'indexeddb' | 'memory';

interface StorageContextType {
  storageMode: StorageMode;
  setStorageMode: (mode: StorageMode) => void;
  isStorageAvailable: boolean;
  setIsStorageAvailable: (available: boolean) => void;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [storageMode, setStorageMode] = useState<StorageMode>('indexeddb');
  const [isStorageAvailable, setIsStorageAvailable] = useState(true);

  return (
    <StorageContext.Provider
      value={{
        storageMode,
        setStorageMode,
        isStorageAvailable,
        setIsStorageAvailable,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (context === undefined) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};
