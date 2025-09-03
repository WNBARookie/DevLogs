import { Types } from 'mongoose';
import { AreaModel } from '../models';

// Utility function to check if area exists for a user
export const areaExists = async (userId: Types.ObjectId, title: string, description: string): Promise<boolean> => {
  const areaExists = await AreaModel.findOne({ userId, title, description });

  return areaExists ? true : false;
};
