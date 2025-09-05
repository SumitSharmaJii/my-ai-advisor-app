import { useCallback } from 'react';
import { useSearch } from './useSearch';
import { useRecommendations } from './useRecommendations';

interface UseAppStateReturn {
  // Search state
  query: string;
  setQuery: (query: string) => void;
  setExampleQuery: (query: string) => void;
  
  // Recommendations state
  recommendations: any[];
  loading: boolean;
  refreshing: boolean;
  hasSearched: boolean;
  
  // Actions
  handleSearch: () => Promise<void>;
  handleRefresh: () => Promise<void>;
  handleClear: () => void;
  handleExamplePress: (exampleQuery: string) => void;
}

export const useAppState = (): UseAppStateReturn => {
  const { query, setQuery, clearQuery, setExampleQuery } = useSearch();
  const {
    recommendations,
    loading,
    refreshing,
    hasSearched,
    getRecommendations,
    refreshRecommendations,
    clearRecommendations,
  } = useRecommendations();

  const handleSearch = useCallback(async () => {
    await getRecommendations(query);
  }, [query, getRecommendations]);

  const handleRefresh = useCallback(async () => {
    await refreshRecommendations(query);
  }, [query, refreshRecommendations]);

  const handleClear = useCallback(() => {
    clearQuery();
    clearRecommendations();
  }, [clearQuery, clearRecommendations]);

  const handleExamplePress = useCallback((exampleQuery: string) => {
    setExampleQuery(exampleQuery);
  }, [setExampleQuery]);

  return {
    // Search state
    query,
    setQuery,
    setExampleQuery,
    
    // Recommendations state
    recommendations,
    loading,
    refreshing,
    hasSearched,
    
    // Actions
    handleSearch,
    handleRefresh,
    handleClear,
    handleExamplePress,
  };
};
