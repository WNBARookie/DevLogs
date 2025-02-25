import expressAsyncHandler from 'express-async-handler';
import { CategoryModel } from '../models';
import { ApiResponse } from '../utils';
import { MessageConstants } from '../constants';
import { Category } from '../interfaces';

// @access  Private
// @desc    Get all categories
// @route   GET /api/categories/all
export const getAllCategories = expressAsyncHandler(async (req: any, res, next) => {
  let categories: Category[] = []
  
  await CategoryModel.find()
    .then((data) => {
      data.forEach(e => {
        let c: Category = {
          id: e._id.toString(),
          category: e.category
        }
        categories.push(c);
      });
    })
    .catch((err) => next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, err, 400, req.originalUrl)));

  res.status(200).json(categories);
});
