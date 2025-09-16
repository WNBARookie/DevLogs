import { MessageConstants } from '../constants';
import { CreateProjectRequestBody, ProjectDetails, ProjectSummary, UpdateProjectRequestBody } from '../interfaces';
import { deleteProjectById, getAreaById, getItemsForUserProject, getProjectById, getProjectsForUser, mongoCreateProject, mongoUpdateProject } from '../repositories';
import { convertItem, convertProject, projectExists } from '../services';
import { generateSummary } from '../services/GeminiAIService';
import { ApiResponse, handleBadRequest, handleGoodRequest, isInvalidRequestBody } from '../utils';
import asyncHandler from 'express-async-handler';

// @desc    Create new project
// @route   POST /api/projects
// @access  Public
export const createProject = asyncHandler(async (req: any, res, next) => {
  //validate request body
  const requestBody = req.body as CreateProjectRequestBody;
  requestBody.userId = req.user.id;

  if (isInvalidRequestBody(requestBody, ['title', 'description', 'userId', 'areaId'])) {
    return handleBadRequest(next, MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addAllFields, req.originalUrl);
  }

  const { title, description, userId, areaId } = requestBody;

  //check if area is valid
  const area = await getAreaById(areaId);
  if (!area) {
    return handleBadRequest(next, MessageConstants.errorMessages.notFound, MessageConstants.errorMessages.areaNotFound, req.originalUrl);
  }

  //check if project already exists for user and area
  const projectAlreadyExists = await projectExists(title, description, areaId, userId);
  if (projectAlreadyExists) {
    return handleBadRequest(next, MessageConstants.errorMessages.projectExists, MessageConstants.errorMessages.projectAlreadyExists, req.originalUrl);
  }

  //create project
  const project = await mongoCreateProject(requestBody);

  if (project) {
    return handleGoodRequest(next, MessageConstants.successMessages.successfullyCreated, MessageConstants.successMessages.projectSuccessfullyCreated, req.originalUrl);
  } else {
    return handleBadRequest(next, MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, req.originalUrl);
  }
});

// @desc    Get all projects for a logged in user
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req: any, res, next) => {
  const userId = req.user.id;

  const projects = (await getProjectsForUser(userId)).map((project) => convertProject(project));

  res.status(200).json(projects);
});

// @desc    Update project
// @route   PUT /api/projects
// @access  Public
export const updateProject = asyncHandler(async (req: any, res, next) => {
  //validate request body
  const requestBody = req.body as UpdateProjectRequestBody;

  if (isInvalidRequestBody(requestBody, ['title', 'description', 'id'])) {
    return handleBadRequest(next, MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addAllFields, req.originalUrl);
  }
  //check if project belongs to user
  const userId = req.user.id;
  const projectBelongsToUser = (await getProjectsForUser(userId)).map((project) => convertProject(project).id).includes(requestBody.id);

  if (!projectBelongsToUser) {
    return handleBadRequest(next, MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, req.originalUrl);
  }

  //find and update existing project
  const project = await mongoUpdateProject(requestBody);

  //update project
  if (project) {
    return handleGoodRequest(next, MessageConstants.successMessages.successfullyUpdated, MessageConstants.successMessages.projectSuccessfullyUpdated, req.originalUrl);
  } else {
    return handleBadRequest(next, MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, req.originalUrl);
  }
});

// @desc    Delete project
// @route   POST /api/projects/:id
// @access  Public
export const deleteProject = asyncHandler(async (req, res, next) => {
  //find project
  const id = req.params.id;

  const project = await getProjectById(id);

  //delete project
  if (!project) {
    return handleBadRequest(next, MessageConstants.errorMessages.notFound, MessageConstants.errorMessages.projectNotFound, req.originalUrl);
  }

  const deletedProject = await deleteProjectById(id);

  if (deletedProject) {
    return handleGoodRequest(next, MessageConstants.successMessages.successfullyDeleted, MessageConstants.successMessages.projectSuccessfullyDeleted, req.originalUrl);
  } else {
    return handleBadRequest(next, MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, req.originalUrl);
  }
});

// @desc    Get project detais by id and all projects for it
// @route   GET /api/projects/:id
// @access  Public
export const getProjectDetails = asyncHandler(async (req: any, res, next) => {
  const projectId = req.params.id;
  const userId = req.user.id;

  //find project
  const project = await getProjectById(projectId);

  if (!project) {
    return handleBadRequest(next, MessageConstants.errorMessages.notFound, MessageConstants.errorMessages.projectNotFound, req.originalUrl);
  }

  // get items for project
  const itemsForProject = (await getItemsForUserProject(userId, projectId)).map((item) => convertItem(item));

  // create response
  const projectDetails: ProjectDetails = {
    project: convertProject(project),
    items: itemsForProject,
  };

  res.status(200).json(projectDetails);
});

// @desc    Generate project summary
// @route   GET /api/projects/:id/summary
// @access  Public
export const getProjectSummary = asyncHandler(async (req: any, res, next) => {
  const projectId = req.params.id;
  const userId = req.user.id;

  //find project
  const project = await getProjectById(projectId);

  if (!project) {
    return handleBadRequest(next, MessageConstants.errorMessages.notFound, MessageConstants.errorMessages.projectNotFound, req.originalUrl);
  }

  // get items for project
  const itemsForProject = (await getItemsForUserProject(userId, projectId)).map((item) => convertItem(item));

  // format item list and make prompt
  const formattedProjectList = itemsForProject
    .map(
      (item, i) =>
        `${i + 1}. ${item.title} - Description: ${item.description} - What Went Well: ${item.whatWentWell} - What Did Not Go Well: ${item.whatDidNotGoWell} - Lessons Learned: ${
          item.lessonsLearned
        }`
    )
    .join('\n');

  const prompt = `
    I have a list of items , as well as the title, description, what went well, what did not go well, and lessons learned for each item
  
    ${formattedProjectList}
  
    Please provide a concise summary of the all the items. 
  
    Make the summary and use full sentences, while also not mentioning that this is in full sentences.
    `;

  const projectSummary: ProjectSummary = {
    summary: '',
  };

  const summary = await generateSummary(prompt);

  if (summary) {
    projectSummary.summary = summary;
  }

  res.status(200).json(projectSummary);
});
