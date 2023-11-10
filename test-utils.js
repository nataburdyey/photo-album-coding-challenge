import { render } from '@testing-library/react';
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

const customRender = (ui, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });

// override render export
export { customRender as render };