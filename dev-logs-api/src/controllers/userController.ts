import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel';

import { MessageConstants } from '../constants';
import { User } from '../interfaces';
import { ApiResponse } from '../utils';
import { convertUser } from '../services';

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, name } = req.body;
  if (!username || !email || !password || !name) {
    next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addAllFields, 400, req.originalUrl));
    return;
  }

  //   check if user exists
  const userExistsEmail = await UserModel.findOne({ email });
  const userExistsUsername = await UserModel.findOne({ username });

  if (userExistsEmail) {
    next(ApiResponse.badRequest(MessageConstants.errorMessages.userExists, MessageConstants.errorMessages.userExistsEmail, 400, req.originalUrl));
    return;
  }

  if (userExistsUsername) {
    next(ApiResponse.badRequest(MessageConstants.errorMessages.userExists, MessageConstants.errorMessages.userExistsUsername, 400, req.originalUrl));
    return;
  }

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   create user
  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
    name,
  });

  if (user) {
    next(ApiResponse.goodRequest(MessageConstants.successMessages.successfullyCreated, MessageConstants.successMessages.userSuccessfullyCreated, 200, req.originalUrl));
    return;
  } else {
    next(ApiResponse.badRequest(MessageConstants.errorMessages.unableToCreate, MessageConstants.errorMessages.userNotCreated, 400, req.originalUrl));
    return;
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const authenticateUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //   check for user email
  const user = await UserModel.findOne({ email: new RegExp(`^${email}$`, 'i') });

  if (user && user.password && (await bcrypt.compare(password, user.password))) {
    next(
      ApiResponse.goodRequest(
        MessageConstants.successMessages.successfullyLoggedIn,
        MessageConstants.successMessages.userSuccessfullyLoggedIn,
        200,
        req.originalUrl,
        generateToken(user._id.toString())
      )
    );
    return;
  } else {
    next(ApiResponse.badRequest(MessageConstants.errorMessages.invalidCredentials, MessageConstants.errorMessages.invalidCredentialsDetails, 400, req.originalUrl));
    return;
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
export const getMe = asyncHandler(async (req: any, res) => {
  let user = await UserModel.findById(req.user.id);
  let convertedUser = convertUser(user);

  let userData: User = {
    id: convertedUser.id,
    username: convertedUser.username,
    email: convertedUser.email,
    name: convertedUser.name,
  };
  res.status(200).json(userData);
});

// generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, { expiresIn: '30d' });
};
