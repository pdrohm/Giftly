import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../hooks/useTheme';
import { MainTabParamList } from './types';
import { MyCardsScreen } from '../features/cards/screens/MyCardsScreen';
import { AddCardScreen } from '../features/cards/screens/AddCardScreen';
import { SettingsScreen } from '../features/settings/screens/SettingsScreen';
import { Icon } from '../components/ui/Icon';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 88,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="MyCards"
        component={MyCardsScreen}
        options={{
          title: '',
          tabBarLabel: 'Cards',
          tabBarIcon: ({ color, size }) => (
            <Icon name="card-giftcard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddCard"
        component={AddCardScreen}
        options={{
          title: 'Add Card',
          tabBarLabel: 'Add',
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-card" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 