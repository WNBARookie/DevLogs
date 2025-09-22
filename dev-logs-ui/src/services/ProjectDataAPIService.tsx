import axios from 'axios';
import { EndpointsConfig } from '../config/endpoints.config';
import type { ApiResponse, CreateProjectRequestBody, ProjectDetails, ProjectSummary, UpdateProjectRequestBody } from '../types';
import { handleError } from '../utils/ErrorHandler';

export const createProjectAPI = async (requestBody: CreateProjectRequestBody) => {
  try {
    const data = await axios.post<ApiResponse>(EndpointsConfig.projectData.createProject, requestBody);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getProjectDetailsAPI = async (id: string) => {
  try {
    const data = await axios.get<ProjectDetails>(EndpointsConfig.projectData.getProjectDetails.replace(':id', id));

    return data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    handleError(error);
  }
};

export const deleteProjectAPI = async (id: string) => {
  try {
    const data = await axios.delete<ApiResponse>(EndpointsConfig.projectData.deleteProject.replace(':id', id));

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateProjectAPI = async (requestBody: UpdateProjectRequestBody) => {
  try {
    const data = await axios.put<ApiResponse>(EndpointsConfig.projectData.updateProject, requestBody);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getProjectSummaryAPI = async (id: string) => {
  try {
    const data = await axios.get<ProjectSummary>(EndpointsConfig.projectData.getProjectSummary.replace(':id', id));

    return data;
  } catch (error) {
    handleError(error);
  }
};
