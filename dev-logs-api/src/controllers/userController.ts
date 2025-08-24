import asyncHandler from 'express-async-handler';
import { MessageConstants } from '../constants';
import { AuthenticateUserRequestBody, CreateUserRequestBody, User } from '../interfaces';
import { handleBadRequest, handleGoodRequest, isInvalidRequestBody } from '../utils';
import { userExists, authenticateUserHelper, getFormattedUserById } from '../services';
import { createUser } from '../repositories';

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const requestBody = req.body as CreateUserRequestBody;
  if (isInvalidRequestBody(requestBody, ['username', 'email', 'password', 'name'])) {
    return handleBadRequest(next, MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addAllFields, req.originalUrl);
  }

  const { username, email } = requestBody;

  const userAlreadyExists = await userExists(email, username);
  if (userAlreadyExists) {
    return handleBadRequest(next, MessageConstants.errorMessages.userExists, MessageConstants.errorMessages.userExists, req.originalUrl);
  }

  const user = await createUser(requestBody);

  if (user) {
    return handleGoodRequest(next, MessageConstants.successMessages.successfullyCreated, MessageConstants.successMessages.userSuccessfullyCreated, req.originalUrl);
  } else {
    return handleBadRequest(next, MessageConstants.errorMessages.unableToCreate, MessageConstants.errorMessages.userNotCreated, req.originalUrl);
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const authenticateUser = asyncHandler(async (req, res, next) => {
  const requestBody = req.body as AuthenticateUserRequestBody;

  const token = await authenticateUserHelper(requestBody);

  if (token) {
    return handleGoodRequest(next, MessageConstants.successMessages.successfullyLoggedIn, MessageConstants.successMessages.userSuccessfullyLoggedIn, req.originalUrl, token);
  } else {
    return handleBadRequest(next, MessageConstants.errorMessages.invalidCredentials, MessageConstants.errorMessages.invalidCredentialsDetails, req.originalUrl);
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
export const getMe = asyncHandler(async (req: any, res) => {
  const user = await getFormattedUserById(req.user.id);
  res.status(200).json(user);
});
