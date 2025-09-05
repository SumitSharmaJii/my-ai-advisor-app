import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useAppState } from '../hooks';
import { Header, SearchInput } from '../components';
import { WelcomeScreen, ResultsScreen } from './';
import { COLORS } from '../constants';

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
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.redVariations.soft} />
      
      <SearchInput
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        onClear={handleClear}
        loading={loading}
      />

      {hasSearched ? (
        <ResultsScreen
          query={query}
          recommendations={recommendations}
          loading={loading}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onTryAgain={handleClear}
        />
      ) : (
        <WelcomeScreen onExamplePress={handleExamplePress} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
});

export default MainScreen;
