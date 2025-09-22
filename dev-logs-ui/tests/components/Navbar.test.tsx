import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../src/components/Navbar';
import '../base';

// Import the mocked version so we can control its behavior
import { useAuth } from '../../src/context/useAuth';

describe('Navbar', () => {
  // Mock the useAuth hook
  vi.mock('../../src/context/useAuth', () => ({
    useAuth: vi.fn(),
  }));

  const mockLogout = vi.fn();

  const mockUseAuth = (isLoggedIn = false) => {
    (useAuth as unknown as vi.Mock).mockReturnValue({
      isLoggedIn: () => isLoggedIn,
      logout: mockLogout,
    });
  };

  const renderNavbar = (path = '/home') =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <Navbar />
      </MemoryRouter>
    );

  beforeEach(() => {});

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('does not render on the "/" path', () => {
    mockUseAuth(false);

    renderNavbar('/');

    expect(screen.queryByText(/DevLogs/i)).not.toBeInTheDocument();
  });

  it('renders on other paths', () => {
    mockUseAuth(false);

    renderNavbar('/home');

    expect(screen.getByText(/DevLogs/i)).toBeInTheDocument();
  });

  it('does not show logout button when user is not logged in', () => {
    mockUseAuth(false);

    renderNavbar('/home');

    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

  it('shows logout button when user is logged in', () => {
    mockUseAuth(true);

    renderNavbar('/home');

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('calls logout when clicking the logout button', () => {
    mockUseAuth(true);

    renderNavbar('/home');

    const button = screen.getByText(/Logout/i);
    fireEvent.click(button);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
