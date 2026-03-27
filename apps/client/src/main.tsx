import { initAnalytics } from '@pinback/analytics';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

initAnalytics({
  apiKey: import.meta.env.VITE_AMPLITUDE_API_KEY,
  isDev: import.meta.env.DEV,
});
import { QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from '@shared/apis/setting/query/getQueryClient.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = getQueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
