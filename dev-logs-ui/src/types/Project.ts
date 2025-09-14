export type ProjectInfo = {
  id: string;
  title: string;
  description: string;
};

export type CreateProjectRequestBody = {
  title: string;
  description: string;
  areaId?: string;
};

export type UpdateProjectRequestBody = {
  id: string;
  title: string;
  description: string;
};
