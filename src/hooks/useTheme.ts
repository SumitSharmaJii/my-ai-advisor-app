import { useState, useCallback } from 'react';
import { COLORS } from '../constants';

type Theme = 'light' | 'dark';

interface UseThemeReturn {
  theme: Theme;
  colors: typeof COLORS;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useTheme = (): UseThemeReturn => {
  const [theme, setThemeState] = useState<Theme>('light');

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  // For now, we'll use the same colors for both themes
  // In a real app, you'd have different color schemes
  const colors = COLORS;

  return {
    theme,
    colors,
    toggleTheme,
    setTheme,
  };
};
