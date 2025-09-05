import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Animated,
  TouchableWithoutFeedback,
  Pressable 
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS } from '../constants';
import { useAnimatedPlaceholder } from '../hooks';

interface SearchInputProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  onClear: () => void;
  loading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  query,
  onQueryChange,
  onSearch,
  onClear,
  loading,
}) => {
  const textInputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { 
    currentPlaceholder, 
    animatedValue, 
    startPlaceholderRotation, 
    stopPlaceholderRotation 
  } = useAnimatedPlaceholder();

  useEffect(() => {
    if (query.length === 0) {
      startPlaceholderRotation();
    } else {
      stopPlaceholderRotation();
    }
  }, [query.length, startPlaceholderRotation, stopPlaceholderRotation]);

  const handlePlaceholderPress = () => {
    textInputRef.current?.focus();
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    stopPlaceholderRotation();
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    if (query.length === 0) {
      startPlaceholderRotation();
    }
  };

  const handleClearPress = () => {
    onClear();
    textInputRef.current?.focus();
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.placeholderWrapper}>
          <Pressable
            onPress={handlePlaceholderPress}
            style={({ pressed }) => [
              styles.placeholderPressable,
              pressed && styles.placeholderPressed
            ]}
            disabled={query.length > 0}
          >
            <Animated.Text
              style={[
                styles.animatedPlaceholder,
                {
                  transform: [{ translateY: animatedValue }],
                  opacity: query.length > 0 ? 0 : 1,
                }
              ]}
              numberOfLines={1}
            >
              {currentPlaceholder}
            </Animated.Text>
          </Pressable>
        </View>
        <TextInput
          ref={textInputRef}
          style={[
            styles.searchInput,
            isFocused && styles.searchInputFocused
          ]}
          value={query}
          onChangeText={onQueryChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          multiline
          maxLength={200}
          placeholder=""
          placeholderTextColor="transparent"
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
        {query.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={handleClearPress}
            accessibilityLabel="Clear search"
            accessibilityRole="button"
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <TouchableOpacity
        style={[styles.searchButton, loading && styles.searchButtonDisabled]}
        onPress={onSearch}
        disabled={loading}
        accessibilityLabel="Get recommendations"
        accessibilityRole="button"
      >
        <Text style={styles.searchButtonText}>🔍 Get Recommendations</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: SPACING.xl,
    backgroundColor: COLORS.redVariations.soft,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.redVariations.soft,
    borderBottomLeftRadius: BORDER_RADIUS.xxxl,
    borderBottomRightRadius: BORDER_RADIUS.xxxl,
    ...SHADOWS.red,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
    position: 'relative',
  },
  placeholderWrapper: {
    position: 'absolute',
    top: SPACING.lg,
    left: SPACING.lg,
    right: 50,
    zIndex: 1,
    height: 22,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  placeholderPressable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  placeholderPressed: {
    opacity: 0.7,
  },
  animatedPlaceholder: {
    fontSize: FONT_SIZES.md,
    color: COLORS.gray[500],
    lineHeight: 20,
    position: 'absolute',
    width: '100%',
    textAlign: 'left',
  },
  searchInput: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    paddingRight: 40,
    fontSize: FONT_SIZES.lg,
    backgroundColor: COLORS.white,
    minHeight: 60,
    maxHeight: 100,
    textAlignVertical: 'top',
    color: COLORS.dark,
    ...SHADOWS.sm,
  },
  searchInputFocused: {
    borderColor: COLORS.redVariations.dark,
    ...SHADOWS.red,
  },
  clearButton: {
    position: 'absolute',
    right: SPACING.md,
    top: SPACING.lg,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.redVariations.crimson,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    ...SHADOWS.sm,
  },
  clearButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: COLORS.redVariations.vibrant,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    ...SHADOWS.red,
  },
  searchButtonDisabled: {
    backgroundColor: COLORS.gray[600],
    ...SHADOWS.sm,
  },
  searchButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    textShadowColor: COLORS.redVariations.deep,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default SearchInput;
