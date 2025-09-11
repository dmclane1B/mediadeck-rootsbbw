import { useState, useEffect, useCallback } from 'react';
import { SlideContent, defaultSlideContent } from '@/data/slideContent';

const STORAGE_KEY = 'slide-content-config';

export interface UseSlideContentReturn {
  content: Record<string, SlideContent>;
  getSlideContent: (slideId: string) => SlideContent | null;
  updateSlideContent: (slideId: string, updates: Partial<SlideContent>) => void;
  resetSlideContent: (slideId: string) => void;
  resetAllContent: () => void;
  exportContent: () => string;
  importContent: (contentJson: string) => boolean;
  loading: boolean;
  error: string | null;
}

export const useSlideContent = (): UseSlideContentReturn => {
  const [content, setContent] = useState<Record<string, SlideContent>>(defaultSlideContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load content from localStorage on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        // Add small delay to prevent flash of loading state for cached content
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedContent = JSON.parse(stored);
          // Merge with defaults to ensure all slides have content
          const mergedContent = { ...defaultSlideContent };
          Object.keys(parsedContent).forEach(key => {
            if (parsedContent[key]) {
              mergedContent[key] = { ...defaultSlideContent[key], ...parsedContent[key] };
            }
          });
          setContent(mergedContent);
        }
        setError(null);
      } catch (err) {
        console.error('Error loading slide content:', err);
        setError('Failed to load slide content');
        setContent(defaultSlideContent);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Save content to localStorage whenever it changes
  const saveContent = useCallback((newContent: Record<string, SlideContent>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } catch (err) {
      console.error('Error saving slide content:', err);
      setError('Failed to save content changes');
    }
  }, []);

  const getSlideContent = useCallback((slideId: string): SlideContent | null => {
    return content[slideId] || null;
  }, [content]);

  const updateSlideContent = useCallback((slideId: string, updates: Partial<SlideContent>) => {
    setContent(prev => {
      const newContent = {
        ...prev,
        [slideId]: {
          ...prev[slideId],
          ...updates,
          id: slideId // Ensure ID is preserved
        }
      };
      saveContent(newContent);
      return newContent;
    });
  }, [saveContent]);

  const resetSlideContent = useCallback((slideId: string) => {
    if (defaultSlideContent[slideId]) {
      updateSlideContent(slideId, defaultSlideContent[slideId]);
    }
  }, [updateSlideContent]);

  const resetAllContent = useCallback(() => {
    setContent(defaultSlideContent);
    saveContent(defaultSlideContent);
  }, [saveContent]);

  const exportContent = useCallback((): string => {
    return JSON.stringify(content, null, 2);
  }, [content]);

  const importContent = useCallback((contentJson: string): boolean => {
    try {
      const parsed = JSON.parse(contentJson);
      if (typeof parsed === 'object' && parsed !== null) {
        // Validate that it has the expected structure
        const isValid = Object.values(parsed).every((item: any) => 
          item && typeof item === 'object' && typeof item.id === 'string'
        );
        
        if (isValid) {
          setContent(parsed);
          saveContent(parsed);
          setError(null);
          return true;
        }
      }
      throw new Error('Invalid content structure');
    } catch (err) {
      console.error('Error importing content:', err);
      setError('Failed to import content - invalid format');
      return false;
    }
  }, [saveContent]);

  return {
    content,
    getSlideContent,
    updateSlideContent,
    resetSlideContent,
    resetAllContent,
    exportContent,
    importContent,
    loading,
    error
  };
};