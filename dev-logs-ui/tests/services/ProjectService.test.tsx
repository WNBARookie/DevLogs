import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AxiosResponse } from 'axios';
import { getProjectDetails, createProject, deleteProject, updateProject, getProjectSummary } from '../../src/services/ProjectService';
import type { ApiResponse, ProjectDetails, ProjectSummary, CreateProjectRequestBody, ProjectInfo, UpdateProjectRequestBody, ItemInfo } from '../../src/types';
import * as ProjectDataAPIService from '../../src/services/ProjectDataAPIService';
import { toast } from 'react-toastify';
import '../base';

vi.mock('../../src/services/ProjectAPI', () => ({
  getProjectDetailsAPI: vi.fn(),
  createProjectAPI: vi.fn(),
  deleteProjectAPI: vi.fn(),
  updateProjectAPI: vi.fn(),
  getProjectSummaryAPI: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn() },
}));

describe('ProjectService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const id = '1';

  const mockAPIResponse: ApiResponse = {
    summary: 'Summary',
    details: 'Successful',
    status: 200,
    instance: '/projects',
    timeStamp: new Date(),
    token: '123',
  };

  const successMockAPIResponse: AxiosResponse<ApiResponse, any> = {
    data: {
      status: 200,
      details: 'Successful',
      summary: 'Summary',
      instance: '/projects',
      timeStamp: new Date(),
      token: '123',
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };

  const mockProject: ProjectInfo = {
    id: '1',
    title: 'title',
    description: 'description',
  };

  const mockItem: ItemInfo = {
    id: '1',
    title: 'title',
    description: 'description',
    whatWentWell: 'whatWentWell',
    whatDidNotGoWell: 'whatDidNotGoWell',
    lessonsLearned: 'lessonsLearned',
    dateCompleted: new Date(),
  };

  const mockProjectDetails: ProjectDetails = {
    project: mockProject,
    items: [mockItem],
  };

  const successMockProjectDetails: AxiosResponse<ProjectDetails, any> = {
    data: mockProjectDetails,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };

  const mockProjectSummary: ProjectSummary = {
    summary: 'Summary',
  };

  const successMockProjectSummary: AxiosResponse<ProjectSummary, any> = {
    data: mockProjectSummary,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };

  const validCreateProjectRequestBody: CreateProjectRequestBody = { title: 'title', description: 'description' };
  const validUpdateProjectRequestBody: UpdateProjectRequestBody = { id: '1', title: 'title', description: 'description' };

  it('getProjectDetails should return data when API returns data', async () => {
    vi.spyOn(ProjectDataAPIService, 'getProjectDetailsAPI').mockResolvedValue(successMockProjectDetails);

    const result = await getProjectDetails(id);

    expect(result).toEqual(mockProjectDetails);
  });

  it('getProjectDetails should return null when API response has no data', async () => {
    vi.spyOn(ProjectDataAPIService, 'getProjectDetailsAPI').mockResolvedValue({} as AxiosResponse<ProjectDetails, any>);

    const result = await getProjectDetails(id);

    expect(result).toBeNull();
  });

  it('getProjectDetails should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(ProjectDataAPIService, 'getProjectDetailsAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await getProjectDetails(id);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching project details:', error);

    consoleSpy.mockRestore();
  });

  it('createProject should return data when API returns data', async () => {
    vi.spyOn(ProjectDataAPIService, 'createProjectAPI').mockResolvedValue(successMockAPIResponse);

    const result = await createProject(validCreateProjectRequestBody);

    expect(toast.success).toHaveBeenCalledWith('Successful');
    expect(result).toEqual(mockAPIResponse);
  });

  it('createProject should return null when API response has no data', async () => {
    vi.spyOn(ProjectDataAPIService, 'createProjectAPI').mockResolvedValue({} as AxiosResponse<ApiResponse, any>);

    const result = await createProject(validCreateProjectRequestBody);

    expect(result).toBeNull();
  });

  it('createProject should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(ProjectDataAPIService, 'createProjectAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await createProject(validCreateProjectRequestBody);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error creating project:', error);

    consoleSpy.mockRestore();
  });

  it('deleteProject should return data when API returns data', async () => {
    vi.spyOn(ProjectDataAPIService, 'deleteProjectAPI').mockResolvedValue(successMockAPIResponse);

    const result = await deleteProject(id);

    expect(toast.success).toHaveBeenCalledWith('Successful');
    expect(result?.summary).toEqual(mockAPIResponse.summary);
  });

  it('deleteProject should return null when API response has no data', async () => {
    vi.spyOn(ProjectDataAPIService, 'deleteProjectAPI').mockResolvedValue({} as AxiosResponse<ApiResponse, any>);

    const result = await deleteProject(id);

    expect(result).toBeNull();
  });

  it('deleteProject should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(ProjectDataAPIService, 'deleteProjectAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await deleteProject(id);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error deleting project:', error);

    consoleSpy.mockRestore();
  });

  it('updateProject should return data when API returns data', async () => {
    vi.spyOn(ProjectDataAPIService, 'updateProjectAPI').mockResolvedValue(successMockAPIResponse);

    const result = await updateProject(validUpdateProjectRequestBody);

    expect(toast.success).toHaveBeenCalledWith('Successful');
    expect(result).toEqual(mockAPIResponse);
  });

  it('updateProject should return null when API response has no data', async () => {
    vi.spyOn(ProjectDataAPIService, 'updateProjectAPI').mockResolvedValue({} as AxiosResponse<ApiResponse, any>);

    const result = await updateProject(validUpdateProjectRequestBody);

    expect(result).toBeNull();
  });

  it('updateProject should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(ProjectDataAPIService, 'updateProjectAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await updateProject(validUpdateProjectRequestBody);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error updating project:', error);

    consoleSpy.mockRestore();
  });

  it('getProjectSummary should return data when API returns data', async () => {
    vi.spyOn(ProjectDataAPIService, 'getProjectSummaryAPI').mockResolvedValue(successMockProjectSummary);

    const result = await getProjectSummary(id);

    expect(result).toEqual(mockProjectSummary);
  });

  it('getProjectSummary should return null when API response has no data', async () => {
    vi.spyOn(ProjectDataAPIService, 'getProjectSummaryAPI').mockResolvedValue({} as AxiosResponse<ProjectSummary, any>);

    const result = await getProjectSummary(id);

    expect(result).toBeNull();
  });

  it('getProjectSummary should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(ProjectDataAPIService, 'getProjectSummaryAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await getProjectSummary(id);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching project summary:', error);

    consoleSpy.mockRestore();
  });
});
