import { ApiResponse } from '../utils';
import asyncHandler from 'express-async-handler';

// @desc    Create new category
// @route   POST /api/categories
// @access  Public
export const createCategory = asyncHandler(async (req, res, next) => {
  next(ApiResponse.goodRequest('Not implemented', 'This create category endpoint is not implemented yet.', 200, req.originalUrl));
});

// @desc    Get all categories for a logged in user
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res, next) => {
  next(ApiResponse.goodRequest('Not implemented', 'This get categories endpoint is not implemented yet.', 200, req.originalUrl));
});

// @desc    Get category detais by id and all categories for it
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryDetails = asyncHandler(async (req, res, next) => {
  next(ApiResponse.goodRequest('Not implemented', 'This get categories details endpoint is not implemented yet.', 200, req.originalUrl));
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Public
export const updateCategory = asyncHandler(async (req, res, next) => {
  next(ApiResponse.goodRequest('Not implemented', 'This update category endpoint is not implemented yet.', 200, req.originalUrl));
});

// @desc    Delete category
// @route   POST /api/categories/:id
// @access  Public
export const deleteCategory = asyncHandler(async (req, res, next) => {
  next(ApiResponse.goodRequest('Not implemented', 'This delete category endpoint is not implemented yet.', 200, req.originalUrl));
});

// @desc    Generate category summary
// @route   GET /api/categories/:id/summary
// @access  Public
export const getCategorySummary = asyncHandler(async (req, res, next) => {
  next(ApiResponse.goodRequest('Not implemented', 'This get category summary endpoint is not implemented yet.', 200, req.originalUrl));
});

// // @access  Private
// // @desc    Get all categories
// // @route   GET /api/categories/all
// export const getAllCategories = expressAsyncHandler(async (req: any, res, next) => {
//   let categories: Category[] = []

//   await CategoryModel.find()
//     .then((data) => {
//       data.forEach(e => {
//         let c: Category = {
//           id: e._id.toString(),
//           category: e.category
//         }
//         categories.push(c);
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, err, 400, req.originalUrl))
//     });

//   res.status(200).json(categories);
// });

// // @access  Private
// // @desc    Get category by id
// // @route   GET /api/categories/:id
// export const getCategoryById = expressAsyncHandler(async (req: any, res, next) => {
//   let category !: Category;
//   await CategoryModel.findById(req.params.id)
//     .then((data) => {
//       if (data) {
//         category = {
//           id: data._id.toString(),
//           category: data.category
//         }
//       }

//     })
//     .catch((err) => {
//       console.log(err);
//       next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, err, 400, req.originalUrl))
//     });

//   res.status(200).json(category);
// });
