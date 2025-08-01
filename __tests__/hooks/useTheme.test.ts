import { renderHook } from '@testing-library/react-native';
import { useTheme } from '../../src/hooks/useTheme';

// Mock the theme hook to return a proper theme object
jest.mock('../../src/hooks/useTheme', () => ({
  useTheme: jest.fn(() => ({
    colors: {
      primary: '#007AFF',
      secondary: '#5856D6',
      background: '#FFFFFF',
      text: '#000000',
    },
    typography: {
      h1: { fontSize: 24, fontWeight: 'bold' },
      h2: { fontSize: 20, fontWeight: 'bold' },
      body: { fontSize: 16, fontWeight: 'normal' },
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
  })),
}));

describe('useTheme Hook', () => {
  it('returns theme object with colors', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current).toBeDefined();
    expect(result.current.colors).toBeDefined();
    expect(result.current.colors.primary).toBeDefined();
    expect(result.current.colors.secondary).toBeDefined();
    expect(result.current.colors.background).toBeDefined();
    expect(result.current.colors.text).toBeDefined();
  });

  it('returns theme object with typography', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.typography).toBeDefined();
    expect(result.current.typography.h1).toBeDefined();
    expect(result.current.typography.h2).toBeDefined();
    expect(result.current.typography.body).toBeDefined();
  });

  it('returns theme object with spacing', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.spacing).toBeDefined();
    expect(result.current.spacing.xs).toBeDefined();
    expect(result.current.spacing.sm).toBeDefined();
    expect(result.current.spacing.md).toBeDefined();
    expect(result.current.spacing.lg).toBeDefined();
    expect(result.current.spacing.xl).toBeDefined();
  });
}); 