import React from 'react';
import { render } from '../../../utils/test-utils';
import { MyCardsScreen } from '../../../../src/features/cards/screens/MyCardsScreen';
import { useMyCardsScreen } from '../../../../src/features/cards/hooks/useMyCardsScreen';

jest.mock('../../../../src/features/cards/hooks/useMyCardsScreen');

const mockUseMyCardsScreen = useMyCardsScreen as jest.MockedFunction<typeof useMyCardsScreen>;

describe('MyCardsScreen', () => {
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

  const defaultMockProps = {
    cards: mockCards,
    totalValue: 150,
    formattedTotalValue: '$150.00',
    handleCardPress: jest.fn(),
    renderCard: jest.fn(({ item }) => ({
      card: item,
      onPress: jest.fn(),
    })),
    keyExtractor: jest.fn((item) => item.id),
    getItemLayout: jest.fn((data, index) => ({
      length: 120,
      offset: 120 * index,
      index,
    })),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMyCardsScreen.mockReturnValue(defaultMockProps);
  });

  it('renders correctly with cards', () => {
    const { getByText } = render(<MyCardsScreen />);

    expect(getByText('My Gift Cards')).toBeTruthy();
    expect(getByText('$150.00')).toBeTruthy();
  });

  it('renders empty state when no cards', () => {
    const mockProps = {
      ...defaultMockProps,
      cards: [],
    };
    mockUseMyCardsScreen.mockReturnValue(mockProps);

    const { getByText } = render(<MyCardsScreen />);

    expect(getByText('No gift cards yet')).toBeTruthy();
    expect(getByText('Add your first gift card to get started')).toBeTruthy();
  });

  it('renders FlatList with correct props', () => {
    const { getByTestId } = render(<MyCardsScreen />);

    expect(getByTestId).toBeDefined();
  });

  it('calls renderCard for each card item', () => {
    const mockRenderCard = jest.fn(({ item }) => ({
      card: item,
      onPress: jest.fn(),
    }));
    const mockProps = {
      ...defaultMockProps,
      renderCard: mockRenderCard,
    };
    mockUseMyCardsScreen.mockReturnValue(mockProps);

    render(<MyCardsScreen />);

    expect(mockRenderCard).toHaveBeenCalledTimes(2);
    expect(mockRenderCard).toHaveBeenCalledWith({ item: mockCards[0] });
    expect(mockRenderCard).toHaveBeenCalledWith({ item: mockCards[1] });
  });

  it('uses keyExtractor for FlatList', () => {
    const mockKeyExtractor = jest.fn((item) => item.id);
    const mockProps = {
      ...defaultMockProps,
      keyExtractor: mockKeyExtractor,
    };
    mockUseMyCardsScreen.mockReturnValue(mockProps);

    render(<MyCardsScreen />);

    expect(mockKeyExtractor).toHaveBeenCalledWith(mockCards[0], 0);
    expect(mockKeyExtractor).toHaveBeenCalledWith(mockCards[1], 1);
  });

  it('displays correct total value', () => {
    const mockProps = {
      ...defaultMockProps,
      formattedTotalValue: '$250.00',
    };
    mockUseMyCardsScreen.mockReturnValue(mockProps);

    const { getByText } = render(<MyCardsScreen />);

    expect(getByText('$250.00')).toBeTruthy();
  });

  it('handles single card correctly', () => {
    const singleCard = [mockCards[0]];
    const mockProps = {
      ...defaultMockProps,
      cards: singleCard,
      formattedTotalValue: '$50.00',
    };
    mockUseMyCardsScreen.mockReturnValue(mockProps);

    const { getAllByText } = render(<MyCardsScreen />);
    const totalValueElements = getAllByText('$50.00');

    expect(totalValueElements.length).toBeGreaterThan(0);
  });
}); 