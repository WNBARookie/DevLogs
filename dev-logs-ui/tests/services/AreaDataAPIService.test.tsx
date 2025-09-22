import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios, { AxiosResponse } from 'axios';
import { getAreasAPI, getAreaDetailsAPI, createAreaAPI, deleteAreaAPI, updateAreaAPI, getAreaSummaryAPI } from '../../src/services/AreaDataAPIService';
import { EndpointsConfig } from '../../src/config/endpoints.config';
import { handleError } from '../../src/utils/ErrorHandler';
import type { ApiResponse, AreaDetails, AreaInfo, AreaSummary, CreateAreaRequestBody, ProjectInfo, UpdateAreaRequestBody } from '../../src/types';
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

describe('AreaDataAPIService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const id = '1';

  const successMockAPIResponse: AxiosResponse<ApiResponse, any> = {
    data: {
      status: 200,
      details: 'Successful',
      summary: 'summary',
      instance: '/areas',
      timeStamp: new Date(),
      token: '123',
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };

  const mockArea: AreaInfo = {
    id: '1',
    title: 'title',
    description: 'description',
  };

  const successMockAreas: AxiosResponse<AreaInfo[], any> = {
    data: [mockArea],
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

  const mockAreaDetails: AreaDetails = {
    area: mockArea,
    projects: [mockProject],
  };
  const successMockAreaDetails: AxiosResponse<AreaDetails, any> = {
    data: mockAreaDetails,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };

  const mockAreaSummary: AreaSummary = {
    summary: 'Summary',
  };
  const successMockAreaSummary: AxiosResponse<AreaSummary, any> = {
    data: mockAreaSummary,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };

  const validCreateAreaRequestBody: CreateAreaRequestBody = { title: 'title', description: 'description' };
  const validUpdateAreaRequestBody: UpdateAreaRequestBody = { id: '1', title: 'title', description: 'description' };

  it('getAreasAPI should call axios.get with correct args and return data', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(successMockAreas);

    const result = await getAreasAPI();

    expect(mockedAxios.get).toHaveBeenCalledWith(EndpointsConfig.areaData.getAreas);
    expect(result).toEqual(successMockAreas);
  });

  it('getAreasAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.get = vi.fn().mockRejectedValue(error);

    await getAreasAPI();

    expect(handleError).toHaveBeenCalledWith(error);
  });

  it('getAreaDetailsAPI should call axios.get with correct args and return data', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(successMockAreaDetails);

    const result = await getAreaDetailsAPI(id);

    expect(mockedAxios.get).toHaveBeenCalledWith(EndpointsConfig.areaData.getAreaDetails.replace(':id', id));
    expect(result).toEqual(successMockAreaDetails);
  });

  it('getAreaDetailsAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.get = vi.fn().mockRejectedValue(error);

    await getAreaDetailsAPI(id);

    expect(handleError).toHaveBeenCalledWith(error);
  });

  it('createAreaAPI should call axios.post with correct args and return data', async () => {
    mockedAxios.post = vi.fn().mockResolvedValue(successMockAPIResponse);

    const result = await createAreaAPI(validCreateAreaRequestBody);

    expect(mockedAxios.post).toHaveBeenCalledWith(EndpointsConfig.areaData.createArea, validCreateAreaRequestBody);
    expect(result).toEqual(successMockAPIResponse);
  });

  it('createAreaAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.post = vi.fn().mockRejectedValue(error);

    await createAreaAPI(validCreateAreaRequestBody);

    expect(handleError).toHaveBeenCalledWith(error);
  });

  it('deleteAreaAPI should call axios.delete with correct args and return data', async () => {
    mockedAxios.delete = vi.fn().mockResolvedValue(successMockAreaDetails);

    const result = await deleteAreaAPI(id);

    expect(mockedAxios.delete).toHaveBeenCalledWith(EndpointsConfig.areaData.deleteArea.replace(':id', id));
    expect(result).toEqual(successMockAreaDetails);
  });

  it('deleteAreaAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.delete = vi.fn().mockRejectedValue(error);

    await deleteAreaAPI(id);

    expect(handleError).toHaveBeenCalledWith(error);
  });

  it('updateAreaAPI should call axios.put with correct args and return data', async () => {
    mockedAxios.put = vi.fn().mockResolvedValue(successMockAPIResponse);

    const result = await updateAreaAPI(validUpdateAreaRequestBody);

    expect(mockedAxios.put).toHaveBeenCalledWith(EndpointsConfig.areaData.updateArea, validUpdateAreaRequestBody);
    expect(result).toEqual(successMockAPIResponse);
  });

  it('updateAreaAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.put = vi.fn().mockRejectedValue(error);

    await updateAreaAPI(validUpdateAreaRequestBody);

    expect(handleError).toHaveBeenCalledWith(error);
  });

  it('getAreaSummaryAPI should call axios.get with correct args and return data', async () => {
    mockedAxios.get = vi.fn().mockResolvedValue(successMockAreaSummary);

    const result = await getAreaSummaryAPI(id);

    expect(mockedAxios.get).toHaveBeenCalledWith(EndpointsConfig.areaData.getAreaSummary.replace(':id', id));
    expect(result).toEqual(successMockAreaSummary);
  });

  it('getAreaSummaryAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.get = vi.fn().mockRejectedValue(error);

    await getAreaSummaryAPI(id);

    expect(handleError).toHaveBeenCalledWith(error);
  });
});
