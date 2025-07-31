import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './index';
import { setCards } from '../store/slices/cardsSlice';
import { userCardsService } from '../services';

export const useUserCards = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { cards } = useAppSelector(state => state.cards);
  const hasLoadedInitialCards = useRef(false);

  useEffect(() => {
    const loadUserCards = async () => {
      if (user?.uid) {
        try {
          const userCards = await userCardsService.getUserCards(user.uid);
          dispatch(setCards(userCards));
          hasLoadedInitialCards.current = true;
        } catch (error) {
          console.error('Error loading user cards:', error);
        }
      } else {
        dispatch(setCards([]));
        hasLoadedInitialCards.current = false;
      }
    };

    loadUserCards();
  }, [user?.uid, dispatch]);

  useEffect(() => {
    const saveUserCards = async () => {
      if (user?.uid && hasLoadedInitialCards.current) {
        try {
          console.log(`Saving ${cards.length} cards for user: ${user.uid}`);
          await userCardsService.saveUserCards(user.uid, cards);
        } catch (error) {
          console.error('Error saving user cards:', error);
        }
      }
    };

    saveUserCards();
  }, [user?.uid, cards, dispatch]);

  return { cards };
}; 