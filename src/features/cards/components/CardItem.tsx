import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Platform,
} from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { GiftCard } from '../../../store/slices/cardsSlice';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { Body2, H4 } from '../../../components/ui/Typography';

interface CardItemProps extends TouchableOpacityProps {
  card: GiftCard;
}

export const CardItem: React.FC<CardItemProps> = memo(({ card, style, ...props }) => {
  const theme = useTheme();

  const cardStyle = [
    styles.card,
    {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
    },
    style,
  ];

  return (
    <TouchableOpacity style={cardStyle} activeOpacity={0.8} {...props}>
      <View style={styles.header}>
        <H4>{card.brand}</H4>
        <H4 color="primary">{formatCurrency(card.amount)}</H4>
      </View>
      <View style={styles.footer}>
        <Body2 color="textSecondary">
          Expires: {formatDate(card.expirationDate)}
        </Body2>
      </View>
    </TouchableOpacity>
  );
});

CardItem.displayName = 'CardItem';

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  brand: {
  },
  amount: {
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiration: {
  },
}); 