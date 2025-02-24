import expressAsyncHandler from 'express-async-handler';
import { CategoryModel } from '../models';
import { ApiResponse } from '../utils';

// @access  Private
// @desc    Get all categories
// @route   GET /api/categories/all
export const getAllCategories = expressAsyncHandler(async (req: any, res, next) => {
  const categories = await CategoryModel.find()
    .then((data) => data)
    .catch((err) => next(ApiResponse.badRequest('Error', err, 400, req.originalUrl)));

  res.status(200).json(categories);
});
