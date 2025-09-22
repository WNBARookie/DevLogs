import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AxiosResponse } from 'axios';
import { getAreas, getAreaDetails, createArea, deleteArea, updateArea, getAreaSummary } from '../../src/services/AreaService';
import type { ApiResponse, AreaDetails, AreaInfo, AreaSummary, CreateAreaRequestBody, ProjectInfo, UpdateAreaRequestBody } from '../../src/types';
import * as AreaDataAPIService from '../../src/services/AreaDataAPIService';
import { toast } from 'react-toastify';
import '../base';

vi.mock('../../src/services/AreaAPI', () => ({
  getAreasAPI: vi.fn(),
  getAreaDetailsAPI: vi.fn(),
  createAreaAPI: vi.fn(),
  deleteAreaAPI: vi.fn(),
  updateAreaAPI: vi.fn(),
  getAreaSummaryAPI: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn() },
}));

describe('AreaService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const id = '1';

  const mockAPIResponse: ApiResponse = {
    summary: 'Summary',
    details: 'Successful',
    status: 200,
    instance: '/areas',
    timeStamp: new Date(),
    token: '123',
  };

  const successMockAPIResponse: AxiosResponse<ApiResponse, any> = {
    data: {
      status: 200,
      details: 'Successful',
      summary: 'Summary',
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

  it('getAreas should return data when API returns data', async () => {
    vi.spyOn(AreaDataAPIService, 'getAreasAPI').mockResolvedValue(successMockAreas);

    const result = await getAreas();

    expect(result).toEqual([mockArea]);
  });

  it('getAreas should return null when API response has no data', async () => {
    vi.spyOn(AreaDataAPIService, 'getAreasAPI').mockResolvedValue({} as AxiosResponse<AreaInfo[], any>);

    const result = await getAreas();

    expect(result).toBeNull();
  });

  it('getAreas should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(AreaDataAPIService, 'getAreasAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await getAreas();

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching areas:', error);

    consoleSpy.mockRestore();
  });

  it('getAreaDetails should return data when API returns data', async () => {
    vi.spyOn(AreaDataAPIService, 'getAreaDetailsAPI').mockResolvedValue(successMockAreaDetails);

    const result = await getAreaDetails(id);

    expect(result).toEqual(mockAreaDetails);
  });

  it('getAreaDetails should return null when API response has no data', async () => {
    vi.spyOn(AreaDataAPIService, 'getAreaDetailsAPI').mockResolvedValue({} as AxiosResponse<AreaDetails, any>);

    const result = await getAreaDetails(id);

    expect(result).toBeNull();
  });

  it('getAreaDetails should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(AreaDataAPIService, 'getAreaDetailsAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await getAreaDetails(id);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching area details:', error);

    consoleSpy.mockRestore();
  });

  it('createArea should return data when API returns data', async () => {
    vi.spyOn(AreaDataAPIService, 'createAreaAPI').mockResolvedValue(successMockAPIResponse);

    const result = await createArea(validCreateAreaRequestBody);

    expect(toast.success).toHaveBeenCalledWith('Successful');
    expect(result?.summary).toEqual(mockAPIResponse.summary);
  });

  it('createArea should return null when API response has no data', async () => {
    vi.spyOn(AreaDataAPIService, 'createAreaAPI').mockResolvedValue({} as AxiosResponse<ApiResponse, any>);

    const result = await createArea(validCreateAreaRequestBody);

    expect(result).toBeNull();
  });

  it('createArea should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(AreaDataAPIService, 'createAreaAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await createArea(validCreateAreaRequestBody);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error creating area:', error);

    consoleSpy.mockRestore();
  });

  it('deleteArea should return data when API returns data', async () => {
    vi.spyOn(AreaDataAPIService, 'deleteAreaAPI').mockResolvedValue(successMockAPIResponse);

    const result = await deleteArea(id);

    expect(toast.success).toHaveBeenCalledWith('Successful');
    expect(result).toEqual(mockAPIResponse);
  });

  it('deleteArea should return null when API response has no data', async () => {
    vi.spyOn(AreaDataAPIService, 'deleteAreaAPI').mockResolvedValue({} as AxiosResponse<ApiResponse, any>);

    const result = await deleteArea(id);

    expect(result).toBeNull();
  });

  it('deleteArea should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(AreaDataAPIService, 'deleteAreaAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await deleteArea(id);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error deleting area:', error);

    consoleSpy.mockRestore();
  });

  it('updateArea should return data when API returns data', async () => {
    vi.spyOn(AreaDataAPIService, 'updateAreaAPI').mockResolvedValue(successMockAPIResponse);

    const result = await updateArea(validUpdateAreaRequestBody);

    expect(toast.success).toHaveBeenCalledWith('Successful');
    expect(result).toEqual(mockAPIResponse);
  });

  it('updateArea should return null when API response has no data', async () => {
    vi.spyOn(AreaDataAPIService, 'updateAreaAPI').mockResolvedValue({} as AxiosResponse<ApiResponse, any>);

    const result = await updateArea(validUpdateAreaRequestBody);

    expect(result).toBeNull();
  });

  it('updateArea should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(AreaDataAPIService, 'updateAreaAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await updateArea(validUpdateAreaRequestBody);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error updating area:', error);

    consoleSpy.mockRestore();
  });

  it('getAreaSummary should return data when API returns data', async () => {
    vi.spyOn(AreaDataAPIService, 'getAreaSummaryAPI').mockResolvedValue(successMockAreaSummary);

    const result = await getAreaSummary(id);

    expect(result).toEqual(mockAreaSummary);
  });

  it('getAreaSummary should return null when API response has no data', async () => {
    vi.spyOn(AreaDataAPIService, 'getAreaSummaryAPI').mockResolvedValue({} as AxiosResponse<AreaSummary, any>);

    const result = await getAreaSummary(id);

    expect(result).toBeNull();
  });

  it('getAreaSummary should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(AreaDataAPIService, 'getAreaSummaryAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await getAreaSummary(id);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching area summary:', error);

    consoleSpy.mockRestore();
  });
});
