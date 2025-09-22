import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AxiosResponse } from 'axios';
import { createItem, deleteItem, updateItem } from '../../src/services/ItemService';
import type { ApiResponse, CreateItemRequestBody, UpdateItemRequestBody } from '../../src/types';
import * as ItemDataAPIService from '../../src/services/ItemDataAPIService';
import { toast } from 'react-toastify';
import '../base';

vi.mock('../../src/services/ItemAPI', () => ({
  createItemAPI: vi.fn(),
  deleteItemAPI: vi.fn(),
  updateItemAPI: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: { success: vi.fn(), error: vi.fn(), warning: vi.fn() },
}));

describe('ItemService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const id = '1';

  const mockAPIResponse: ApiResponse = {
    summary: 'Summary',
    details: 'Successful',
    status: 200,
    instance: '/items',
    timeStamp: new Date(),
    token: '123',
  };

  const successMockAPIResponse: AxiosResponse<ApiResponse, any> = {
    data: {
      status: 200,
      details: 'Successful',
      summary: 'Summary',
      instance: '/items',
      timeStamp: new Date(),
      token: '123',
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };

  const validCreateItemRequestBody: CreateItemRequestBody = {
    title: 'title',
    description: 'description',
    whatWentWell: 'whatWentWell',
    whatDidNotGoWell: 'whatDidNotGoWell',
    lessonsLearned: 'lessonsLearned',
    dateCompleted: new Date(),
  };

  const validUpdateItemRequestBody: UpdateItemRequestBody = {
    id: '1',
    title: 'title',
    description: 'description',
    whatWentWell: 'whatWentWell',
    whatDidNotGoWell: 'whatDidNotGoWell',
    lessonsLearned: 'lessonsLearned',
    dateCompleted: new Date(),
  };

  it('createItem should return data when API returns data', async () => {
    vi.spyOn(ItemDataAPIService, 'createItemAPI').mockResolvedValue(successMockAPIResponse);

    const result = await createItem(validCreateItemRequestBody);

    expect(toast.success).toHaveBeenCalledWith('Successful');
    expect(result?.summary).toEqual(mockAPIResponse.summary);
  });

  it('createItem should return null when API response has no data', async () => {
    vi.spyOn(ItemDataAPIService, 'createItemAPI').mockResolvedValue({} as AxiosResponse<ApiResponse, any>);

    const result = await createItem(validCreateItemRequestBody);

    expect(result).toBeNull();
  });

  it('createItem should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(ItemDataAPIService, 'createItemAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await createItem(validCreateItemRequestBody);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error creating item:', error);

    consoleSpy.mockRestore();
  });

  it('deleteItem should return data when API returns data', async () => {
    vi.spyOn(ItemDataAPIService, 'deleteItemAPI').mockResolvedValue(successMockAPIResponse);

    const result = await deleteItem(id);

    expect(toast.success).toHaveBeenCalledWith('Successful');
    expect(result?.summary).toEqual(mockAPIResponse.summary);
  });

  it('deleteItem should return null when API response has no data', async () => {
    vi.spyOn(ItemDataAPIService, 'deleteItemAPI').mockResolvedValue({} as AxiosResponse<ApiResponse, any>);

    const result = await deleteItem(id);

    expect(result).toBeNull();
  });

  it('deleteItem should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(ItemDataAPIService, 'deleteItemAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await deleteItem(id);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error deleting item:', error);

    consoleSpy.mockRestore();
  });

  it('updateItem should return data when API returns data', async () => {
    vi.spyOn(ItemDataAPIService, 'updateItemAPI').mockResolvedValue(successMockAPIResponse);

    const result = await updateItem(validUpdateItemRequestBody);

    expect(toast.success).toHaveBeenCalledWith('Successful');
    expect(result?.summary).toEqual(mockAPIResponse.summary);
  });

  it('updateItem should return null when API response has no data', async () => {
    vi.spyOn(ItemDataAPIService, 'updateItemAPI').mockResolvedValue({} as AxiosResponse<ApiResponse, any>);

    const result = await updateItem(validUpdateItemRequestBody);

    expect(result).toBeNull();
  });

  it('updateItem should return null and log error when API throws', async () => {
    const error = new Error('Network error');
    vi.spyOn(ItemDataAPIService, 'updateItemAPI').mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await updateItem(validUpdateItemRequestBody);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error updating item:', error);

    consoleSpy.mockRestore();
  });
});
