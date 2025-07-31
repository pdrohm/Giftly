import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Platform,
} from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { GiftCard } from '../../../store/slices/cardsSlice';

interface CardItemProps extends TouchableOpacityProps {
  card: GiftCard;
}

// Extract formatting functions outside component to prevent recreation
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

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
        <Text style={[styles.brand, { color: theme.colors.text }]}>
          {card.brand}
        </Text>
        <Text style={[styles.amount, { color: theme.colors.primary }]}>
          {formatCurrency(card.amount)}
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.expiration, { color: theme.colors.textSecondary }]}>
          Expires: {formatDate(card.expirationDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

CardItem.displayName = 'CardItem';

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
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
    fontSize: 18,
    fontWeight: '600',
  },
  amount: {
    fontSize: 20,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiration: {
    fontSize: 14,
  },
}); 