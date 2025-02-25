import expressAsyncHandler from 'express-async-handler';
import { ApiResponse } from '../utils';
import { MessageConstants } from '../constants';

// @route   GET /api/items/:id
// @access  Private
// @desc    Get all items for a project
export const getAllItemsForProject = expressAsyncHandler(async (req: any, res, next) => {

    return;
})

// @access  Private
// @desc    Get item by id
// @route   GET /api/items/item/:id
export const getItemById = expressAsyncHandler(async (req: any, res, next) => {

    return;
})


// @access  Private
// @desc    Create item
// @route   POST /api/items/:id
export const createItem = expressAsyncHandler(async (req: any, res, next) => {

    return;
})


// @access  Private
// @desc    Update item
// @route   PUT /api/items/:id
export const updateItem = expressAsyncHandler(async (req: any, res, next) => {

    return;
})


// @access  Private
// @desc    Delete item
// @route   DELETE /api/items/:id
export const deleteItem = expressAsyncHandler(async (req: any, res, next) => {

    return;
})
