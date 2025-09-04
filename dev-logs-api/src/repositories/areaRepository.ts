import { Types } from 'mongoose';
import { Area, CreateAreaRequestBody, UpdateAreaRequestBody } from '../interfaces';
import { AreaModel } from '../models';

// create area
export const mongoCreateArea = async (requestBody: CreateAreaRequestBody): Promise<Area> => {
  const { title, description, userId } = requestBody;

  // create area
  return await AreaModel.create({
    title,
    description,
    userId,
  });
};

// get areas for user
export const getAreasForUser = async (userId: Types.ObjectId): Promise<Area[]> => {
  return await AreaModel.find({ userId });
};

// get area by id
export const getAreaById = async (id: string | Types.ObjectId): Promise<Area | null> => {
  return await AreaModel.findById(id);
};

// delete area by id
export const deleteAreaById = async (id: string): Promise<Area | null> => {
  return await AreaModel.findByIdAndDelete(id);
};

// update area
export const mongoUpdateArea = async (requestBody: UpdateAreaRequestBody): Promise<Area | null> => {
  const { title, description, id } = requestBody;

  // update area
  return await AreaModel.findByIdAndUpdate(
    id,
    {
      title,
      description,
    },
    { new: true, runValidators: true }
  );
};
