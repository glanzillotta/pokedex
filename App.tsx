import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Navigation from './navigation';

export default function App(): React.JSX.Element {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
