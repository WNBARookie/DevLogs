import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../src/routes/ProtectedRoute';
import { useAuth } from '../../src/context/useAuth';
import '../base';

vi.mock('../../src/context/useAuth', () => ({
  useAuth: vi.fn(),
}));

const mockUseAuth = (isLoggedIn = false) => {
  (useAuth as unknown as vi.Mock).mockReturnValue({
    isLoggedIn: () => isLoggedIn,
  });
};
describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when authenticated', () => {
    mockUseAuth(true);

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to / when not authenticated', () => {
    mockUseAuth(false);

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<div>Landing Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Landing Page')).toBeInTheDocument();
  });
});
