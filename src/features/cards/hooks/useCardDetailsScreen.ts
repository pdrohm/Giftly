import { useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { deleteCard } from '../../../store/slices/cardsSlice';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { GiftCard } from '../../../store/slices/cardsSlice';
import { Alert } from 'react-native';

type CardDetailsRouteProp = RouteProp<RootStackParamList, 'CardDetails'>;

export const useCardDetailsScreen = () => {
  const route = useRoute<CardDetailsRouteProp>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards.cards);
  
  const { cardId } = route.params;
  const card = cards.find((c: GiftCard) => c.id === cardId);

  const handleDelete = useCallback(() => {
    if (card) {
      dispatch(deleteCard(card.id));
      navigation.goBack();
    }
  }, [card, dispatch, navigation]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDeletePress = () => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to delete this gift card? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleDelete },
      ]
    );
  };


  return {
    card,
    handleDelete,
    formatCurrency,
    formatDate,
    handleDeletePress,
  };
}; 