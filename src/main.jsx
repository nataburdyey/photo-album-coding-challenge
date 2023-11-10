import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';

import App from './App';
import './index.css';
import { AppProvider } from './context';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AppProvider>
);
