import { useState, useCallback } from 'react';

interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
  resultCount: number;
}

interface UseSearchHistoryReturn {
  history: SearchHistoryItem[];
  addToHistory: (query: string, resultCount: number) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
  getRecentSearches: (limit?: number) => SearchHistoryItem[];
}

export const useSearchHistory = (): UseSearchHistoryReturn => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  const addToHistory = useCallback((query: string, resultCount: number) => {
    const newItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query: query.trim(),
      timestamp: Date.now(),
      resultCount,
    };

    setHistory(prev => {
      // Remove duplicates and add new item at the beginning
      const filtered = prev.filter(item => item.query !== newItem.query);
      return [newItem, ...filtered].slice(0, 10); // Keep only last 10 searches
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const removeFromHistory = useCallback((id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  }, []);

  const getRecentSearches = useCallback((limit = 5) => {
    return history.slice(0, limit);
  }, [history]);

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
    getRecentSearches,
  };
};
