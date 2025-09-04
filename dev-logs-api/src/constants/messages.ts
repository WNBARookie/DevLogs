import { Messages } from '../interfaces';

export const MessageConstants: Messages = {
  successMessages: {
    // summary
    successfullyCompleted: 'Successfully completed',
    successfullyCreated: 'Successfully created',
    successfullyDeleted: 'Successfully deleted',
    successfullyUpdated: 'Successfully updated',
    successfullyLoggedIn: 'Successfully logged in',

    // details
    projectSuccessfullyCreated: 'Project successfully created',
    projectSuccessfullyDeleted: 'Project successfully deleted',
    projectSuccessfullyUpdated: 'Project successfully updated',
    itemSuccessfullyCreated: 'Item successfully created',
    itemSuccessfullyDeleted: 'Item successfully deleted',
    itemSuccessfullyUpdated: 'Item successfully updated',
    areaSuccessfullyCreated: 'Area successfully created',
    areaSuccessfullyDeleted: 'Area successfully deleted',
    areaSuccessfullyUpdated: 'Area successfully updated',
    categorySuccessfullyCreated: 'Category successfully created',
    categorySuccessfullyDeleted: 'Category successfully deleted',
    categorySuccessfullyUpdated: 'Category successfully updated',
    userSuccessfullyLoggedIn: 'User was successfully logged in',
    userSuccessfullyCreated: 'User was successfully created',
  },

  errorMessages: {
    // summary
    missingInformation: 'Missing information',
    invalidCredentials: 'Invalid credentials',
    unableToCreate: 'Unable to create',
    userExists: 'User already exists',
    areaExists: 'Area already exists',
    projectExists: 'Project already exists',
    notAuthorized: 'Not authorized',
    itemNotFound: 'Item not found',
    notFound: 'Not found',
    notAuthorizedNoToken: 'Not authorized, no token',
    somethingWentWrong: 'Something went wrong',

    // details
    somethingWentWrongDetails: 'Something went wrong on the server side',
    addAllFields: 'Please add all fields',
    addDescription: 'Please add description',
    addTitle: 'Please add title',
    addCategoryId: 'Please add category Id',
    addProjectId: 'Please add project Id',
    addItemId: 'Please add item Id',
    addWhatWentWell: 'Please add what went well',
    addWhatDidNotGoWell: 'Please add what did not go well',
    addLessonsLearned: 'Please add lessons learned',
    addDateCompleted: 'Please add date completed',
    projectNotFound: 'Project was not found',
    areaNotFound: 'Area was not found',
    projectNotCreated: 'Project was not created',
    projectAlreadyExists: 'A project with the same title in the same category already exists',
    itemNotCreated: 'Item was not created',
    itemAlreadyExists: 'An item with the same title in the same project already exists',
    areaAlreadyExists: 'An area with the same title and description already exists for the current user',
    userNotCreated: 'User could not be created',
    notAuthorizedNoTokenDetails: 'Not authorized to access and no token provided',
    userExistsEmail: 'User with email address already exists',
    userExistsUsername: 'User with username already exists',
    userNotAuthorized: 'User not authorized',
    invalidCredentialsDetails: 'Credentials not valid',
  },
};
