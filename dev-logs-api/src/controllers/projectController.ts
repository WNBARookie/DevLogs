// @access  Private
// @desc    Get all projects by category 

import expressAsyncHandler from "express-async-handler";
import { ApiResponse } from "../utils";
import { MessageConstants } from "../constants";
import { ProjectModel } from "../models";

// @route   GET /api/projects/:id
export const getAllProjectsByCategory = expressAsyncHandler(async (req: any, res, next) => {
    //   const categories = await CategoryModel.find()
    //     .then((data) => data)
    //     .catch((err) => next(ApiResponse.badRequest('Error', err, 400, req.originalUrl)));

    // res.status(200).json(categories);
    res.status(200).json({});
});


// @desc    Create project
// @route   POST /api/project
// @access  Private
export const createProject = expressAsyncHandler(async (req: any, res, next) => {
    console.log(req.body)
    // console.log(req.body.description)
    // console.log(req.body)

    // if (!req.body.title) {
    //     console.log(1)
    //     next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addTitle, 400, req.originalUrl));
    //     return;
    // }

    // if (!req.body.description) {
    //     console.log(2)
    //     next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addDescription, 400, req.originalUrl));
    //     return;
    // }

    // if (!req.body.categoryId) {
    //     console.log(3)
    //     next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addCategoryId, 400, req.originalUrl));
    //     return;
    // }

    const project = await ProjectModel.create({
        title: req.body.title,
        description: req.body.description,
        categoryId: req.body.categoryId
    })    
        .then((data) => {
            console.log("woo")
            console.log(data)
        })
        .catch((err) => {
            console.log("nooo")
            console.log(err)
            console.log(err.err)
        });

    // if (project) {
    //     next(ApiResponse.goodRequest(MessageConstants.successMessages.successfullyCreated, MessageConstants.successMessages.projectSuccessfullyCreated, 200, req.originalUrl));
    //     return;
    //   } else {
    //     console.log(project)
    //     next(ApiResponse.badRequest(MessageConstants.errorMessages.unableToCreate, MessageConstants.errorMessages.projectNotCreated, 400, req.originalUrl));
    //     return;
    //   }

    return;
    })

// @desc    Update project
// @route   PUT /api/project
// @access  Private
export const updateProject = expressAsyncHandler(async (req: any, res, next) => {
    console.log(req.body)

    return;
})

// @desc    Delete project
// @route   DELETE /api/project
// @access  Private
export const deleteProject = expressAsyncHandler(async (req: any, res, next) => {
    console.log(req.body)

    return;
})

