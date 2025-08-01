import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import your slices
import authReducer from '../../src/store/slices/authSlice';
import cardsReducer from '../../src/store/slices/cardsSlice';

// Create a test store
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
        {children}
      </SafeAreaProvider>
    </Provider>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react-native';

// Override render method
export { customRender as render }; 