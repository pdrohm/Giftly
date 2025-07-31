import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { setUser } from '../store/slices/authSlice';
import { useUserCards } from '../hooks/useUserCards';
import { MainTabNavigator } from './MainTabNavigator';
import { CardDetailsScreen } from '../features/cards/screens/CardDetailsScreen';
import { AuthNavigator } from './AuthNavigator';
import { RootStackParamList } from './types';
import { colors } from '@/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [initializing, setInitializing] = useState(true);

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
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen 
              name="CardDetails" 
              component={CardDetailsScreen}
              options={{
                headerShown: true,
                title: 'Card Details',
                headerBackTitle: 'List',
                headerTintColor: colors.dark.text,
                headerStyle: {
                  backgroundColor: colors.dark.background,
                },
              }}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 