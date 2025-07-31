import { useColorScheme } from 'react-native';
import { theme, colors, ColorScheme } from '../theme';

export const useTheme = () => {
  const colorScheme = useColorScheme() as ColorScheme;
  const currentColors = colors[colorScheme] || colors.dark;

  return {
    ...theme,
    colors: currentColors,
    colorScheme,
  };
}; 