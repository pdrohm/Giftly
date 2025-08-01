import { renderHook } from '@testing-library/react-native';
import { useMyCardsScreen } from '../../../../src/features/cards/hooks/useMyCardsScreen';
import { useAppSelector } from '../../../../src/hooks/useAppSelector';
import { useNavigation } from '@react-navigation/native';

jest.mock('../../../../src/hooks/useAppSelector');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
const mockUseNavigation = useNavigation as jest.MockedFunction<typeof useNavigation>;

describe('useMyCardsScreen', () => {
  const mockCards = [
    {
      id: '1',
      brand: 'Starbucks',
      amount: 50,
      expirationDate: '2024-12-31',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      brand: 'Amazon',
      amount: 100,
      expirationDate: '2024-06-30',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppSelector.mockReturnValue(mockCards);
    mockUseNavigation.mockReturnValue({
      navigate: mockNavigate,
    } as any);
  });

  it('should return cards from store', () => {
    const { result } = renderHook(() => useMyCardsScreen());

    expect(result.current.cards).toEqual(mockCards);
  });

  it('should calculate total value correctly', () => {
    const { result } = renderHook(() => useMyCardsScreen());

    expect(result.current.totalValue).toBe(150);
  });

  it('should format total value as currency', () => {
    const { result } = renderHook(() => useMyCardsScreen());

    expect(result.current.formattedTotalValue).toBe('$150.00');
  });

  it('should handle empty cards array', () => {
    mockUseAppSelector.mockReturnValue([]);
    const { result } = renderHook(() => useMyCardsScreen());

    expect(result.current.totalValue).toBe(0);
    expect(result.current.formattedTotalValue).toBe('$0.00');
  });

  it('should navigate to card details when card is pressed', () => {
    const { result } = renderHook(() => useMyCardsScreen());

    result.current.handleCardPress('1');

    expect(mockNavigate).toHaveBeenCalledWith('CardDetails', { cardId: '1' });
  });

  it('should return renderCard function that provides card and onPress', () => {
    const { result } = renderHook(() => useMyCardsScreen());

    const renderResult = result.current.renderCard({ item: mockCards[0] });

    expect(renderResult.card).toEqual(mockCards[0]);
    expect(typeof renderResult.onPress).toBe('function');
  });

  it('should return keyExtractor function', () => {
    const { result } = renderHook(() => useMyCardsScreen());

    expect(result.current.keyExtractor(mockCards[0])).toBe('1');
  });

  it('should return getItemLayout function with correct dimensions', () => {
    const { result } = renderHook(() => useMyCardsScreen());

    const layout = result.current.getItemLayout(mockCards, 1);

    expect(layout).toEqual({
      length: 120,
      offset: 120,
      index: 1,
    });
  });

  it('should handle single card correctly', () => {
    mockUseAppSelector.mockReturnValue([mockCards[0]]);
    const { result } = renderHook(() => useMyCardsScreen());

    expect(result.current.totalValue).toBe(50);
    expect(result.current.formattedTotalValue).toBe('$50.00');
  });
}); 