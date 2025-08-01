import cardsReducer, { 
  addCard, 
  deleteCard, 
  clearCards
} from '../../src/store/slices/cardsSlice';

describe('Cards Slice', () => {
  const initialState = {
    cards: [],
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(cardsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addCard', () => {
    const card = {
      id: '1',
      brand: 'Starbucks',
      amount: 50,
      expirationDate: '2024-12-31',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    };

    const action = addCard(card);
    const newState = cardsReducer(initialState, action);

    expect(newState.cards).toHaveLength(1);
    expect(newState.cards[0].brand).toBe('Starbucks');
    expect(newState.cards[0].amount).toBe(50);
    expect(newState.cards[0].expirationDate).toBe('2024-12-31');
    expect(newState.cards[0].id).toBeDefined();
    expect(newState.cards[0].createdAt).toBeDefined();
    expect(newState.cards[0].updatedAt).toBeDefined();
  });

  it('should handle deleteCard', () => {
    const card = {
      id: '1',
      brand: 'Starbucks',
      amount: 50,
      expirationDate: '2024-12-31',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    };

    const stateWithCard = {
      ...initialState,
      cards: [card],
    };

    const action = deleteCard('1');
    const newState = cardsReducer(stateWithCard, action);

    expect(newState.cards).toHaveLength(0);
  });

  it('should handle clearCards', () => {
    const card = {
      id: '1',
      brand: 'Starbucks',
      amount: 50,
      expirationDate: '2024-12-31',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    };

    const stateWithCard = {
      ...initialState,
      cards: [card],
    };

    const action = clearCards();
    const newState = cardsReducer(stateWithCard, action);

    expect(newState.cards).toHaveLength(0);
  });
}); 