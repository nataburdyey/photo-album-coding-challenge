import { describe, expect, it } from 'vitest';
import App from './App';
import { render, screen, userEvent } from '../test-utils';

// ToDo - render app and add more tests
describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />);
    const welcomeText = screen.getByText('My Photo Album');
    screen.debug(welcomeText);
    expect(screen.getByText('My Photo Album')).toBeInTheDocument();
  });
});
