import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../../components/ui/ScreenContainer';
import { CardItem } from '../components/CardItem';
import { Icon } from '../../../components/ui/Icon';
import { useMyCardsScreen } from '../hooks/useMyCardsScreen';
import { useTheme } from '../../../hooks/useTheme';

export const MyCardsScreen: React.FC = () => {
  const theme = useTheme();
  const {
    cards,
    formattedTotalValue,
    renderCard,
    keyExtractor,
    getItemLayout,
  } = useMyCardsScreen();

  const renderCardItem = useCallback(
    ({ item }: { item: any }) => {
      const { card, onPress } = renderCard({ item });
      return <CardItem card={card} onPress={onPress} />;
    },
    [renderCard],
  );

  const renderEmptyState = useCallback(
    () => (
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
        <Text
          style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
        >
          Add your first gift card to get started
        </Text>
      </View>
    ),
    [theme.colors.text, theme.colors.textSecondary],
  );

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
        renderItem={renderCardItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyState}
        removeClippedSubviews={true}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        updateCellsBatchingPeriod={50}
        scrollEventThrottle={16}
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
