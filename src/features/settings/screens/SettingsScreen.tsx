import React from 'react';
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { ScreenContainer } from '../../../components/ui/ScreenContainer';
import { Button } from '../../../components/ui/Button';
import { H4, Body, Caption } from '../../../components/ui/Typography';
import { ThemeToggle } from '../../../components/ui/ThemeToggle';
import { useSettingsScreen } from '../hooks/useSettingsScreen';
import { useTheme } from '../../../hooks/useTheme';

export const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const { user, appVersion, handleSignOut } = useSettingsScreen();

  const handleSignOutPress = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: handleSignOut },
      ]
    );
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
      
        <View style={styles.section}>
          <H4 style={styles.sectionTitle}>Account</H4>
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Caption color="textSecondary" style={styles.label}>
              Email
            </Caption>
            <Body style={styles.value}>
              {user?.email || 'Not available'}
            </Body>
          </View>
        </View>

          <View style={styles.section}>
          <H4 style={styles.sectionTitle}>Appearance</H4>
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <ThemeToggle />
          </View>
        </View>


        <View style={styles.section}>
          <H4 style={styles.sectionTitle}>App</H4>
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Caption color="textSecondary" style={styles.label}>
              Version
            </Caption>
            <Body style={styles.value}>
              {appVersion}
            </Body>
          </View>
        </View>

        <View style={styles.section}>
          <Button
            title="Sign Out"
            variant="danger"
            onPress={handleSignOutPress}
            style={styles.signOutButton}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  label: {
    marginBottom: 4,
  },
  value: {
  },
  signOutButton: {
    marginTop: 16,
  },
}); 