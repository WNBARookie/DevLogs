import expressAsyncHandler from 'express-async-handler';
import { ApiResponse } from '../utils';
import { MessageConstants } from '../constants';
import { ItemModel } from '../models';
import { Item } from '../interfaces';

// @route   GET /api/items/:id
// @access  Private
// @desc    Get all items for a project
export const getAllItemsForProject = expressAsyncHandler(async (req: any, res, next) => {
    let items: Item[] = [];

    await ItemModel.find({ projectId: req.params.id })
        .then((data) => {
            data.forEach(e => {
                let i: Item = {
                    id: e._id.toString(),
                    title: e.title,
                    description: e.description,
                    skillsApplied: e.skillsApplied,
                    lessonsLearned: e.lessonsLearned,
                    dateCompleted: new Date(e.dateCompleted),
                    projectId: e.projectId.toString()
                }
                items.push(i);
            });
        })
        .catch((err) => {
            console.log(err)
            next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, err, 400, req.originalUrl))
        });

    res.status(200).json(items);
})

// @access  Private
// @desc    Get item by id
// @route   GET /api/items/item/:id
export const getItemById = expressAsyncHandler(async (req: any, res, next) => {
    let item !: Item;
    await ItemModel.findById(req.params.id)
        .then((data) => {
            if (data) {
                item = {
                    id: data._id.toString(),
                    title: data.title,
                    description: data.description,
                    skillsApplied: data.skillsApplied,
                    lessonsLearned: data.lessonsLearned,
                    dateCompleted: new Date(data.dateCompleted),
                    projectId: data.projectId.toString()
                }
            }

        })
        .catch((err) => {
            console.log(err)
            next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, err, 400, req.originalUrl))
        });

    res.status(200).json(item);
})


// @access  Private
// @desc    Create item
// @route   POST /api/items/:id
export const createItem = expressAsyncHandler(async (req: any, res, next) => {
    if (!req.body.title) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addTitle, 400, req.originalUrl));
        return;
    }

    if (!req.body.description) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addDescription, 400, req.originalUrl));
        return;
    }

    if (!req.body.skillsApplied) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addSkillsApplied, 400, req.originalUrl));
        return;
    }

    if (!req.body.lessonsLearned) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addLessonsLearned, 400, req.originalUrl));
        return;
    }

    if (!req.body.dateCompleted) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addDateCompleted, 400, req.originalUrl));
        return;
    }

    if (!req.body.projectId) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addProjectId, 400, req.originalUrl));
        return;
    }

    const existingItem = await ItemModel.find({ title: req.body.title, categoryId: req.body.categoryId })
        .then((data) => data)

    if (existingItem.length) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.unableToCreate, MessageConstants.errorMessages.itemAlreadyExists, 400, req.originalUrl));
        return;
    }

    await ItemModel.create({
        title: req.body.title,
        description: req.body.description,
        skillsApplied: req.body.skillsApplied,
        lessonsLearned: req.body.lessonsLearned,
        dateCompleted: new Date(req.body.dateCompleted),
        projectId: req.body.projectId
    })
        .then((data) => {
            next(ApiResponse.goodRequest(MessageConstants.successMessages.successfullyCreated, MessageConstants.successMessages.itemSuccessfullyCreated, 200, req.originalUrl));
            return;
        })
        .catch((err) => {
            console.log(err)
            next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, 400, req.originalUrl));
            return;
        });
    return;
})


// @access  Private
// @desc    Update item
// @route   PUT /api/items/:id
export const updateItem = expressAsyncHandler(async (req: any, res, next) => {
    if (!req.body.title) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addTitle, 400, req.originalUrl));
        return;
    }

    if (!req.body.description) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addDescription, 400, req.originalUrl));
        return;
    }

    if (!req.body.skillsApplied) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addSkillsApplied, 400, req.originalUrl));
        return;
    }

    if (!req.body.lessonsLearned) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addLessonsLearned, 400, req.originalUrl));
        return;
    }

    if (!req.body.dateCompleted) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addDateCompleted, 400, req.originalUrl));
        return;
    }

    if (!req.body.itemId) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.missingInformation, MessageConstants.errorMessages.addItemId, 400, req.originalUrl));
        return;
    }

    const item = await ItemModel.findById(req.body.itemId);

    if (!item) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.itemNotFound, MessageConstants.errorMessages.itemNotFound, 400, req.originalUrl));
        return;
    }

    await ItemModel.findByIdAndUpdate(
        { _id: req.body.itemId },
        {
            title: req.body.title,
            description: req.body.description,
            skillsApplied: req.body.skillsApplied,
            lessonsLearned: req.body.lessonsLearned,
            dateCompleted: new Date(req.body.dateCompleted),
        },
        {
            new: true
        }
    )
        .then(data => {
            next(ApiResponse.goodRequest(MessageConstants.successMessages.successfullyUpdated, MessageConstants.successMessages.itemSuccessfullyUpdated, 200, req.originalUrl));
            return;
        })
        .catch(err => {
            console.log(err)
            next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, 400, req.originalUrl));
            return;
        });

    return;
})


// @access  Private
// @desc    Delete item
// @route   DELETE /api/items/:id
export const deleteItem = expressAsyncHandler(async (req: any, res, next) => {
    const item = await ItemModel.findById(req.params.id);

    if (!item) {
        next(ApiResponse.badRequest(MessageConstants.errorMessages.itemNotFound, MessageConstants.errorMessages.itemNotFound, 400, req.originalUrl));
        return;
    }

    await ItemModel.findByIdAndDelete({ _id: req.params.id })
        .then(data => {
            next(ApiResponse.goodRequest(MessageConstants.successMessages.successfullyDeleted, MessageConstants.successMessages.itemSuccessfullyDeleted, 200, req.originalUrl));
            return;
        })
        .catch(err => {
            console.log(err)
            next(ApiResponse.badRequest(MessageConstants.errorMessages.somethingWentWrong, MessageConstants.errorMessages.somethingWentWrongDetails, 400, req.originalUrl));
            return;
        });

    return;
})
