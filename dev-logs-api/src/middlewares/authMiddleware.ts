import asyncHandler from 'express-async-handler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel } from '../models';
import { MessageConstants } from '../constants/messages';
import { ApiResponse } from '../utils/ApiResponse';

export const protect = asyncHandler(async (req: any, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as JwtPayload;

      // get user from token
      req.user = await UserModel.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      next(ApiResponse.badRequest(MessageConstants.errorMessages.notAuthorized, MessageConstants.errorMessages.userNotAuthorized, 401, req.originalUrl));
      return;
    }
  }

  if (!token) {
    next(ApiResponse.badRequest(MessageConstants.errorMessages.notAuthorizedNoToken, MessageConstants.errorMessages.notAuthorizedNoTokenDetails, 401, req.originalUrl));
    return;
  }
});

// bearer format is: Bearer TOKEN
