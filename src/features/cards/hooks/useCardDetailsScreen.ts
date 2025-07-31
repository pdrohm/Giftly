import { useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { deleteCard } from '../../../store/slices/cardsSlice';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { GiftCard } from '../../../store/slices/cardsSlice';
import { Alert } from 'react-native';
import { formatCurrency, formatDateLong, formatISODate } from '../../../utils/formatters';
import { useToast } from '../../../hooks/useToast';

type CardDetailsRouteProp = RouteProp<RootStackParamList, 'CardDetails'>;

export const useCardDetailsScreen = () => {
  const route = useRoute<CardDetailsRouteProp>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards.cards);
  const { showSuccess, showError } = useToast();
  
  const { cardId } = route.params;
  const card = cards.find((c: GiftCard) => c.id === cardId);

  const handleDelete = useCallback(() => {
    try {
      if (card) {
        dispatch(deleteCard(card.id));
        showSuccess('Gift card deleted successfully!');
        navigation.goBack();
      }
    } catch (error) {
      showError('Failed to delete gift card. Please try again.');
    }
  }, [card, dispatch, navigation, showSuccess, showError]);



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
    formatDate: formatDateLong,
    formatISODate,
    handleDeletePress,
  };
}; 