import type { ApiEndpoints } from '../types';

export const EndpointsConfig: ApiEndpoints = {
  userData: {
    registerUser: '/api/users/register',
    authenticateUser: '/api/users/login',
    getUser: '/api/users/me',
  },
  areaData: {
    createArea: '/api/areas',
    getAreas: '/api/areas',
    getAreaDetails: '/api/areas/:id',
    updateArea: '/api/areas',
    deleteArea: '/api/areas/:id',
    getAreaSummary: '/api/areas/summary/:id',
  },
  projectData: {
    createProject: '/api/projects',
    getProjects: '/api/projects',
    getProjectDetails: '/api/projects/:id',
    updateProject: '/api/projects',
    deleteProject: '/api/projects/:id',
    getProjectSummary: '/api/projects/summary/:id',
  },
};
