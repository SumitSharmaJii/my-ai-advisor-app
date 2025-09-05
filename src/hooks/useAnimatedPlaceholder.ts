import { useState, useEffect, useRef, useCallback } from 'react';
import { Animated } from 'react-native';

const SEARCH_PLACEHOLDERS = [
  "I need a portable massage device for travel...",
  "Looking for smart home security cameras...", 
  "Budget-friendly entertainment devices...",
  "Premium kitchen appliances for cooking..."
];

const ROTATION_INTERVAL = 3000; // 3 seconds
const ANIMATION_DURATION = 400; // 400ms animation

interface UseAnimatedPlaceholderReturn {
  currentPlaceholder: string;
  animatedValue: Animated.Value;
  startPlaceholderRotation: () => void;
  stopPlaceholderRotation: () => void;
}

export const useAnimatedPlaceholder = (): UseAnimatedPlaceholderReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRotatingRef = useRef(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const currentPlaceholder = SEARCH_PLACEHOLDERS[currentIndex];

  const animateToNext = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Animate out current placeholder
    Animated.timing(animatedValue, {
      toValue: -50,
      duration: ANIMATION_DURATION / 2,
      useNativeDriver: true,
    }).start(() => {
      // Update to next placeholder
      setCurrentIndex(prevIndex => (prevIndex + 1) % SEARCH_PLACEHOLDERS.length);
      
      // Reset position and animate in
      animatedValue.setValue(50);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: ANIMATION_DURATION / 2,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimating(false);
      });
    });
  }, [animatedValue, isAnimating]);

  const startPlaceholderRotation = useCallback(() => {
    if (isRotatingRef.current) return;
    
    isRotatingRef.current = true;
    intervalRef.current = setInterval(animateToNext, ROTATION_INTERVAL);
  }, [animateToNext]);

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
    currentPlaceholder,
    animatedValue,
    startPlaceholderRotation,
    stopPlaceholderRotation,
  };
}; 