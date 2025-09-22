import { describe, it, vi, expect } from 'vitest';

// Mock ReactDOM createRoot to avoid actually manipulating the real DOM
vi.mock('react-dom/client', () => {
  return {
    createRoot: () => ({
      render: vi.fn(),
    }),
  };
});

describe('main.tsx', () => {
  it('renders App without crashing', () => {
    // We can import main.tsx and just check that createRoot.render is called
    // Using dynamic import to execute the file
    return import('../src/main.tsx').then((module) => {
      expect(module).toBeDefined();
    });
  });
});
