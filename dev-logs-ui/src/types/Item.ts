export type ItemInfo = {
  id: string;
  title: string;
  description: string;
  whatWentWell: string;
  whatDidNotGoWell: string;
  lessonsLearned: string;
  dateCompleted: Date;
};

export type CreateItemRequestBody = {
  title: string;
  description: string;
  whatWentWell: string;
  whatDidNotGoWell: string;
  lessonsLearned: string;
  dateCompleted: Date;
  projectId?: string;
};

export type UpdateItemRequestBody = {
  id: string;
  title: string;
  description: string;
  whatWentWell: string;
  whatDidNotGoWell: string;
  lessonsLearned: string;
  dateCompleted: Date;
};
