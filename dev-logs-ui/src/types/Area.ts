export type AreaInfo = {
  id: string;
  title: string;
  description: string;
};

export type CreateAreaRequestBody = {
  title: string;
  description: string;
};

export type UpdateAreaRequestBody = {
  id: string;
  title: string;
  description: string;
};
