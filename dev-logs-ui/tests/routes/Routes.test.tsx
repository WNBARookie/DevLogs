import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { createMemoryRouter } from 'react-router-dom';
import { router as appRouter } from '../../src/routes/Routes';

import { useAuth } from '../../src/context/useAuth';
vi.mock('../../src/context/useAuth', async () => {
  const actual = await vi.importActual<typeof import('../../src/context/useAuth')>('../../src/context/useAuth');
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

const mockUseAuth = (isLoggedIn = false) => {
  (useAuth as unknown as vi.Mock).mockReturnValue({
    isLoggedIn: () => isLoggedIn,
  });
};
describe('App Router with ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders public routes (LandingPage) by default', () => {
    mockUseAuth(false);

    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/DevLogs/i)).toBeInTheDocument();
  });

  it('renders NotFoundPage for invalid route', () => {
    mockUseAuth(true);

    const router = createMemoryRouter(appRouter.routes, {
      initialEntries: ['/does-not-exist'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });
});
