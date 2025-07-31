import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../../components/ui/ScreenContainer';
import { Button } from '../../../components/ui/Button';
import { BarcodeComponent } from '../components/Barcode';
import { H3, H4, Body } from '../../../components/ui/Typography';
import { useCardDetailsScreen } from '../hooks/useCardDetailsScreen';
import { useTheme } from '../../../hooks/useTheme';

export const CardDetailsScreen: React.FC = () => {
  const theme = useTheme();
  const { card, formatCurrency, formatDate, formatISODate, handleDeletePress } =
    useCardDetailsScreen();

  if (!card) {
    return (
      <ScreenContainer>
        <View style={styles.errorContainer}>
          <Body style={styles.errorText}>Card not found</Body>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.header}>
            <H3>{card.brand}</H3>
            <H4 color="primary">{formatCurrency(card.amount)}</H4>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Body color="textSecondary">Brand</Body>
            <Body>{card.brand}</Body>
          </View>

          <View style={styles.detailRow}>
            <Body color="textSecondary">Amount</Body>
            <Body>{formatCurrency(card.amount)}</Body>
          </View>

          <View style={styles.detailRow}>
            <Body color="textSecondary">Expiration Date</Body>
            <Body>{formatDate(card.expirationDate)}</Body>
          </View>

          <View style={styles.detailRow}>
            <Body color="textSecondary">Added</Body>
            <Body>{formatISODate(card.createdAt)}</Body>
          </View>
        </View>
        <BarcodeComponent
          value={card.id}
          width={300}
          height={100}
          style={styles.barcode}
        />

        <Button
          title="Delete Card"
          variant="danger"
          onPress={handleDeletePress}
          style={styles.deleteButton}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barcode: {
    marginBottom: 24,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
  },
  amount: {
  },
  details: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  label: {
  },
  value: {
  },
  deleteButton: {
    marginTop: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
  },
});
