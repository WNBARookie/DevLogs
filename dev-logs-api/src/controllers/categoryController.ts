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
    .catch((err) => { 
      console.log(err); 
      next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, err, 400, req.originalUrl)) 
    });

  res.status(200).json(categories);
});

// @access  Private
// @desc    Get category by id
// @route   GET /api/categories/:id
export const getCategoryById = expressAsyncHandler(async (req: any, res, next) => {
  let category !: Category;
  await CategoryModel.findById(req.params.id)
    .then((data) => {
      if (data) {
        category = {
          id: data._id.toString(),
          category: data.category
        }
      }

    })
    .catch((err) => { 
      console.log(err); 
      next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, err, 400, req.originalUrl)) 
    });

  res.status(200).json(category);
});