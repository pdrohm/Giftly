import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body2' | 'caption' | 'button';
  color?: 'primary' | 'secondary' | 'text' | 'textSecondary' | 'danger' | 'success';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'text',
  style,
  children,
  ...props
}) => {
  const theme = useTheme();

  const getTypographyStyle = () => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: theme.typography.fontSize['4xl'],
          fontWeight: theme.typography.fontWeight.bold,
          lineHeight: theme.typography.lineHeight['4xl'],
        };
      case 'h2':
        return {
          fontSize: theme.typography.fontSize['3xl'],
          fontWeight: theme.typography.fontWeight.bold,
          lineHeight: theme.typography.lineHeight['3xl'],
        };
      case 'h3':
        return {
          fontSize: theme.typography.fontSize['2xl'],
          fontWeight: theme.typography.fontWeight.semibold,
          lineHeight: theme.typography.lineHeight['2xl'],
        };
      case 'h4':
        return {
          fontSize: theme.typography.fontSize.xl,
          fontWeight: theme.typography.fontWeight.semibold,
          lineHeight: theme.typography.lineHeight.xl,
        };
      case 'body':
        return {
          fontSize: theme.typography.fontSize.base,
          fontWeight: theme.typography.fontWeight.normal,
          lineHeight: theme.typography.lineHeight.base,
        };
      case 'body2':
        return {
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.normal,
          lineHeight: theme.typography.lineHeight.sm,
        };
      case 'caption':
        return {
          fontSize: theme.typography.fontSize.xs,
          fontWeight: theme.typography.fontWeight.normal,
          lineHeight: theme.typography.lineHeight.xs,
        };
      case 'button':
        return {
          fontSize: theme.typography.fontSize.base,
          fontWeight: theme.typography.fontWeight.semibold,
          lineHeight: theme.typography.lineHeight.base,
        };
      default:
        return {
          fontSize: theme.typography.fontSize.base,
          fontWeight: theme.typography.fontWeight.normal,
          lineHeight: theme.typography.lineHeight.base,
        };
    }
  };

  const getColor = () => {
    switch (color) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.textSecondary;
      case 'text':
        return theme.colors.text;
      case 'textSecondary':
        return theme.colors.textSecondary;
      case 'danger':
        return theme.colors.danger;
      case 'success':
        return theme.colors.success;
      default:
        return theme.colors.text;
    }
  };

  return (
    <Text
      style={[
        getTypographyStyle(),
        { color: getColor() },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export const H1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" {...props} />
);

export const H2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" {...props} />
);

export const H3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" {...props} />
);

export const H4: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h4" {...props} />
);

export const Body: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body" {...props} />
);

export const Body2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body2" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" {...props} />
);

export const ButtonText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="button" {...props} />
); 