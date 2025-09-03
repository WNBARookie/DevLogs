import { Types } from 'mongoose';

export interface Area {
  _id?: any; //TODO: fix type
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
