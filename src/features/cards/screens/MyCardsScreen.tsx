import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { ScreenContainer } from '../../../components/ui/ScreenContainer';
import { CardItem } from '../components/CardItem';
import { Icon } from '../../../components/ui/Icon';
import { useMyCardsScreen } from '../hooks/useMyCardsScreen';
import { useTheme } from '../../../hooks/useTheme';
import { GiftCard } from '../../../store/slices/cardsSlice';

// Extract formatting function outside component
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Calculate item height for getItemLayout optimization
const ITEM_HEIGHT = 120; // card height + marginBottom

export const MyCardsScreen: React.FC = () => {
  const theme = useTheme();
  const { cards, totalValue, handleCardPress } = useMyCardsScreen();

  // Memoize the formatted total value
  const formattedTotalValue = useMemo(() => formatCurrency(totalValue), [totalValue]);

  // Memoize the renderItem function
  const renderCard = useCallback(({ item }: { item: GiftCard }) => (
    <CardItem
      card={item}
      onPress={() => handleCardPress(item.id)}
    />
  ), [handleCardPress]);

  const keyExtractor = useCallback((item: GiftCard) => item.id, []);

  const getItemLayout = useCallback((data: ArrayLike<GiftCard> | null | undefined, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  const renderEmptyState = useCallback(() => (
    <View style={styles.emptyState}>
      <Icon 
        name="credit-card" 
        size={64} 
        color={theme.colors.textSecondary} 
        style={styles.emptyIcon}
      />
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        No gift cards yet
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}>
        Add your first gift card to get started
      </Text>
    </View>
  ), [theme.colors.text, theme.colors.textSecondary]);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          My Gift Cards
        </Text>
        <Text style={[styles.totalValue, { color: theme.colors.primary }]}>
          {formattedTotalValue}
        </Text>
      </View>

      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        // Performance optimizations
        removeClippedSubviews={true}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        updateCellsBatchingPeriod={50}
        // Disable scroll performance optimizations for better UX
        scrollEventThrottle={16}
        // Memory optimization
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '600',
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  emptyIcon: {
    marginBottom: 16,
  },
}); 