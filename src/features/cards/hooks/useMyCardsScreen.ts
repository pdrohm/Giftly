import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { RootStackParamList } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GiftCard } from '../../../store/slices/cardsSlice';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useMyCardsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const cards = useAppSelector((state) => state.cards.cards);

  const handleCardPress = useCallback((cardId: string) => {
    navigation.navigate('CardDetails', { cardId });
  }, [navigation]);

  // Memoize the total value calculation
  const totalValue = useMemo(() => 
    cards.reduce((sum: number, card: GiftCard) => sum + card.amount, 0), 
    [cards]
  );

  return {
    cards,
    totalValue,
    handleCardPress,
  };
}; 