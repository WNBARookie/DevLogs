import { toast } from 'react-toastify';
import type { CreateItemRequestBody, ApiResponse, UpdateItemRequestBody } from '../types';
import { createItemAPI, deleteItemAPI, updateItemAPI } from './ItemDataAPIService';

export const createItem = async (requestBody: CreateItemRequestBody): Promise<ApiResponse | null> => {
  try {
    const res = await createItemAPI(requestBody);
    if (res && res.data) {
      toast.success(res.data.details);
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error creating item:', error);
    return null;
  }
};

export const deleteItem = async (id: string): Promise<ApiResponse | null> => {
  try {
    const res = await deleteItemAPI(id);
    if (res && res.data) {
      toast.success(res.data.details);
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error deleting item:', error);
    return null;
  }
};

export const updateItem = async (requestBody: UpdateItemRequestBody): Promise<ApiResponse | null> => {
  try {
    const res = await updateItemAPI(requestBody);
    if (res && res.data) {
      toast.success(res.data.details);
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error updating item:', error);
    return null;
  }
};
