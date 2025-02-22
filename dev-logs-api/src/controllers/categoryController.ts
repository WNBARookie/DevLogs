import expressAsyncHandler from 'express-async-handler';
import { CategoryModel } from '../models';

// @access  Private
// @desc    Get all categories
// @route   GET /api/categories/all
export const getAllCategories = expressAsyncHandler(async (req: any, res) => {
  const categories = await CategoryModel.find();

  res.status(200).json(categories);
});
