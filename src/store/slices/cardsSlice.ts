import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GiftCard {
  id: string;
  brand: string;
  amount: number;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CardsState {
  cards: GiftCard[];
  loading: boolean;
  error: string | null;
}

const initialState: CardsState = {
  cards: [],
  loading: false,
  error: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Omit<GiftCard, 'id' | 'createdAt' | 'updatedAt'>>) => {
      const now = new Date().toISOString();
      const newCard: GiftCard = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now,
      };
      state.cards.push(newCard);
    },
    updateCard: (state, action: PayloadAction<{ id: string; updates: Partial<Omit<GiftCard, 'id' | 'createdAt'>> }>) => {
      const { id, updates } = action.payload;
      const cardIndex = state.cards.findIndex(card => card.id === id);
      if (cardIndex !== -1) {
        state.cards[cardIndex] = {
          ...state.cards[cardIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
    setCards: (state, action: PayloadAction<GiftCard[]>) => {
      state.cards = action.payload;
    },
    clearCards: (state) => {
      state.cards = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  addCard, 
  updateCard, 
  deleteCard, 
  setCards, 
  clearCards, 
  clearError 
} = cardsSlice.actions;
export default cardsSlice.reducer; 