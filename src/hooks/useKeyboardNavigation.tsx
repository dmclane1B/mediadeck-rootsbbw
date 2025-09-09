import { useEffect } from 'react';

interface UseKeyboardNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  onHome?: () => void;
  enabled?: boolean;
}

export const useKeyboardNavigation = ({ 
  onPrevious, 
  onNext, 
  onHome, 
  enabled = true 
}: UseKeyboardNavigationProps) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          onPrevious();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Spacebar
          e.preventDefault();
          onNext();
          break;
        case 'Home':
          if (onHome) {
            e.preventDefault();
            onHome();
          }
          break;
        case 'Escape':
          if (onHome) {
            e.preventDefault();
            onHome();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onPrevious, onNext, onHome, enabled]);
};