import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { ScreenContainer } from '../../../components/ui/ScreenContainer';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Icon } from '../../../components/ui/Icon';
import { DateInput } from '../../../components/ui/DateInput';
import { useAddCardScreen } from '../hooks/useAddCardScreen';
import { useTheme } from '../../../hooks/useTheme';

export const AddCardScreen: React.FC = () => {
  const theme = useTheme();
  const { control, errors, isSubmitting, handleSubmit } = useAddCardScreen();

  return (
    <ScreenContainer scrollable>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon 
            name="add-card" 
            size={32} 
            color={theme.colors.primary} 
            style={styles.headerIcon}
          />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Add Gift Card
          </Text>
        </View>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Enter the details of your gift card
        </Text>

        <View style={styles.form}>
          <Controller
            control={control}
            name="brand"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Brand"
                placeholder="e.g., Amazon, Starbucks, Target"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.brand?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Amount"
                placeholder="0.00"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.amount?.message}
                keyboardType="decimal-pad"
              />
            )}
          />

          <Controller
            control={control}
            name="expirationDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <DateInput
                label="Expiration Date"
                placeholder="MM/DD/YYYY"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.expirationDate?.message}
                minimumDate={new Date()}
              />
            )}
          />

          <Button
            title="Save Card"
            onPress={handleSubmit}
            loading={isSubmitting}
            style={styles.submitButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerIcon: {
    marginRight: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  form: {
    flex: 1,
  },
  submitButton: {
    marginTop: 24,
  },
}); 