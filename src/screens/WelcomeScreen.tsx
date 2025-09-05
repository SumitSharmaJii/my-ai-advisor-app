import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants';

interface WelcomeScreenProps {
  onExamplePress: (query: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onExamplePress }) => {
  const examples = [
    "I need a portable massage device for travel",
    "Looking for smart home security cameras",
    "Budget-friendly entertainment devices",
    "Premium kitchen appliances for cooking",
  ];

  return (
    <ScrollView style={styles.welcomeContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.welcomeContent}>
        <Text style={styles.welcomeTitle}>Welcome to AI Product Recommender! 🚀</Text>
        <Text style={styles.welcomeText}>
          Simply describe what you're looking for in natural language, and our AI will find the perfect products for you.
        </Text>
        
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>✨ Features:</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🧠</Text>
            <Text style={styles.featureText}>AI-powered product matching</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>📊</Text>
            <Text style={styles.featureText}>Match score and explanations</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>💰</Text>
            <Text style={styles.featureText}>Price range indicators</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureEmoji}>🔄</Text>
            <Text style={styles.featureText}>Real-time recommendations</Text>
          </View>
        </View>
        
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleTitle}> Try these examples:</Text>
          {examples.map((example, index) => (
            <TouchableOpacity
              key={index}
              style={styles.exampleButton}
              onPress={() => onExamplePress(example)}
            >
              <Text style={styles.exampleText}>"{example}"</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
  },
  welcomeContent: {
    padding: SPACING.xl,
  },
  welcomeTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  welcomeText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.gray[600],
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xxxl,
  },
  featuresContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    ...SHADOWS.sm,
  },
  featuresTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: SPACING.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  featureEmoji: {
    fontSize: FONT_SIZES.xxl,
    marginRight: SPACING.md,
  },
  featureText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[700],
  },
  exampleContainer: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    ...SHADOWS.sm,
  },
  exampleTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: SPACING.lg,
  },
  exampleButton: {
    backgroundColor: COLORS.light,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
  },
  exampleText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[700],
    fontStyle: 'italic',
  },
});

export default WelcomeScreen;
