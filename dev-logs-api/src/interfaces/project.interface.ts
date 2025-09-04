import { Types } from 'mongoose';

export interface Project {
  _id?: any; //TODO: fix type
  id: string;
  title: string;
  description: string;
  areaId: Types.ObjectId;
  userId: Types.ObjectId;
}

export interface ProjectInfo {
  id: string;
  title: string;
  description: string;
}

export interface CreateProjectRequestBody {
  title: string;
  description: string;
  areaId: Types.ObjectId;
  userId: Types.ObjectId;
}

export interface UpdateProjectRequestBody {
  id: string;
  title: string;
  description: string;
}
