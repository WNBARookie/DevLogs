import { toast } from 'react-toastify';
import type { ApiResponse, CreateProjectRequestBody, ProjectDetails, ProjectSummary, UpdateProjectRequestBody } from '../types';
import { createProjectAPI, deleteProjectAPI, getProjectDetailsAPI, getProjectSumamryAPI, updateProjectAPI } from './ProjectDataAPIService';

export const createProject = async (requestBody: CreateProjectRequestBody): Promise<ApiResponse | null> => {
  try {
    const res = await createProjectAPI(requestBody);
    if (res && res.data) {
      toast.success(res.data.details);
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
};

export const getProjectDetails = async (id: string): Promise<ProjectDetails | null> => {
  try {
    const res = await getProjectDetailsAPI(id);
    if (res && res.data) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching project details:', error);
    return null;
  }
};

export const deleteProject = async (id: string): Promise<ApiResponse | null> => {
  try {
    const res = await deleteProjectAPI(id);
    if (res && res.data) {
      toast.success(res.data.details);
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error deleting project:', error);
    return null;
  }
};

export const updateProject = async (requestBody: UpdateProjectRequestBody): Promise<ApiResponse | null> => {
  try {
    const res = await updateProjectAPI(requestBody);
    if (res && res.data) {
      toast.success(res.data.details);
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
};

export const getProjectSummary = async (id: string): Promise<ProjectSummary | null> => {
  try {
    const res = await getProjectSumamryAPI(id);
    if (res && res.data) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching project summary:', error);
    return null;
  }
};
