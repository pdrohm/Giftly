import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {MaterialIcons} from '@react-native-vector-icons/material-icons';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#000000',
  style,
}) => {
  return (
    <MaterialIcons
      name={name as any}
      size={size}
      color={color}
      style={style}
    />
  );
}; 