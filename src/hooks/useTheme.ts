import { theme, colors } from '../theme';
import { useThemeContext } from '../theme/ThemeContext';

export const useTheme = () => {
  const { colorScheme } = useThemeContext();
  const currentColors = colors[colorScheme] || colors.dark;

  return {
    ...theme,
    colors: currentColors,
    colorScheme,
  };
}; 