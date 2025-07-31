import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled,
  style,
  ...props
}) => {
  const theme = useTheme();

  const buttonStyle = [
    styles.button,
    styles[size],
    {
      backgroundColor: disabled ? theme.colors.border : theme.colors[variant === 'primary' ? 'primary' : variant === 'danger' ? 'danger' : 'card'],
      borderColor: theme.colors.border,
    },
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${size}Text`],
    {
      color: disabled ? theme.colors.textSecondary : variant === 'secondary' ? theme.colors.text : '#FFFFFF',
      fontSize: theme.typography.fontSize[size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'base'],
      fontWeight: theme.typography.fontWeight.semibold,
    },
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? theme.colors.text : '#FFFFFF'} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  small: {
    height: 36,
    paddingHorizontal: 16,
  },
  medium: {
    height: 48,
    paddingHorizontal: 24,
  },
  large: {
    height: 56,
    paddingHorizontal: 32,
  },
  text: {
    // Font styles are now applied dynamically
  },
  smallText: {
    // Font styles are now applied dynamically
  },
  mediumText: {
    // Font styles are now applied dynamically
  },
  largeText: {
    // Font styles are now applied dynamically
  },
}); 