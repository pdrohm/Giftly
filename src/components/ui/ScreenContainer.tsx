import React from 'react';
import {
  View,
  StyleSheet,
  ViewProps,
  SafeAreaView,
  ScrollView,
  ScrollViewProps,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { colors } from '@/theme';

interface ScreenContainerProps extends ViewProps {
  scrollable?: boolean;
  scrollProps?: ScrollViewProps;
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  scrollProps,
  padding = 'medium',
  style,
  ...props
}) => {
  const theme = useTheme();

  const getPaddingHorizontal = () => {
    switch (padding) {
      case 'none':
        return 0;
      case 'small':
        return theme.spacing[16];
      case 'large':
        return theme.spacing[32];
      default:
        return theme.spacing[24];
    }
  };

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
      paddingHorizontal: getPaddingHorizontal(),
    },
    style,
  ];

  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={containerStyle}
          showsVerticalScrollIndicator={false}
          {...scrollProps}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={containerStyle} {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  container: {
    flex: 1,
    paddingTop: 16,
  },
  scrollView: {
    flex: 1,
  },
}); 