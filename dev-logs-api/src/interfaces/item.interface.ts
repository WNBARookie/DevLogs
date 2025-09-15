import { Types } from 'mongoose';

export interface Item {
  _id?: any; //TODO: fix type
  title: string;
  description: string;
  whatWentWell: string;
  whatDidNotGoWell: string;
  lessonsLearned: string;
  dateCompleted: Date;
  projectId: Types.ObjectId;
  userId: Types.ObjectId;
}

export interface ItemInfo {
  id: string;
  title: string;
  description: string;
  whatWentWell: string;
  whatDidNotGoWell: string;
  lessonsLearned: string;
  dateCompleted: Date;
}

export interface CreateItemRequestBody {
  title: string;
  description: string;
  whatWentWell: string;
  whatDidNotGoWell: string;
  lessonsLearned: string;
  dateCompleted: Date;
  projectId: string | Types.ObjectId;
  userId: Types.ObjectId;
}

export interface UpdateItemRequestBody {
  id: string;
  title: string;
  description: string;
  whatWentWell: string;
  whatDidNotGoWell: string;
  lessonsLearned: string;
  dateCompleted: Date;
}
