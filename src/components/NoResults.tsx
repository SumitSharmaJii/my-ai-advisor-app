import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants';

interface NoResultsProps {
  onTryAgain: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ onTryAgain }) => {
  return (
    <View style={styles.noResultsContainer}>
      <Text style={styles.noResultsEmoji}>😔</Text>
      <Text style={styles.noResultsTitle}>No recommendations found</Text>
      <Text style={styles.noResultsText}>
        Try adjusting your search terms or be more specific about what you're looking for.
      </Text>
      <TouchableOpacity style={styles.tryAgainButton} onPress={onTryAgain}>
        <Text style={styles.tryAgainText}>Try a different search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
  },
  noResultsEmoji: {
    fontSize: 48,
    marginBottom: SPACING.lg,
  },
  noResultsTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: SPACING.md,
  },
  noResultsText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[600],
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.xl,
  },
  tryAgainButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  tryAgainText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

export default NoResults;
