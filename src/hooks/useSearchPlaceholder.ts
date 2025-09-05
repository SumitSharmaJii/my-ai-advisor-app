import { useState, useEffect, useRef, useCallback } from 'react';

const SEARCH_PLACEHOLDERS = [
  "I need a portable massage device for travel",
  "Looking for smart home security cameras", 
  "Budget-friendly entertainment devices",
  "Premium kitchen appliances for cooking",
  "Wireless headphones for gaming and music"
];

const ROTATION_INTERVAL = 2500; // 2.5 seconds

interface UseSearchPlaceholderReturn {
  placeholder: string;
  startPlaceholderRotation: () => void;
  stopPlaceholderRotation: () => void;
}

export const useSearchPlaceholder = (): UseSearchPlaceholderReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRotatingRef = useRef(false);

  const placeholder = SEARCH_PLACEHOLDERS[currentIndex];

  const startPlaceholderRotation = useCallback(() => {
    if (isRotatingRef.current) return;
    
    isRotatingRef.current = true;
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % SEARCH_PLACEHOLDERS.length);
    }, ROTATION_INTERVAL);
  }, []);

  const stopPlaceholderRotation = useCallback(() => {
    isRotatingRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopPlaceholderRotation();
    };
  }, [stopPlaceholderRotation]);

  return {
    placeholder,
    startPlaceholderRotation,
    stopPlaceholderRotation,
  };
}; 