import type { ApiResponse, AuthenticateUserRequestBody, CreateUserRequestBody } from '../types';
import axios from 'axios';
import { handleError } from '../utils/ErrorHandler';
import { EndpointsConfig } from '../config/endpoints.config';

export const loginAPI = async (requestBody: AuthenticateUserRequestBody) => {
  try {
    const data = await axios.post<ApiResponse>(EndpointsConfig.userData.authenticateUser, requestBody);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (requestBody: CreateUserRequestBody) => {
  try {
    const data = await axios.post<ApiResponse>(EndpointsConfig.userData.registerUser, requestBody);

    return data;
  } catch (error) {
    handleError(error);
  }
};
