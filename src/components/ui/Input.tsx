import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
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
    },
    style,
  ];

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={inputStyle}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
      />
      {(error || helper) && (
        <Text
          style={[
            styles.helper,
            { color: error ? theme.colors.danger : theme.colors.textSecondary },
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
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  helper: {
    fontSize: 12,
    marginTop: 4,
  },
}); 