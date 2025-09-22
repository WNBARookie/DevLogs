import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios, { AxiosResponse } from 'axios';
import { getProjectDetailsAPI, createProjectAPI, deleteProjectAPI, updateProjectAPI, getProjectSummaryAPI } from '../../src/services/ProjectDataAPIService';
import { EndpointsConfig } from '../../src/config/endpoints.config';
import { handleError } from '../../src/utils/ErrorHandler';
import type { ApiResponse, ProjectDetails, ProjectSummary, CreateProjectRequestBody, ProjectInfo, UpdateProjectRequestBody, ItemInfo } from '../../src/types';
import '../base';

vi.mock('axios');
vi.mock('../../src/utils/ErrorHandler', () => ({
  handleError: vi.fn(),
}));

const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>;
  get: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

describe('ProjectDataAPIService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const id = '1';

  const successMockAPIResponse: AxiosResponse<ApiResponse, any> = {
    data: {
      status: 200,
      details: 'Successful',
      summary: 'summary',
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

  it('getProjectDetailsAPI should call axios.get with correct args and return data', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(successMockProjectDetails);

    const result = await getProjectDetailsAPI(id);

    expect(mockedAxios.get).toHaveBeenCalledWith(EndpointsConfig.projectData.getProjectDetails.replace(':id', id));
    expect(result).toEqual(successMockProjectDetails);
  });

  it('getProjectDetailsAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.get = vi.fn().mockRejectedValue(error);

    await getProjectDetailsAPI(id);

    expect(handleError).toHaveBeenCalledWith(error);
  });

  it('createProjectAPI should call axios.post with correct args and return data', async () => {
    mockedAxios.post = vi.fn().mockResolvedValue(successMockAPIResponse);

    const result = await createProjectAPI(validCreateProjectRequestBody);

    expect(mockedAxios.post).toHaveBeenCalledWith(EndpointsConfig.projectData.createProject, validCreateProjectRequestBody);
    expect(result).toEqual(successMockAPIResponse);
  });

  it('createProjectAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.post = vi.fn().mockRejectedValue(error);

    await createProjectAPI(validCreateProjectRequestBody);

    expect(handleError).toHaveBeenCalledWith(error);
  });

  it('deleteProjectAPI should call axios.delete with correct args and return data', async () => {
    mockedAxios.delete = vi.fn().mockResolvedValue(successMockProjectDetails);

    const result = await deleteProjectAPI(id);

    expect(mockedAxios.delete).toHaveBeenCalledWith(EndpointsConfig.projectData.deleteProject.replace(':id', id));
    expect(result).toEqual(successMockProjectDetails);
  });

  it('deleteProjectAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.delete = vi.fn().mockRejectedValue(error);

    await deleteProjectAPI(id);

    expect(handleError).toHaveBeenCalledWith(error);
  });

  it('updateProjectAPI should call axios.put with correct args and return data', async () => {
    mockedAxios.put = vi.fn().mockResolvedValue(successMockAPIResponse);

    const result = await updateProjectAPI(validUpdateProjectRequestBody);

    expect(mockedAxios.put).toHaveBeenCalledWith(EndpointsConfig.projectData.updateProject, validUpdateProjectRequestBody);
    expect(result).toEqual(successMockAPIResponse);
  });

  it('updateProjectAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.put = vi.fn().mockRejectedValue(error);

    await updateProjectAPI(validUpdateProjectRequestBody);

    expect(handleError).toHaveBeenCalledWith(error);
  });

  it('getProjectSummaryAPI should call axios.get with correct args and return data', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(successMockProjectSummary);

    const result = await getProjectSummaryAPI(id);

    expect(mockedAxios.get).toHaveBeenCalledWith(EndpointsConfig.projectData.getProjectSummary.replace(':id', id));
    expect(result).toEqual(successMockProjectSummary);
  });

  it('getProjectSummaryAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.get = vi.fn().mockRejectedValue(error);

    await getProjectSummaryAPI(id);

    expect(handleError).toHaveBeenCalledWith(error);
  });
});
