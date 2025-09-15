import { MessageConstants } from '../constants';
import { CreateItemRequestBody, UpdateItemRequestBody } from '../interfaces';
import { getProjectById } from '../repositories';
import { deleteItemById, getItemById, getItemsForUser, mongoCreateItem, mongoUpdateItem } from '../repositories/itemRepository';
import { convertItem } from '../services';
import { itemExists } from '../services/itemService';
import { ApiResponse, handleBadRequest, handleGoodRequest, isInvalidRequestBody } from '../utils';
import asyncHandler from 'express-async-handler';

// @desc    Create new item
// @route   POST /api/items
// @access  Public
export const createItem = asyncHandler(async (req: any, res, next) => {
  const requestBody = req.body as CreateItemRequestBody;
  requestBody.userId = req.user.id;

  if (isInvalidRequestBody(requestBody, ['title', 'description', 'whatWentWell', 'whatDidNotGoWell', 'lessonsLearned', 'dateCompleted', 'projectId', 'userId'])) {
    return handleBadRequest(next, MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addAllFields, req.originalUrl);
  }

  const { title, description, whatWentWell, whatDidNotGoWell, lessonsLearned, dateCompleted, projectId, userId } = requestBody;

  //check if project is valid
  const project = await getProjectById(projectId);
  if (!project) {
    return handleBadRequest(next, MessageConstants.errorMessages.notFound, MessageConstants.errorMessages.projectNotFound, req.originalUrl);
  }

  //check if item already exists for user and project
  const itemAlreadyExists = await itemExists(title, description, whatWentWell, whatDidNotGoWell, lessonsLearned, dateCompleted, projectId, userId);
  if (itemAlreadyExists) {
    return handleBadRequest(next, MessageConstants.errorMessages.projectExists, MessageConstants.errorMessages.itemAlreadyExists, req.originalUrl);
  }

  //create item
  const item = await mongoCreateItem(requestBody);

  if (item) {
    return handleGoodRequest(next, MessageConstants.successMessages.successfullyCreated, MessageConstants.successMessages.itemSuccessfullyCreated, req.originalUrl);
  } else {
    return handleBadRequest(next, MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, req.originalUrl);
  }
});

// @desc    Get all items for a logged in user
// @route   GET /api/items
// @access  Public
export const getItems = asyncHandler(async (req: any, res, next) => {
  const userId = req.user.id;

  const items = (await getItemsForUser(userId)).map((item) => convertItem(item));

  res.status(200).json(items);
});

// @desc    Update item
// @route   PUT /api/items/
// @access  Public
export const updateItem = asyncHandler(async (req: any, res, next) => {
  //validate request body
  const requestBody = req.body as UpdateItemRequestBody;

  if (isInvalidRequestBody(requestBody, ['title', 'description', 'whatWentWell', 'whatDidNotGoWell', 'lessonsLearned', 'dateCompleted', 'id'])) {
    return handleBadRequest(next, MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addAllFields, req.originalUrl);
  }
  //check if item belongs to user
  const userId = req.user.id;
  const itemBelongsToUser = (await getItemsForUser(userId)).map((item) => convertItem(item).id).includes(requestBody.id);

  if (!itemBelongsToUser) {
    return handleBadRequest(next, MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, req.originalUrl);
  }

  //find and update existing item
  const item = await mongoUpdateItem(requestBody);

  //update item
  if (item) {
    return handleGoodRequest(next, MessageConstants.successMessages.successfullyUpdated, MessageConstants.successMessages.itemSuccessfullyUpdated, req.originalUrl);
  } else {
    return handleBadRequest(next, MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, req.originalUrl);
  }
});

// @desc    Delete item
// @route   POST /api/items/:id
// @access  Public
export const deleteItem = asyncHandler(async (req, res, next) => {
  //find item
  const id = req.params.id;

  const item = await getItemById(id);

  //delete item
  if (!item) {
    return handleBadRequest(next, MessageConstants.errorMessages.notFound, MessageConstants.errorMessages.itemNotFound, req.originalUrl);
  }

  const deletedItem = await deleteItemById(id);

  if (deletedItem) {
    return handleGoodRequest(next, MessageConstants.successMessages.successfullyDeleted, MessageConstants.successMessages.itemSuccessfullyDeleted, req.originalUrl);
  } else {
    return handleBadRequest(next, MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, req.originalUrl);
  }
});
