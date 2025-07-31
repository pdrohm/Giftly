import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from './Icon';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  rightIcon?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  rightIcon,
  style,
  ...props
}) => {
  const theme = useTheme();

  const inputStyle = [
    styles.input,
    {
      backgroundColor: theme.colors.card,
      borderColor: error ? theme.colors.danger : theme.colors.border,
      color: theme.colors.text,
      fontSize: theme.typography.fontSize.base,
    },
    rightIcon && styles.inputWithIcon,
    style,
  ];

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[
          styles.label, 
          { 
            color: theme.colors.text,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
          }
        ]}>
          {label}
        </Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={inputStyle}
          placeholderTextColor={theme.colors.textSecondary}
          {...props}
        />
        {rightIcon && (
          <View style={styles.iconContainer}>
            <Icon name={rightIcon} size={20} color={theme.colors.textSecondary} />
          </View>
        )}
      </View>
      {(error || helper) && (
        <Text
          style={[
            styles.helper,
            { 
              color: error ? theme.colors.danger : theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.xs,
            },
          ]}
        >
          {error || helper}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputWithIcon: {
    paddingRight: 48,
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  helper: {
    marginTop: 4,
  },
}); 