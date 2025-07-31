import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarcodeCreatorView, BarcodeFormat } from 'react-native-barcode-creator';
import { useTheme } from '../../../hooks/useTheme';

interface BarcodeProps {
  value: string;
  width?: number;
  height?: number;
  style?: any;
}

export const BarcodeComponent: React.FC<BarcodeProps> = ({
  value,
  width = 300,
  height = 80,
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      <BarcodeCreatorView
        value={value}
        format={BarcodeFormat.CODE128}
        background={theme.colors.background}
        foregroundColor={theme.colors.text}
        style={{ width, height }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
}); 