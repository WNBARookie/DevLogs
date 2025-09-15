import { Types } from 'mongoose';
import { CreateItemRequestBody, Item, UpdateItemRequestBody } from '../interfaces';
import { ItemModel } from '../models';

// create item
export const mongoCreateItem = async (requestBody: CreateItemRequestBody): Promise<Item> => {
  const { title, description, whatWentWell, whatDidNotGoWell, lessonsLearned, dateCompleted, projectId, userId } = requestBody;

  // create area
  return await ItemModel.create({
    title,
    description,
    whatWentWell,
    whatDidNotGoWell,
    lessonsLearned,
    dateCompleted,
    projectId,
    userId,
  });
};

// get item by project id and user id
export const getItemByProjectIdAndUserId = async (
  title: string,
  description: string,
  whatWentWell: string,
  whatDidNotGoWell: string,
  lessonsLearned: string,
  dateCompleted: Date,
  projectId: Types.ObjectId | string,
  userId: Types.ObjectId
): Promise<Item | null> => {
  return await ItemModel.findOne({ title, description, whatWentWell, whatDidNotGoWell, lessonsLearned, dateCompleted, projectId, userId });
};

// get items for user
export const getItemsForUser = async (userId: Types.ObjectId): Promise<Item[]> => {
  return await ItemModel.find({ userId });
};

// get items for user by project
export const getItemsForUserProject = async (userId: Types.ObjectId, projectId: string | Types.ObjectId): Promise<Item[]> => {
  return await ItemModel.find({ userId, projectId });
};

// get item by id
export const getItemById = async (id: string | Types.ObjectId): Promise<Item | null> => {
  return await ItemModel.findById(id);
};

// delete item by id
export const deleteItemById = async (id: string): Promise<Item | null> => {
  return await ItemModel.findByIdAndDelete(id);
};

// update item
export const mongoUpdateItem = async (requestBody: UpdateItemRequestBody): Promise<Item | null> => {
  const { title, description, whatWentWell, whatDidNotGoWell, lessonsLearned, dateCompleted, id } = requestBody;

  // update project
  return await ItemModel.findByIdAndUpdate(
    id,
    {
      title,
      description,
      whatWentWell,
      whatDidNotGoWell,
      lessonsLearned,
      dateCompleted,
    },
    { new: true, runValidators: true }
  );
};
