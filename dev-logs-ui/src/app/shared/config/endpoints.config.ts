import { ApiEndpoints } from "../interfaces";

export const EndpointsConfig: ApiEndpoints = {
    categoryData: {
        getAllCategories: '/api/categories/all',
        getCategoryById: '/api/categories/:id'
    },
    projectData: {
        addProject: '/api/projects',
        updateProject: '/api/projects',
        getProjectById: '/api/projects/project/:id',
        getAllProjectsByCategory: '/api/projects/:id',
        deleteProject: '/api/projects/:id',
    }
}