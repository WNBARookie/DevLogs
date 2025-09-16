import { MessageConstants } from '../constants';
import { AreaDetails, AreaSummary, CreateAreaRequestBody, UpdateAreaRequestBody } from '../interfaces';
import { deleteAreaById, getAreaById, getAreasForUser, getProjectByAreaIdAndUserId, getProjectsForUserByArea, mongoCreateArea, mongoUpdateArea } from '../repositories';
import { areaExists, convertArea, convertProject } from '../services';
import { generateSummary } from '../services/GeminiAIService';
import { ApiResponse, handleBadRequest, handleGoodRequest, isInvalidRequestBody } from '../utils';
import asyncHandler from 'express-async-handler';

// @desc    Create new area
// @route   POST /api/areas
// @access  Public
export const createArea = asyncHandler(async (req: any, res, next) => {
  //validate request body
  const requestBody = req.body as CreateAreaRequestBody;
  requestBody.userId = req.user.id;

  if (isInvalidRequestBody(requestBody, ['title', 'description', 'userId'])) {
    return handleBadRequest(next, MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addAllFields, req.originalUrl);
  }

  //check if area already exists for user
  const { title, description, userId } = requestBody;

  const areaAlreadyExists = await areaExists(userId, title, description);
  if (areaAlreadyExists) {
    return handleBadRequest(next, MessageConstants.errorMessages.areaExists, MessageConstants.errorMessages.areaAlreadyExists, req.originalUrl);
  }

  //create area
  const area = await mongoCreateArea(requestBody);

  if (area) {
    return handleGoodRequest(next, MessageConstants.successMessages.successfullyCreated, MessageConstants.successMessages.areaSuccessfullyCreated, req.originalUrl);
  } else {
    return handleBadRequest(next, MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, req.originalUrl);
  }
});

// @desc    Get all areas for a logged in user
// @route   GET /api/areas
// @access  Public
export const getAreas = asyncHandler(async (req: any, res, next) => {
  const userId = req.user.id;

  const areas = (await getAreasForUser(userId)).map((area) => convertArea(area));

  res.status(200).json(areas);
});

// @desc    Update area
// @route   PUT /api/areas
// @access  Public
export const updateArea = asyncHandler(async (req: any, res, next) => {
  //validate request body
  const requestBody = req.body as UpdateAreaRequestBody;
  const userId = req.user.id;

  if (isInvalidRequestBody(requestBody, ['title', 'description', 'id'])) {
    return handleBadRequest(next, MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addAllFields, req.originalUrl);
  }

  //find and update existing area
  const area = await mongoUpdateArea(requestBody);

  //update area
  if (area) {
    return handleGoodRequest(next, MessageConstants.successMessages.successfullyUpdated, MessageConstants.successMessages.areaSuccessfullyUpdated, req.originalUrl);
  } else {
    return handleBadRequest(next, MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, req.originalUrl);
  }
});

// @desc    Delete area
// @route   POST /api/areas/:id
// @access  Public
export const deleteArea = asyncHandler(async (req, res, next) => {
  //find area
  const id = req.params.id;

  const area = await getAreaById(id);

  //delete area
  if (!area) {
    return handleBadRequest(next, MessageConstants.errorMessages.notFound, MessageConstants.errorMessages.areaNotFound, req.originalUrl);
  }

  const deletedArea = await deleteAreaById(id);

  if (deletedArea) {
    return handleGoodRequest(next, MessageConstants.successMessages.successfullyDeleted, MessageConstants.successMessages.areaSuccessfullyDeleted, req.originalUrl);
  } else {
    return handleBadRequest(next, MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, req.originalUrl);
  }
});

// @desc    Get area detais by id and all projects for it
// @route   GET /api/areas/:id
// @access  Public
export const getAreaDetails = asyncHandler(async (req: any, res, next) => {
  const areaId = req.params.id;
  const userId = req.user.id;

  //find area
  const area = await getAreaById(areaId);

  if (!area) {
    return handleBadRequest(next, MessageConstants.errorMessages.notFound, MessageConstants.errorMessages.areaNotFound, req.originalUrl);
  }

  // get projects for area
  const projectsForArea = (await getProjectsForUserByArea(userId, areaId)).map((project) => convertProject(project));

  // create response
  const areaDetails: AreaDetails = {
    area: convertArea(area),
    projects: projectsForArea,
  };

  res.status(200).json(areaDetails);
});

// @desc    Generate area summary
// @route   GET /api/areas/summary/:id
// @access  Public
export const getAreaSummary = asyncHandler(async (req: any, res, next) => {
  const areaId = req.params.id;
  const userId = req.user.id;

  //find area
  const area = await getAreaById(areaId);

  if (!area) {
    return handleBadRequest(next, MessageConstants.errorMessages.notFound, MessageConstants.errorMessages.areaNotFound, req.originalUrl);
  }

  // get projects for area
  const projectsForArea = (await getProjectsForUserByArea(userId, areaId)).map((project) => convertProject(project));

  // format project list and make prompt
  const formattedProjectList = projectsForArea.map((project, i) => `${i + 1}. ${project.title} - Description: ${project.description}`).join('\n');
  const prompt = `
  I have a list of projects , as well as the title and description for each project

  ${formattedProjectList}

  Please provide a concise summary of the all the projects. 

  Make the summary and use full sentences, while also not mentioning that this is in full sentences.
  `;

  const areaSummary: AreaSummary = {
    summary: '',
  };

  const summary = await generateSummary(prompt);

  if (summary) {
    areaSummary.summary = summary;
  }

  res.status(200).json(areaSummary);
});
