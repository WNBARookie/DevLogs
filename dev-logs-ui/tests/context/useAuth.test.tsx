import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuth, UserProvider } from '../../src/context/useAuth';
import { toast } from 'react-toastify';
import '../base';
import { ApiResponse, AuthenticateUserRequestBody, CreateUserRequestBody } from '../../src/types';
import * as AuthService from '../../src/services/AuthService';
import { AxiosResponse } from 'axios';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../../src/services/AuthService');
vi.mock('react-toastify', () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn() },
}));

describe('UserProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const successMockAPIResponse: AxiosResponse<ApiResponse, any> = {
    data: {
      status: 200,
      details: 'Successful',
      summary: 'summary',
      instance: '/users',
      timeStamp: new Date(),
      token: '123',
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };

  const errorMockAPIResponse: AxiosResponse<ApiResponse, any> = {
    data: {
      status: 400,
      details: 'Error',
      summary: 'summary',
      instance: '/users',
      timeStamp: new Date(),
      token: '123',
    },
    status: 400,
    statusText: 'OK',
    headers: {},
    config: {},
  };

  const validAuthenticateUserRequestBody: AuthenticateUserRequestBody = { email: 'test@test.com', password: '123' };
  const validCreateUserRequestBody: CreateUserRequestBody = { username: 'testUser', email: 'test@test.com', password: '123' };

  const TestLoginButton = () => {
    const { loginUser } = useAuth();
    return (
      <button data-testid="login" onClick={() => loginUser(validAuthenticateUserRequestBody)}>
        Login
      </button>
    );
  };

  const TestRegisterButton = () => {
    const { registerUser } = useAuth();
    return (
      <button data-testid="register" onClick={() => registerUser(validCreateUserRequestBody)}>
        Register
      </button>
    );
  };

  const renderWithProvider = (ui: React.ReactNode) => render(<UserProvider>{ui}</UserProvider>);

  it('initializes with token from localStorage', () => {
    localStorage.setItem('token', 'mockToken');
    renderWithProvider(<span>child</span>);
    expect(screen.getByText('child')).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBe('mockToken');
  });

  it('should login user, store token, and show success toast', async () => {
    vi.spyOn(AuthService, 'loginAPI').mockResolvedValue(successMockAPIResponse);

    renderWithProvider(<TestLoginButton />);

    fireEvent.click(screen.getByTestId('login'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('123');
      expect(toast.success).toHaveBeenCalledWith('Successful');
    });
  });

  it('should show warning toast if login throws an error', async () => {
    vi.spyOn(AuthService, 'loginAPI').mockRejectedValue(new Error('Network error'));

    renderWithProvider(<TestLoginButton />);

    fireEvent.click(screen.getByTestId('login'));

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith('Server error occured.');
    });
  });

  it('should register user and show success toast', async () => {
    vi.spyOn(AuthService, 'registerAPI').mockResolvedValue(successMockAPIResponse);

    renderWithProvider(<TestRegisterButton />);

    fireEvent.click(screen.getByTestId('register'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Successful');
    });
  });

  it('should attempt to register user and show error toast on failure', async () => {
    vi.spyOn(AuthService, 'registerAPI').mockResolvedValue(errorMockAPIResponse);

    renderWithProvider(<TestRegisterButton />);

    fireEvent.click(screen.getByTestId('register'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error');
    });
  });

  it('should show warning toast if register throws an error', async () => {
    vi.spyOn(AuthService, 'registerAPI').mockRejectedValue(new Error('Network error'));

    renderWithProvider(<TestRegisterButton />);

    fireEvent.click(screen.getByTestId('register'));

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith('Server error occured.');
    });
  });

  it('should logout a user, clear tokens, and set isLoggedIn false', async () => {
    const TestLogoutStatus = () => {
      const { logout, isLoggedIn } = useAuth();
      return (
        <>
          <button data-testid="logout" onClick={logout}>
            Logout
          </button>
          <span data-testid="status">{isLoggedIn() ? 'true' : 'false'}</span>
        </>
      );
    };

    localStorage.setItem('token', 'mockToken');

    renderWithProvider(<TestLogoutStatus />);

    fireEvent.click(screen.getByTestId('logout'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeNull();
      expect(screen.getByTestId('status')).toHaveTextContent('false');
    });
  });
});
