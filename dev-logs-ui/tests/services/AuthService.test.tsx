import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios, { AxiosResponse } from 'axios';
import { loginAPI, registerAPI } from '../../src/services/AuthService';
import { EndpointsConfig } from '../../src/config/endpoints.config';
import { handleError } from '../../src/utils/ErrorHandler';
import type { ApiResponse, AuthenticateUserRequestBody, CreateUserRequestBody } from '../../src/types';

vi.mock('axios');
vi.mock('../../src/utils/ErrorHandler', () => ({
  handleError: vi.fn(),
}));

const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>;
};

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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

  const validAuthenticateUserRequestBody: AuthenticateUserRequestBody = { email: 'test@test.com', password: '123' };
  const validCreateUserRequestBody: CreateUserRequestBody = { username: 'testUser', email: 'test@test.com', password: '123' };

  it('loginAPI should call axios.post with correct args and return data', async () => {
    mockedAxios.post = vi.fn().mockResolvedValue(successMockAPIResponse);

    const result = await loginAPI(validAuthenticateUserRequestBody);

    expect(mockedAxios.post).toHaveBeenCalledWith(EndpointsConfig.userData.authenticateUser, validAuthenticateUserRequestBody);
    expect(result).toEqual(successMockAPIResponse);
  });

  it('loginAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.post = vi.fn().mockRejectedValue(error);

    await loginAPI(validAuthenticateUserRequestBody);

    expect(handleError).toHaveBeenCalledWith(error);
  });

  it('registerAPI should call axios.post with correct args and return data', async () => {
    mockedAxios.post = vi.fn().mockResolvedValue(successMockAPIResponse);

    const result = await registerAPI(validCreateUserRequestBody);

    expect(mockedAxios.post).toHaveBeenCalledWith(EndpointsConfig.userData.registerUser, validCreateUserRequestBody);
    expect(result).toEqual(successMockAPIResponse);
  });

  it('registerAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.post = vi.fn().mockRejectedValue(error);

    await registerAPI(validCreateUserRequestBody);

    expect(handleError).toHaveBeenCalledWith(error);
  });
});
