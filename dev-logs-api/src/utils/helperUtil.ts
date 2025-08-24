import { NextFunction } from 'express';
import { ApiResponse } from './ApiResponse';

// Helper function to handle bad requests
export const handleBadRequest = (next: NextFunction, message: string, details: string, url: string) => {
  next(ApiResponse.badRequest(message, details, 400, url));
};

// Helper function to handle good requests
export const handleGoodRequest = (next: NextFunction, message: string, details: string, url: string, token?: string) => {
  next(ApiResponse.goodRequest(message, details, 200, url, token));
};

// validate request body
export const isInvalidRequestBody = (req: any, requiredFields: string[]): boolean => {
  return requiredFields.some((field) => !req[field]);
};
