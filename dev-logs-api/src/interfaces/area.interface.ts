import { Types } from 'mongoose';
import { ProjectInfo } from './project.interface';

export interface Area {
  _id?: any;
  id: string;
  title: string;
  description: string;
  userId: Types.ObjectId;
}

export interface AreaInfo {
  id: string;
  title: string;
  description: string;
}

export interface CreateAreaRequestBody {
  title: string;
  description: string;
  userId: Types.ObjectId;
}

export interface UpdateAreaRequestBody {
  id: string;
  title: string;
  description: string;
}

export interface AreaDetails {
  area: AreaInfo;
  projects: ProjectInfo[];
}

export interface AreaSummary {
  summary: string;
}
