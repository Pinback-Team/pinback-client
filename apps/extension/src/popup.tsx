import { createRoot } from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
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
