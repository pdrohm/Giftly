import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ScreenContainer } from '../../../components/ui/ScreenContainer';
import { Button } from '../../../components/ui/Button';
import { BarcodeComponent } from '../components/Barcode';
import { useCardDetailsScreen } from '../hooks/useCardDetailsScreen';
import { useTheme } from '../../../hooks/useTheme';

export const CardDetailsScreen: React.FC = () => {
  const theme = useTheme();
  const { card, formatCurrency, formatDate, handleDeletePress } = useCardDetailsScreen();



  if (!card) {
    return (
      <ScreenContainer>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.colors.text }]}>
            Card not found
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.container}>
      
        
        <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
          <View style={styles.header}>
            <Text style={[styles.brand, { color: theme.colors.text }]}>
              {card.brand}
            </Text>
            <Text style={[styles.amount, { color: theme.colors.primary }]}>
              {formatCurrency(card.amount)}
            </Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Brand
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {card.brand}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Amount
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {formatCurrency(card.amount)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Expiration Date
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {formatDate(card.expirationDate)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Added
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {formatDate(card.createdAt)}
            </Text>
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
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: 24,
    fontWeight: '700',
  },
  amount: {
    fontSize: 28,
    fontWeight: '700',
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
    fontSize: 16,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    marginTop: 32,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '500',
  },
}); 