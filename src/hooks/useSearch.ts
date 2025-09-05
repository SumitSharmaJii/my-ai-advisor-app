import { useState, useCallback } from 'react';

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
  setExampleQuery: (query: string) => void;
}

export const useSearch = (): UseSearchReturn => {
  const [query, setQuery] = useState('');

  const clearQuery = useCallback(() => {
    setQuery('');
  }, []);

  const setExampleQuery = useCallback((exampleQuery: string) => {
    setQuery(exampleQuery);
  }, []);

  return {
    query,
    setQuery,
    clearQuery,
    setExampleQuery,
  };
};
