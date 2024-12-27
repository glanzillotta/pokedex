import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Navigation from './navigation';
import {Provider} from 'react-redux';
import {store} from './store/store.ts';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App(): React.JSX.Element {
  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
