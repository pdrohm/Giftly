import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeToggle } from '../../../src/components/ui/ThemeToggle';
import { ThemeProvider } from '../../../src/theme/ThemeContext';

// Mock the storage service
jest.mock('../../../src/services/StorageService', () => ({
  storageService: {
    getString: jest.fn(),
    setString: jest.fn(),
  },
}));

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render theme toggle component', async () => {
    const { getByText } = render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(getByText('Theme')).toBeTruthy();
      expect(getByText('Dark mode enabled')).toBeTruthy();
    });
  });

  it('should show correct description based on current theme', async () => {
    const { getByText } = render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>
    );

    // Should show dark mode description by default
    await waitFor(() => {
      expect(getByText('Dark mode enabled')).toBeTruthy();
    });
  });

  it('should handle theme toggle', async () => {
    const { getByTestId } = render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(getByTestId('theme-switch')).toBeTruthy();
    });

    const themeSwitch = getByTestId('theme-switch');
    fireEvent(themeSwitch, 'valueChange', false);

    // The switch should be toggled
    expect(themeSwitch.props.value).toBe(false);
  });
}); 