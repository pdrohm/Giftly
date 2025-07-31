import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RootStackParamList } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GiftCard } from '../../../store/slices/cardsSlice';
import { formatCurrency } from '../../../utils/formatters';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ITEM_HEIGHT = 120;

export const useMyCardsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const cards = useAppSelector(state => state.cards.cards);

  const handleCardPress = useCallback(
    (cardId: string) => {
      navigation.navigate('CardDetails', { cardId });
    },
    [navigation],
  );

  const totalValue = useMemo(
    () => cards.reduce((sum: number, card: GiftCard) => sum + card.amount, 0),
    [cards],
  );

  const formattedTotalValue = useMemo(
    () => formatCurrency(totalValue),
    [totalValue],
  );

  const renderCard = useCallback(
    ({ item }: { item: GiftCard }) => ({
      card: item,
      onPress: () => handleCardPress(item.id),
    }),
    [handleCardPress],
  );

  const keyExtractor = useCallback((item: GiftCard) => item.id, []);

  const getItemLayout = useCallback(
    (data: ArrayLike<GiftCard> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return {
    cards,
    totalValue,
    formattedTotalValue,
    handleCardPress,
    renderCard,
    keyExtractor,
    getItemLayout,
  };
};
