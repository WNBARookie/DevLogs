import { Types } from 'mongoose';
import { getItemByProjectIdAndUserId } from '../repositories/itemRepository';

// Utility function to check if item exists in project for user
export const itemExists = async (
  title: string,
  description: string,
  whatWentWell: string,
  whatDidNotGoWell: string,
  lessonsLearned: string,
  dateCompleted: Date,
  projectId: Types.ObjectId | string,
  userId: Types.ObjectId
): Promise<boolean> => {
  const itemExists = await getItemByProjectIdAndUserId(title, description, whatWentWell, whatDidNotGoWell, lessonsLearned, dateCompleted, projectId, userId);
  return itemExists ? true : false;
};
