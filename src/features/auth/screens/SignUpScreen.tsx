import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { ScreenContainer } from '../../../components/ui/ScreenContainer';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Icon } from '../../../components/ui/Icon';
import { H2, Body, Caption } from '../../../components/ui/Typography';
import { useSignUpScreen } from '../hooks/useSignUpScreen';
import { useTheme } from '../../../hooks/useTheme';

export const SignUpScreen: React.FC = () => {
  const theme = useTheme();
  const { control, errors, isSubmitting, authError, handleSubmit, handleSignInPress } = useSignUpScreen();

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon 
            name="wallet" 
            size={48} 
            color={theme.colors.primary} 
            style={styles.logo}
          />
          <H2>Create Account</H2>
          <Body color="textSecondary" style={styles.subtitle}>
            Sign up to start managing your gift cards
          </Body>
        </View>

        {authError && (
          <View style={[styles.errorContainer, { backgroundColor: theme.colors.danger + '20' }]}>
            <Caption color="danger" style={styles.errorText}>
              {authError}
            </Caption>
          </View>
        )}

        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="Create a password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          <Button
            title="Create Account"
            onPress={handleSubmit}
            loading={isSubmitting}
            style={styles.signUpButton}
          />

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
            <Caption color="textSecondary" style={styles.dividerText}>
              or
            </Caption>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
          </View>

          <Button
            title="Sign In"
            variant="secondary"
            onPress={handleSignInPress}
            style={styles.signInButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
  errorContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  errorText: {
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  signUpButton: {
    marginTop: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginTop: 8,
  },
}); 