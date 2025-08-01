import { useThemeContext } from '../theme/ThemeContext';

export const useThemeActions = () => {
  const { setColorScheme, toggleTheme, colorScheme } = useThemeContext();

  const setLightTheme = () => setColorScheme('light');
  const setDarkTheme = () => setColorScheme('dark');

  return {
    colorScheme,
    
    setLightTheme,
    setDarkTheme,
    toggleTheme,
    setColorScheme,
  };
}; 