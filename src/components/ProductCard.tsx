import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AIRecommendation } from '../types';
import { formatPrice, getPriceTag, getPriceTagColor } from '../utils';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants';

interface ProductCardProps {
  recommendation: AIRecommendation;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ recommendation, index }) => {
  const priceTag = getPriceTag(recommendation.product.price);
  const priceTagColor = getPriceTagColor(recommendation.product.price);

  return (
    <View style={styles.productCard}>
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>#{index + 1}</Text>
      </View>
      
      <View style={styles.productHeader}>
        <Text style={styles.productName}>{recommendation.product.product_name}</Text>
        <Text style={styles.brandName}>by {recommendation.product.brand}</Text>
      </View>
      
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>{recommendation.product.category}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Match:</Text>
          <Text style={styles.score}>{recommendation.matchScore}%</Text>
        </View>
      </View>
      
      <Text style={styles.description} numberOfLines={3}>
        {recommendation.product.description}
      </Text>
      
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{formatPrice(recommendation.product.price)}</Text>
        <View style={styles.priceIndicator}>
          <Text style={[styles.priceTag, { backgroundColor: priceTagColor }]}>
            {priceTag}
          </Text>
        </View>
      </View>
      
      <View style={styles.reasonContainer}>
        <Text style={styles.reasonLabel}>Why this matches:</Text>
        <Text style={styles.reason}>{recommendation.reason}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    margin: SPACING.sm,
    ...SHADOWS.md,
    position: 'relative',
  },
  rankBadge: {
    position: 'absolute',
    top: -SPACING.sm,
    right: SPACING.lg,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  rankText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
  },
  productHeader: {
    marginBottom: SPACING.sm,
    marginTop: SPACING.xs,
  },
  productName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 2,
  },
  brandName: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[600],
    fontStyle: 'italic',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  category: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    backgroundColor: COLORS.blue[50],
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
    marginRight: SPACING.xs,
  },
  score: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[700],
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  price: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  priceIndicator: {
    flexDirection: 'row',
  },
  priceTag: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.white,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.xs,
    textTransform: 'uppercase',
  },
  reasonContainer: {
    backgroundColor: COLORS.light,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  reasonLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.gray[700],
    marginBottom: SPACING.xs,
  },
  reason: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray[600],
    lineHeight: 18,
  },
});

export default ProductCard;
