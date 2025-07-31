import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  CardDetails: { cardId: string };
};

export type MainTabParamList = {
  MyCards: undefined;
  AddCard: undefined;
  Settings: undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
}; 