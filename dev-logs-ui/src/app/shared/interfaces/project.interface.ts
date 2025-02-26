export interface Project {
    id: string;
    title: string;
    description: string;
    categoryId: string;
}

export interface AddProjectRequestBody {
    title: string;
    description: string;
    categoryId: string;
}

export interface UpdateProjectRequestBody {
    title: string;
    description: string;
    projectId: string;
}