import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';

interface LoadingSpinnerProps {
  message?: string;
  subMessage?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  subMessage,
}) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.loadingText}>{message}</Text>
      {subMessage && <Text style={styles.loadingSubtext}>{subMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
  },
  loadingText: {
    marginTop: SPACING.lg,
    fontSize: FONT_SIZES.lg,
    color: COLORS.gray[600],
    fontWeight: '500',
  },
  loadingSubtext: {
    marginTop: SPACING.xs,
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[500],
  },
});

export default LoadingSpinner;
