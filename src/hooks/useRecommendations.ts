import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { AIService } from '../services/aiService';
import { AIRecommendation } from '../types';
import { useErrorHandler } from './useErrorHandler';

interface UseRecommendationsReturn {
  recommendations: AIRecommendation[];
  loading: boolean;
  refreshing: boolean;
  hasSearched: boolean;
  error: string | null;
  getRecommendations: (query: string) => Promise<void>;
  refreshRecommendations: (query: string) => Promise<void>;
  clearRecommendations: () => void;
  retryLastSearch: () => Promise<void>;
}

export const useRecommendations = (): UseRecommendationsReturn => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState('');
  
  const { error, handleError, clearError } = useErrorHandler();

  const getRecommendations = useCallback(async (query: string) => {
    if (!query.trim()) {
      Alert.alert('Error', 'Please enter a search query');
      return;
    }

    setLoading(true);
    setHasSearched(true);
    setLastQuery(query);
    clearError();

    try {
      const aiRecommendations = await AIService.getRecommendations(query);
      setRecommendations(aiRecommendations);
    } catch (error) {
      handleError(error, 'Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [handleError, clearError]);

  const refreshRecommendations = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setRefreshing(true);
    clearError();
    
    try {
      const aiRecommendations = await AIService.getRecommendations(query);
      setRecommendations(aiRecommendations);
    } catch (error) {
      handleError(error, 'Failed to refresh recommendations.');
    } finally {
      setRefreshing(false);
    }
  }, [handleError, clearError]);

  const clearRecommendations = useCallback(() => {
    setRecommendations([]);
    setHasSearched(false);
    setLastQuery('');
    clearError();
  }, [clearError]);

  const retryLastSearch = useCallback(async () => {
    if (lastQuery) {
      await getRecommendations(lastQuery);
    }
  }, [lastQuery, getRecommendations]);

  return {
    recommendations,
    loading,
    refreshing,
    hasSearched,
    error,
    getRecommendations,
    refreshRecommendations,
    clearRecommendations,
    retryLastSearch,
  };
};
