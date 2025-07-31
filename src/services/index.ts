import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftCard } from '../store/slices/cardsSlice';

export class UserCardsService {
  private getUserCardsKey(userId: string): string {
    return `user_${userId}_cards`;
  }

  async getUserCards(userId: string): Promise<GiftCard[]> {
    try {
      const key = this.getUserCardsKey(userId);
      const cardsJson = await AsyncStorage.getItem(key);
      if (cardsJson) {
        return JSON.parse(cardsJson);
      }
      return [];
    } catch (error) {
      console.error(`Error getting cards for user ${userId}:`, error);
      return [];
    }
  }

  async saveUserCards(userId: string, cards: GiftCard[]): Promise<void> {
    try {
      const key = this.getUserCardsKey(userId);
      await AsyncStorage.setItem(key, JSON.stringify(cards));
    } catch (error) {
      console.error(`Error saving cards for user ${userId}:`, error);
      throw new Error(`Failed to save user cards: ${userId}`);
    }
  }

  async clearUserCards(userId: string): Promise<void> {
    try {
      const key = this.getUserCardsKey(userId);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error clearing cards for user ${userId}:`, error);
    }
  }

  async clearAllUserData(userId: string): Promise<void> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const userKeys = allKeys.filter(key => key.startsWith(`user_${userId}_`));
      if (userKeys.length > 0) {
        await AsyncStorage.multiRemove(userKeys);
      }
    } catch (error) {
      console.error(`Error clearing all data for user ${userId}:`, error);
    }
  }
}

export const userCardsService = new UserCardsService();
export { toastService } from './ToastService'; 