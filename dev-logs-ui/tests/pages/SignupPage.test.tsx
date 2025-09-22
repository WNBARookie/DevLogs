import { describe, it, vi, beforeEach, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from '../../src/pages/SignupPage';
import { useAuth } from '../../src/context/useAuth';
import '../base';

vi.mock('../../src/context/useAuth', () => ({
  useAuth: vi.fn(),
}));

describe('SignupPage', () => {
  const mockRegisterUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as vi.Mock).mockReturnValue({
      registerUser: mockRegisterUser,
    });
  });

  const renderSignupPage = () =>
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

  it('renders form inputs and submit button', () => {
    renderSignupPage();

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/go to/i)).toBeInTheDocument();
  });

  it('shows validation errors when fields are empty or invalid', async () => {
    renderSignupPage();

    const button = screen.getByRole('button', { name: /sign up/i });
    await userEvent.click(button);

    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('calls registerUser with correct data', async () => {
    renderSignupPage();

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    await userEvent.type(usernameInput, 'myuser');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    await userEvent.click(submitButton);

    expect(mockRegisterUser).toHaveBeenCalledWith({
      username: 'myuser',
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('has a login link pointing to /login', () => {
    renderSignupPage();

    const loginLink = screen.getByText(/log in/i).closest('a');
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
