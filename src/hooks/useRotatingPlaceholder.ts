import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface UseRotatingPlaceholderReturn {
  currentPlaceholder: string;
  startRotation: () => void;
  stopRotation: () => void;
  isRotating: boolean;
}

export const useRotatingPlaceholder = (
  placeholders: string[],
  intervalMs: number = 3000
): UseRotatingPlaceholderReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(false);
  const mountedRef = useRef(true);

  // Memoize the current placeholder to prevent unnecessary recalculations
  const currentPlaceholder = useMemo(() => {
    return placeholders[currentIndex] || placeholders[0] || '';
  }, [placeholders, currentIndex]);

  const startRotation = useCallback(() => {
    if (isActiveRef.current || placeholders.length <= 1 || !mountedRef.current) return;
    
    isActiveRef.current = true;
    intervalRef.current = setInterval(() => {
      if (mountedRef.current) {
        setCurrentIndex(prevIndex => (prevIndex + 1) % placeholders.length);
      }
    }, intervalMs);
  }, [placeholders.length, intervalMs]);

  const stopRotation = useCallback(() => {
    isActiveRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stopRotation();
    };
  }, [stopRotation]);

  return {
    currentPlaceholder,
    startRotation,
    stopRotation,
    isRotating: isActiveRef.current,
  };
}; 