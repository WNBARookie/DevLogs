import { Messages } from '../interfaces';

export const MessageConstants: Messages = {
  successMessages: {
    // summary
    successfullyCompleted: 'Successfully completed',
    successfullyCreated: 'Successfully created',
    successfullyDeleted: 'Successfully deleted',
    successfullyUpdated: 'Successfully updated',

    // details
    projectSuccessfullyCreated: 'Project successfully created',
    projectSuccessfullyDeleted: 'Project successfully deleted',
    projectSuccessfullyUpdated: 'Project successfully updated',
    itemSuccessfullyCreated: 'Item successfully created',
    itemSuccessfullyDeleted: 'Item successfully deleted',
    itemSuccessfullyUpdated: 'Item successfully updated'
  },

  errorMessages: {
    // summary
    somethingWentWrong: 'Something went wrong',
    missingInformation: 'Missing information',
    itemNotFound: 'Item not found',
    unableToCreate: 'Unable to create',

    // details
    somethingWentWrongDetails: 'Something went wrong on the server side',
    addAllFields: 'Please add all fields',
    addDescription: 'Please add description',
    addTitle: 'Please add title',
    addCategoryId: 'Please add category Id',
    addProjectId: 'Please add project Id',
    addSkillsApplied: 'Please add skills applied',
    addLessonsLearned: 'Please add lessons learned',
    addDateCompleted: 'Please add date completed',
    projectNotFound: 'Project was not found',
    projectNotCreated: 'Project was not created',
    projectAlreadyExists: 'A project with the same title in the same category already exists',
    itemNotCreated: 'Item was not created',
    itemAlreadyExists: 'A Item with the same title in the same project already exists'
  },
};

