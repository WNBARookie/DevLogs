import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../../src/pages/LoginPage';
import { useAuth } from '../../src/context/useAuth';
import '../base';

vi.mock('../../src/context/useAuth', () => ({
  useAuth: vi.fn(),
}));

describe('LoginPage', () => {
  const mockLoginUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as vi.Mock).mockReturnValue({
      loginUser: mockLoginUser,
    });
  });

  const renderLoginPage = () =>
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

  it('renders the form inputs and submit button', () => {
    renderLoginPage();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(screen.getByText(/don’t have an account yet/i)).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty', async () => {
    renderLoginPage();

    fireEvent.click(screen.getByTestId('login-button'));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('calls loginUser with correct data', async () => {
    renderLoginPage();
    const emailInput = screen.getByTestId('email-field');
    const passwordInput = screen.getByTestId('password-field');
    const loginButton = screen.getByTestId('login-button');

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'test@example.com');

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'password123');

    await userEvent.click(loginButton);

    expect(mockLoginUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('has a signup link pointing to /signup', () => {
    renderLoginPage();

    const signupLink = screen.getByTestId('signup-button').closest('a');
    expect(signupLink).toHaveAttribute('href', '/signup');
  });
});
