import axios from 'axios';
import { EndpointsConfig } from '../config/endpoints.config';
import type { ApiResponse, CreateItemRequestBody, UpdateItemRequestBody } from '../types';
import { handleError } from '../utils/ErrorHandler';

export const createItemAPI = async (requestBody: CreateItemRequestBody) => {
  try {
    const data = await axios.post<ApiResponse>(EndpointsConfig.itemData.createItem, requestBody);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteItemAPI = async (id: string) => {
  try {
    const data = await axios.delete<ApiResponse>(EndpointsConfig.itemData.deleteItem.replace(':id', id));

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateItemAPI = async (requestBody: UpdateItemRequestBody) => {
  try {
    const data = await axios.put<ApiResponse>(EndpointsConfig.itemData.updateItem, requestBody);

    return data;
  } catch (error) {
    handleError(error);
  }
};
