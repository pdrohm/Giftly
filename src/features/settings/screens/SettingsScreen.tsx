import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { ScreenContainer } from '../../../components/ui/ScreenContainer';
import { Button } from '../../../components/ui/Button';
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
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Account
          </Text>
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Email
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {user?.email || 'Not available'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            App
          </Text>
          <View style={[styles.card, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
              Version
            </Text>
            <Text style={[styles.value, { color: theme.colors.text }]}>
              {appVersion}
            </Text>
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
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  signOutButton: {
    marginTop: 16,
  },
}); 