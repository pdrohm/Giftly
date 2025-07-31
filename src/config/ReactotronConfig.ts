import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

const reactotron = Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'Giftly App',
    host: __DEV__ ? '192.168.16.105' : undefined,
  })
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate|logs/,
    },
    editor: false,
    errors: { veto: (_stackFrame) => false },
    overlay: false,
  })
  .use(reactotronRedux())
  .connect();

if (__DEV__) {
  reactotron.clear?.();
}

console.tron = reactotron;

export default reactotron; 