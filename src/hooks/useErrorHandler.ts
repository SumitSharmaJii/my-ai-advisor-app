import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

interface UseErrorHandlerReturn {
  error: string | null;
  setError: (error: string | null) => void;
  handleError: (error: any, defaultMessage?: string) => void;
  clearError: () => void;
}

export const useErrorHandler = (): UseErrorHandlerReturn => {
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((error: any, defaultMessage = 'An unexpected error occurred') => {
    const errorMessage = error?.message || error?.toString() || defaultMessage;
    setError(errorMessage);
    Alert.alert('Error', errorMessage);
    console.error('Error:', error);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    setError,
    handleError,
    clearError,
  };
};
