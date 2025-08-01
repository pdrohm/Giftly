import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useThemeContext } from '../../theme/ThemeContext';
import { H4, Body } from './Typography';

interface ThemeToggleProps {
  style?: any;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ style }) => {
  const theme = useTheme();
  const { colorScheme, setColorScheme } = useThemeContext();

  const handleThemeToggle = () => {
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setColorScheme(newScheme);
  };

  const getThemeDescription = () => {
    return colorScheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled';
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <H4 style={styles.title}>Theme</H4>
          <Body color="textSecondary" style={styles.description}>
            {getThemeDescription()}
          </Body>
        </View>
        <View style={styles.controls}>
          <Switch
            testID="theme-switch"
            value={colorScheme === 'dark'}
            onValueChange={handleThemeToggle}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor={theme.colors.card}
            style={styles.themeSwitch}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
  controls: {
    alignItems: 'flex-end',
  },
  themeSwitch: {
    marginLeft: 8,
  },
}); 