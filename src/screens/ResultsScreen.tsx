import React from 'react';
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { AIRecommendation } from '../types';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import NoResults from '../components/NoResults';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';

interface ResultsScreenProps {
  query: string;
  recommendations: AIRecommendation[];
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onTryAgain: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  query,
  recommendations,
  loading,
  refreshing,
  onRefresh,
  onTryAgain,
}) => {
  const renderItem = ({ item, index }: { item: AIRecommendation; index: number }) => (
    <ProductCard recommendation={item} index={index} />
  );

  const renderHeader = () => (
    <View style={styles.resultsHeader}>
      <Text style={styles.resultsTitle}>
        🎯 Found {recommendations.length} recommendations
      </Text>
      <Text style={styles.resultsSubtitle}>for "{query}"</Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        💡 Tip: Try different search terms or be more specific for better results
      </Text>
    </View>
  );

  const renderEmpty = () => <NoResults onTryAgain={onTryAgain} />;

  if (loading) {
    return (
      <View style={styles.resultsContainer}>
        <LoadingSpinner 
          message="Analyzing your request with AI..."
          subMessage="This may take a few seconds"
        />
      </View>
    );
  }

  return (
    <FlatList
      data={recommendations}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={styles.resultsContainer}
      contentContainerStyle={styles.resultsContentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={recommendations.length > 0 ? renderHeader : null}
      ListFooterComponent={recommendations.length > 0 ? renderFooter : null}
      ListEmptyComponent={renderEmpty}
    />
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    flex: 1,
    padding: SPACING.xl,
  },
  resultsContentContainer: {
    paddingBottom: SPACING.xl,
  },
  resultsHeader: {
    marginBottom: SPACING.xl,
  },
  resultsTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  resultsSubtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.gray[600],
  },
  footer: {
    marginTop: SPACING.xl,
    padding: SPACING.lg,
    backgroundColor: COLORS.blue[50],
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xl,
  },
  footerText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.blue[600],
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ResultsScreen;
