# Custom Hooks Architecture

This document explains the custom hooks architecture implemented in the AI Product Recommender app.

## 🎯 Overview

The application now uses custom hooks to manage all state and business logic, making the code more modular, testable, and reusable. The main App.tsx is now completely minimal, containing only the MainScreen component.

## 📁 Hook Structure

```
src/hooks/
├── useAppState.ts        # Main app state orchestrator
├── useSearch.ts          # Search query management
├── useRecommendations.ts # AI recommendations logic
├── useErrorHandler.ts    # Error handling utilities
├── useTheme.ts           # Theme management
├── useSearchHistory.ts   # Search history tracking
└── index.ts             # Hook exports
```

## 🪝 Custom Hooks

### 1. `useSearch`
**Purpose**: Manages search query state and operations

```typescript
interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
  setExampleQuery: (query: string) => void;
}
```

**Features**:
- Query state management
- Clear functionality
- Example query setting
- Memoized callbacks for performance

### 2. `useRecommendations`
**Purpose**: Handles AI recommendation logic and state

```typescript
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
```

**Features**:
- AI service integration
- Loading states management
- Error handling
- Retry functionality
- Search history tracking

### 3. `useErrorHandler`
**Purpose**: Centralized error handling

```typescript
interface UseErrorHandlerReturn {
  error: string | null;
  setError: (error: string | null) => void;
  handleError: (error: any, defaultMessage?: string) => void;
  clearError: () => void;
}
```

**Features**:
- Error state management
- Automatic alert display
- Console logging
- Error clearing

### 4. `useAppState`
**Purpose**: Orchestrates all app state and actions

```typescript
interface UseAppStateReturn {
  // Search state
  query: string;
  setQuery: (query: string) => void;
  setExampleQuery: (query: string) => void;
  
  // Recommendations state
  recommendations: AIRecommendation[];
  loading: boolean;
  refreshing: boolean;
  hasSearched: boolean;
  
  // Actions
  handleSearch: () => Promise<void>;
  handleRefresh: () => Promise<void>;
  handleClear: () => void;
  handleExamplePress: (exampleQuery: string) => void;
}
```

**Features**:
- Combines multiple hooks
- Provides unified interface
- Handles complex state interactions
- Memoized actions for performance

### 5. `useTheme`
**Purpose**: Theme management (extensible for dark mode)

```typescript
interface UseThemeReturn {
  theme: Theme;
  colors: typeof COLORS;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
```

**Features**:
- Theme state management
- Color scheme access
- Theme switching
- Extensible for future features

### 6. `useSearchHistory`
**Purpose**: Search history tracking and management

```typescript
interface UseSearchHistoryReturn {
  history: SearchHistoryItem[];
  addToHistory: (query: string, resultCount: number) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
  getRecentSearches: (limit?: number) => SearchHistoryItem[];
}
```

**Features**:
- Search history storage
- Duplicate prevention
- History management
- Recent searches retrieval

## 🏗️ Architecture Benefits

### 1. **Separation of Concerns**
- Each hook has a single responsibility
- Business logic is separated from UI components
- Easy to test individual pieces

### 2. **Reusability**
- Hooks can be used in multiple components
- Logic is not tied to specific UI elements
- Easy to share between screens

### 3. **Testability**
- Each hook can be tested in isolation
- Mock dependencies easily
- Unit test business logic separately

### 4. **Performance**
- Memoized callbacks prevent unnecessary re-renders
- Optimized state updates
- Efficient dependency management

### 5. **Maintainability**
- Clear separation of concerns
- Easy to modify individual features
- Centralized state management

## 📱 Component Structure

### App.tsx (Minimal)
```typescript
import React from 'react';
import { MainScreen } from './src/screens';

const App = () => {
  return <MainScreen />;
};

export default App;
```

### MainScreen.tsx
```typescript
const MainScreen: React.FC = () => {
  const {
    query,
    setQuery,
    recommendations,
    loading,
    refreshing,
    hasSearched,
    handleSearch,
    handleRefresh,
    handleClear,
    handleExamplePress,
  } = useAppState();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.light} />
      
      <Header />
      <SearchInput {...searchProps} />
      {hasSearched ? <ResultsScreen {...resultsProps} /> : <WelcomeScreen {...welcomeProps} />}
    </SafeAreaView>
  );
};
```

## 🔄 Data Flow

```
User Action → Hook → State Update → Component Re-render
     ↓
API Call → Hook → Loading State → UI Update
     ↓
Response → Hook → Data State → Component Update
     ↓
Error → Hook → Error State → Alert Display
```

## 🧪 Testing Strategy

### Hook Testing
```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useSearch } from '../hooks/useSearch';

test('should update query', () => {
  const { result } = renderHook(() => useSearch());
  
  act(() => {
    result.current.setQuery('test query');
  });
  
  expect(result.current.query).toBe('test query');
});
```

### Component Testing
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { MainScreen } from '../screens/MainScreen';

test('should handle search', async () => {
  const { getByText } = render(<MainScreen />);
  
  fireEvent.press(getByText('Get Recommendations'));
  
  // Test search behavior
});
```

## 🚀 Usage Examples

### Using Individual Hooks
```typescript
import { useSearch, useRecommendations } from '../hooks';

const MyComponent = () => {
  const { query, setQuery } = useSearch();
  const { recommendations, loading } = useRecommendations();
  
  // Component logic
};
```

### Using Combined Hook
```typescript
import { useAppState } from '../hooks';

const MyComponent = () => {
  const {
    query,
    recommendations,
    loading,
    handleSearch,
    handleClear,
  } = useAppState();
  
  // Component logic
};
```

## 🔮 Future Enhancements

### 1. **Persistence**
- Add AsyncStorage integration
- Persist search history
- Save user preferences

### 2. **Advanced State Management**
- Add Redux Toolkit integration
- Implement state persistence
- Add middleware for logging

### 3. **Performance Optimization**
- Add React.memo to components
- Implement virtualization for large lists
- Add lazy loading for screens

### 4. **Error Boundaries**
- Add error boundary components
- Implement fallback UI
- Add error reporting

### 5. **Analytics**
- Add analytics tracking
- Monitor user behavior
- Track performance metrics

## 📊 Performance Considerations

### Memoization
- All callbacks are memoized with `useCallback`
- Prevents unnecessary re-renders
- Optimizes performance

### State Updates
- Batched state updates where possible
- Minimal re-renders
- Efficient dependency arrays

### Memory Management
- Proper cleanup in useEffect
- No memory leaks
- Efficient hook dependencies

## 🎯 Best Practices

### 1. **Hook Design**
- Single responsibility principle
- Clear interfaces
- Memoized callbacks

### 2. **State Management**
- Minimal state
- Derived state where possible
- Clear state updates

### 3. **Error Handling**
- Centralized error handling
- User-friendly error messages
- Proper error logging

### 4. **Testing**
- Test hooks in isolation
- Mock external dependencies
- Test error scenarios

## 📝 Conclusion

The custom hooks architecture provides a clean, maintainable, and scalable solution for managing application state and business logic. It separates concerns effectively, making the code easier to test, debug, and extend.

The minimal App.tsx demonstrates the power of this architecture - all complex logic is abstracted into reusable hooks, making the main application component simple and focused on composition rather than implementation details.
