import { describe, expect, it } from 'vitest';
import { QueryClientProvider, QueryClient } from 'react-query';

import App from './App';
import { AppProvider } from './context';
import { render, screen} from '../test-utils';

// ToDo: add more tests
describe('Simple working test', () => {
  it('the title is visible', () => {
    const queryClient = new QueryClient();
    window.matchMedia = vi.fn().mockImplementation(() => {
      return {
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });

    render(
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AppProvider>
    );

    expect(screen.getByText('My Photo Album')).toBeInTheDocument();
  });
});
