import { Types } from 'mongoose';
import { CreateProjectRequestBody, Project, UpdateProjectRequestBody } from '../interfaces';
import { ProjectModel } from '../models';

// create project
export const mongoCreateProject = async (requestBody: CreateProjectRequestBody): Promise<Project> => {
  const { title, description, userId, areaId } = requestBody;

  // create area
  return await ProjectModel.create({
    title,
    description,
    userId,
    areaId,
  });
};

// get project by area id and user id
export const getProjectByAreaIdAndUserId = async (title: string, description: string, areaId: Types.ObjectId, userId: Types.ObjectId): Promise<Project | null> => {
  return await ProjectModel.findOne({ title, description, areaId, userId });
};

// get projects for user
export const getProjectsForUser = async (userId: Types.ObjectId): Promise<Project[]> => {
  return await ProjectModel.find({ userId });
};

// get projects for user by area
export const getProjectsForUserByArea = async (userId: Types.ObjectId, areaId: string | Types.ObjectId): Promise<Project[]> => {
  return await ProjectModel.find({ userId, areaId });
};

// get project by id
export const getProjectById = async (id: string | Types.ObjectId): Promise<Project | null> => {
  return await ProjectModel.findById(id);
};

// delete project by id
export const deleteProjectById = async (id: string): Promise<Project | null> => {
  return await ProjectModel.findByIdAndDelete(id);
};

// project area
export const mongoUpdateProject = async (requestBody: UpdateProjectRequestBody): Promise<Project | null> => {
  const { title, description, id } = requestBody;

  // update project
  return await ProjectModel.findByIdAndUpdate(
    id,
    {
      title,
      description,
    },
    { new: true, runValidators: true }
  );
};
