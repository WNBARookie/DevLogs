import expressAsyncHandler from "express-async-handler";
import { ApiResponse } from "../utils";
import { MessageConstants } from "../constants";
import { ProjectModel } from "../models";
import { Project } from "../interfaces";


// @route   GET /api/projects/:id
// @access  Private
// @desc    Get all projects by category 
export const getAllProjectsByCategory = expressAsyncHandler(async (req: any, res, next) => {
    console.log(req.params)
    let projects: Project[] = [];

    await ProjectModel.find({ categoryId: req.params.categoryId })
        .then((data) => {
            data.forEach(e => {
                let p: Project = {
                    id: e._id.toString(),
                    title: e.title,
                    description: e.description,
                    categoryId: e.categoryId.toString()
                }
                projects.push(p);
            });
        })
        .catch((err) => next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, err, 400, req.originalUrl)));

    res.status(200).json(projects);
});


// @access  Private
// @desc    Get project by id
// @route   GET /api/projects/:id
export const getProjectById = expressAsyncHandler(async (req: any, res, next) => {
  let project !: Project;
  await ProjectModel.findById(req.params.id)
    .then((data) => {
      if(data) {
        console.log(data)
        project = {
          id: data._id.toString(),
          title: data.title,
          description: data.description,
          categoryId: data.categoryId._id.toString(),
        }
      }
    
    })
    .catch((err) => next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, err, 400, req.originalUrl)));

  res.status(200).json(project);
});


// @desc    Create project
// @route   POST /api/projects
// @access  Private
export const createProject = expressAsyncHandler(async (req: any, res, next) => {
    if (!req.body.title) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addTitle, 400, req.originalUrl));
        return;
    }

    if (!req.body.description) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addDescription, 400, req.originalUrl));
        return;
    }

    if (!req.body.categoryId) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addCategoryId, 400, req.originalUrl));
        return;
    }

    const existingProject = await ProjectModel.find({ title: req.body.title, categoryId: req.body.categoryId })
        .then((data) => data)

    if (existingProject.length) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.unableToCreate, MessageConstants.errorMessages.projectAlreadyExists, 400, req.originalUrl));
        return;
    }

    await ProjectModel.create({
        title: req.body.title,
        description: req.body.description,
        categoryId: req.body.categoryId
    })
        .then((data) => {
            next(ApiResponse.goodRequest(MessageConstants.successMessages.successfullyCreated, MessageConstants.successMessages.projectSuccessfullyCreated, 200, req.originalUrl));
            return;
        })
        .catch((err) => {
            next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, 400, req.originalUrl));
            return;
        });

})

// @desc    Update project
// @route   PUT /api/projects
// @access  Private
export const updateProject = expressAsyncHandler(async (req: any, res, next) => {
    if (!req.body.title) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addTitle, 400, req.originalUrl));
        return;
    }

    if (!req.body.description) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addDescription, 400, req.originalUrl));
        return;
    }

    if (!req.body.projectId) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addProjectId, 400, req.originalUrl));
        return;
    }

    const project = await ProjectModel.findById(req.body.projectId);

    if (!project) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.itemNotFound, MessageConstants.errorMessages.projectNotFound, 400, req.originalUrl));
        return;
    }

    await ProjectModel.findByIdAndUpdate(
        { _id: req.body.projectId },
        {
            title: req.body.title,
            description: req.body.description
        },
        {
            new: true
        }
    )
        .then(data => {
            next(ApiResponse.goodRequest(MessageConstants.successMessages.successfullyUpdated, MessageConstants.successMessages.projectSuccessfullyUpdated, 200, req.originalUrl));
            return;
        })
        .catch(err => {
            next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, 400, req.originalUrl));
            return;
        });

    return;
})

// @desc    Delete project
// @route   DELETE /api/projects
// @access  Private
export const deleteProject = expressAsyncHandler(async (req: any, res, next) => {
    const project = await ProjectModel.findById(req.params.id);

    if (!project) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.itemNotFound, MessageConstants.errorMessages.projectNotFound, 400, req.originalUrl));
        return;
    }

    await ProjectModel.findByIdAndDelete({ _id: req.params.id })
        .then(data => {
            next(ApiResponse.goodRequest(MessageConstants.successMessages.successfullyDeleted, MessageConstants.successMessages.projectSuccessfullyDeleted, 200, req.originalUrl));
            return;
        })
        .catch(err => {
            next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, 400, req.originalUrl));
            return;
        });

    return;
})

