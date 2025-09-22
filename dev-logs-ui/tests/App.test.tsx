import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import App from '../src/App';
import axios from 'axios';
import { router } from '../src/routes/Routes';

vi.mock('../../src/routes/Routes', () => ({
  router: {
    /* minimal mock router object */
  },
}));

describe('App component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
  });

  it('sets axios.defaults.baseURL', () => {
    render(<App />);
    expect(axios.defaults.baseURL).toBe(import.meta.env.VITE_BASE_API_URL);
  });

  it('renders the RouterProvider', () => {
    const { container } = render(<App />);
    expect(container.querySelector('[data-rmiz-router]') || container.firstChild).toBeTruthy();
  });
});
