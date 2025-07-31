export const  colors = {
  dark: {
    background: '#0D0D0D',
    card: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#A1A1AA',
    primary: '#4F46E5',
    danger: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    border: '#2A2A2A',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  light: {
    background: '#FFFFFF',
    card: '#F8F9FA',
    text: '#1A1A1A',
    textSecondary: '#6B7280',
    primary: '#4F46E5',
    danger: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    border: '#E5E7EB',
    overlay: 'rgba(0, 0, 0, 0.3)',
  },
} as const;

export type ColorScheme = keyof typeof colors;
export type ColorKey = keyof typeof colors.dark; 