import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {HomePage} from './pages';

export default function App(): React.JSX.Element {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
}
