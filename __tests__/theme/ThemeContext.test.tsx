import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import { ThemeProvider, useThemeContext } from '../../src/theme/ThemeContext';
import { storageService } from '../../src/services/StorageService';

// Mock the storage service
jest.mock('../../src/services/StorageService', () => ({
  storageService: {
    getString: jest.fn(),
    setString: jest.fn(),
  },
}));

const TestComponent: React.FC = () => {
  const theme = useThemeContext();
  return (
    <View>
      <Text testID="color-scheme">{theme.colorScheme}</Text>
    </View>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with dark theme by default', async () => {
    const mockGetString = storageService.getString as jest.Mock;
    
    mockGetString.mockResolvedValue(null);

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId('color-scheme')).toBeTruthy();
    });

    expect(getByTestId('color-scheme')).toHaveTextContent('dark');
  });

  it('should load saved theme preference', async () => {
    const mockGetString = storageService.getString as jest.Mock;
    
    mockGetString.mockResolvedValue('light');

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId('color-scheme')).toBeTruthy();
    });

    expect(getByTestId('color-scheme')).toHaveTextContent('light');
  });

  it('should handle storage errors gracefully', async () => {
    const mockGetString = storageService.getString as jest.Mock;
    
    mockGetString.mockRejectedValue(new Error('Storage error'));

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId('color-scheme')).toBeTruthy();
    });

    // Should fallback to dark theme
    expect(getByTestId('color-scheme')).toHaveTextContent('dark');
  });
}); 