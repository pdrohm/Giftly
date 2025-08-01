import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ColorScheme } from './colors';
import { storageService } from '../services/StorageService';

interface ThemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_PREFERENCE_KEY = 'theme_preference';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>('dark');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedTheme = await storageService.getString(THEME_PREFERENCE_KEY);
        const theme = (storedTheme as ColorScheme) || 'dark';
        setColorSchemeState(theme);
      } catch (error) {
        console.error('Error loading theme preference:', error);
        setColorSchemeState('dark');
      } finally {
        setIsInitialized(true);
      }
    };

    loadThemePreference();
  }, []);

  const setColorScheme = async (scheme: ColorScheme) => {
    try {
      setColorSchemeState(scheme);
      await storageService.setString(THEME_PREFERENCE_KEY, scheme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newScheme);
  };

  const contextValue: ThemeContextType = {
    colorScheme,
    setColorScheme,
    toggleTheme,
  };

  if (!isInitialized && process.env.NODE_ENV === 'test') {
    return (
      <ThemeContext.Provider value={contextValue}>
        {children}
      </ThemeContext.Provider>
    );
  }

  if (!isInitialized) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}; 