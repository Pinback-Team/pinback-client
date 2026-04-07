import { initAnalytics } from '@pinback/analytics';
import { createRoot } from 'react-dom/client';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from './apis/query/getQueryClient';

initAnalytics({
  apiKey: import.meta.env.VITE_AMPLITUDE_API_KEY,
  isDev: import.meta.env.DEV,
});

const queryClient = getQueryClient();

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
} else {
  console.error('❌ root element not found!');
}
