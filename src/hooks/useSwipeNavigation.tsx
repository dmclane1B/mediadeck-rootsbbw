import { useEffect } from 'react';

interface UseSwipeNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  enabled?: boolean;
}

export const useSwipeNavigation = ({ onPrevious, onNext, enabled = true }: UseSwipeNavigationProps) => {
  useEffect(() => {
    if (!enabled) return;

    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      endX = e.touches[0].clientX;
      endY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      // Check if horizontal swipe is dominant and significant enough
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          onPrevious(); // Swipe right = previous
        } else {
          onNext(); // Swipe left = next
        }
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onPrevious, onNext, enabled]);
};