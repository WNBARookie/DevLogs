import { Types } from 'mongoose';
import { ItemInfo } from './item.interface';

export interface Project {
  _id?: any;
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
  areaId: string | Types.ObjectId;
  userId: Types.ObjectId;
}

export interface UpdateProjectRequestBody {
  id: string;
  title: string;
  description: string;
}

export interface ProjectDetails {
  project: ProjectInfo;
  items: ItemInfo[];
}

export interface ProjectSummary {
  summary: string;
}
