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
    projectSuccessfullyUpdated: 'Project successfully updated'
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
    projectNotFound: 'Project was not found',
    projectNotCreated: 'Project was not created'
  },
};

