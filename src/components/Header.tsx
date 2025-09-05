import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>🤖 AI Product Recommender</Text>
      <Text style={styles.subtitle}>Find the perfect products with AI-powered recommendations</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: SPACING.xl,
    paddingTop: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  title: {
    fontSize: FONT_SIZES.xxxxl,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.gray[600],
    textAlign: 'center',
  },
});

export default Header;
