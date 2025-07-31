import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../../components/ui/ScreenContainer';
import { CardItem } from '../components/CardItem';
import { Icon } from '../../../components/ui/Icon';
import { H3, H4, Body } from '../../../components/ui/Typography';
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
        <H4 style={styles.emptyTitle}>No gift cards yet</H4>
        <Body color="textSecondary" style={styles.emptySubtitle}>
          Add your first gift card to get started
        </Body>
      </View>
    ),
    [theme.colors.textSecondary],
  );

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <H3>My Gift Cards</H3>
        <H4 color="primary" style={styles.totalValue}>
          {formattedTotalValue}
        </H4>
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
    marginBottom: 8,
  },
  totalValue: {
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 56,
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptySubtitle: {
    textAlign: 'center',
  },
  emptyIcon: {
    marginBottom: 16,
  },
});
