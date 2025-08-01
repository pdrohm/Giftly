import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { setUser } from '../store/slices/authSlice';
import { useUserCards } from '../hooks/useUserCards';
import { useTheme } from '../hooks/useTheme';
import { MainTabNavigator } from './MainTabNavigator';
import { CardDetailsScreen } from '../features/cards/screens/CardDetailsScreen';
import { AuthNavigator } from './AuthNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [initializing, setInitializing] = useState(true);
  const theme = useTheme();

  useUserCards();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        }));
      } else {
        dispatch(setUser(null));
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, [dispatch]);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <React.Fragment>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen 
              name="CardDetails" 
              component={CardDetailsScreen}
              options={({ route: _route }) => ({
                headerShown: true,
                title: 'Card Details',
                headerBackTitle: 'List',
                headerTintColor: theme.colors.text,
                headerStyle: {
                  backgroundColor: theme.colors.background,
                },
              })}
            />
          </React.Fragment>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 