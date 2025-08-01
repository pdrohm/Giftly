import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { RootNavigator } from './navigation/RootNavigator';
import { ThemeProvider } from './theme/ThemeContext';
import Toast from 'react-native-toast-message';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <RootNavigator />
          <Toast />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App; 