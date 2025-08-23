import { ApiResponse } from '../utils';
import asyncHandler from 'express-async-handler';

// @desc    Create new area
// @route   POST /api/areas
// @access  Public
export const createArea = asyncHandler(async (req, res, next) => {
  next(ApiResponse.goodRequest('Not implemented', 'This create area endpoint is not implemented yet.', 200, req.originalUrl));
});

// @desc    Get all areas for a logged in user
// @route   GET /api/areas
// @access  Public
export const getAreas = asyncHandler(async (req, res, next) => {
  next(ApiResponse.goodRequest('Not implemented', 'This get areas endpoint is not implemented yet.', 200, req.originalUrl));
});

// @desc    Get area detais by id and all projects for it
// @route   GET /api/areas/:id
// @access  Public
export const getAreaDetails = asyncHandler(async (req, res, next) => {
  next(ApiResponse.goodRequest('Not implemented', 'This get areas details endpoint is not implemented yet.', 200, req.originalUrl));
});

// @desc    Update area
// @route   PUT /api/areas/:id
// @access  Public
export const updateArea = asyncHandler(async (req, res, next) => {
  next(ApiResponse.goodRequest('Not implemented', 'This update area endpoint is not implemented yet.', 200, req.originalUrl));
});

// @desc    Delete area
// @route   POST /api/areas/:id
// @access  Public
export const deleteArea = asyncHandler(async (req, res, next) => {
  next(ApiResponse.goodRequest('Not implemented', 'This delete area endpoint is not implemented yet.', 200, req.originalUrl));
});

// @desc    Generate area summary
// @route   GET /api/areas/:id/summary
// @access  Public
export const getAreaSummary = asyncHandler(async (req, res, next) => {
  next(ApiResponse.goodRequest('Not implemented', 'This get area summary endpoint is not implemented yet.', 200, req.originalUrl));
});
