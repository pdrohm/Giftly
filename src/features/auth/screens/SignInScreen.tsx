import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { ScreenContainer } from '../../../components/ui/ScreenContainer';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { H2, Body, Caption } from '../../../components/ui/Typography';
import { useSignInScreen } from '../hooks/useSignInScreen';
import { useTheme } from '../../../hooks/useTheme';

export const SignInScreen: React.FC = () => {
  const theme = useTheme();
  const { control, errors, isSubmitting, authError, handleSubmit, handleSignUpPress } = useSignInScreen();

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image 
            source={require('../../../assets/icon.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <H2>Welcome Back</H2>
          <Body color="textSecondary" style={styles.subtitle}>
            Sign in to access your gift cards
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
                placeholder="Enter your password"
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

          <Button
            title="Sign In"
            onPress={handleSubmit}
            loading={isSubmitting}
            style={styles.signInButton}
          />

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
            <Caption color="textSecondary" style={styles.dividerText}>
              or
            </Caption>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
          </View>

          <Button
            title="Create Account"
            variant="secondary"
            onPress={handleSignUpPress}
            style={styles.signUpButton}
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
    width: 200,
    height: 200,
    marginBottom: 12,
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
  signInButton: {
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
  signUpButton: {
    marginTop: 8,
  },
}); 