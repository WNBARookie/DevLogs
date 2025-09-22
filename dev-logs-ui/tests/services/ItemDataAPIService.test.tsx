import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios, { AxiosResponse } from 'axios';
import { createItemAPI, deleteItemAPI, updateItemAPI } from '../../src/services/ItemDataAPIService';
import { EndpointsConfig } from '../../src/config/endpoints.config';
import { handleError } from '../../src/utils/ErrorHandler';
import type { ApiResponse, CreateItemRequestBody, UpdateItemRequestBody, ItemInfo } from '../../src/types';
import '../base';

vi.mock('axios');
vi.mock('../../src/utils/ErrorHandler', () => ({
  handleError: vi.fn(),
}));

const mockedAxios = axios as unknown as {
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

describe('ItemDataAPIService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const id = '1';

  const successMockAPIResponse: AxiosResponse<ApiResponse, any> = {
    data: {
      status: 200,
      details: 'Successful',
      summary: 'summary',
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

  it('createItemAPI should call axios.post with correct args and return data', async () => {
    mockedAxios.post = vi.fn().mockResolvedValue(successMockAPIResponse);

    const result = await createItemAPI(validCreateItemRequestBody);

    expect(mockedAxios.post).toHaveBeenCalledWith(EndpointsConfig.itemData.createItem, validCreateItemRequestBody);
    expect(result).toEqual(successMockAPIResponse);
  });

  it('createItemAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.post = vi.fn().mockRejectedValue(error);

    await createItemAPI(validCreateItemRequestBody);

    expect(handleError).toHaveBeenCalledWith(error);
  });

  it('deleteItemAPI should call axios.delete with correct args and return data', async () => {
    mockedAxios.delete = vi.fn().mockResolvedValue(id);

    const result = await deleteItemAPI(id);

    expect(mockedAxios.delete).toHaveBeenCalledWith(EndpointsConfig.itemData.deleteItem.replace(':id', id));
    expect(result).toEqual(id);
  });

  it('deleteItemAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.delete = vi.fn().mockRejectedValue(error);

    await deleteItemAPI(id);

    expect(handleError).toHaveBeenCalledWith(error);
  });

  it('updateItemAPI should call axios.put with correct args and return data', async () => {
    mockedAxios.put = vi.fn().mockResolvedValue(successMockAPIResponse);

    const result = await updateItemAPI(validUpdateItemRequestBody);

    expect(mockedAxios.put).toHaveBeenCalledWith(EndpointsConfig.itemData.updateItem, validUpdateItemRequestBody);
    expect(result).toEqual(successMockAPIResponse);
  });

  it('updateItemAPI should call handleError on failure', async () => {
    const error = new Error('Network error');
    mockedAxios.put = vi.fn().mockRejectedValue(error);

    await updateItemAPI(validUpdateItemRequestBody);

    expect(handleError).toHaveBeenCalledWith(error);
  });
});
