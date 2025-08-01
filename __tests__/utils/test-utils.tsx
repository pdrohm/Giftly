import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../../src/theme/ThemeContext';

import authReducer from '../../src/store/slices/authSlice';
import cardsReducer from '../../src/store/slices/cardsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
  },
});

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render }; 