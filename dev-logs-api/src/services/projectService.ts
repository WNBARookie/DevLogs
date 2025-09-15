import { Types } from 'mongoose';
import { getProjectByAreaIdAndUserId } from '../repositories';

// Utility function to check if project exists in area for user
export const projectExists = async (title: string, description: string, areaId: Types.ObjectId | string, userId: Types.ObjectId): Promise<boolean> => {
  const projectExists = await getProjectByAreaIdAndUserId(title, description, areaId, userId);
  return projectExists ? true : false;
};
