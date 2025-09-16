import { toast } from 'react-toastify';
import type { ApiResponse, AreaDetails, AreaInfo, AreaSummary, CreateAreaRequestBody, UpdateAreaRequestBody } from '../types';
import { createAreaAPI, deleteAreaAPI, getAreaDetailsAPI, getAreasAPI, getAreaSumamryAPI, updateAreaAPI } from './AreaDataAPIService';

export const getAreas = async (): Promise<AreaInfo[] | null> => {
  try {
    const res = await getAreasAPI();
    if (res && res.data) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching areas:', error);
    return null;
  }
};

export const getAreaDetails = async (id: string): Promise<AreaDetails | null> => {
  try {
    const res = await getAreaDetailsAPI(id);
    if (res && res.data) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching area details:', error);
    return null;
  }
};

export const createArea = async (requestBody: CreateAreaRequestBody): Promise<ApiResponse | null> => {
  try {
    const res = await createAreaAPI(requestBody);
    if (res && res.data) {
      toast.success(res.data.details);
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error creating area:', error);
    return null;
  }
};

export const deleteArea = async (id: string): Promise<ApiResponse | null> => {
  try {
    const res = await deleteAreaAPI(id);
    if (res && res.data) {
      toast.success(res.data.details);
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error deleting area:', error);
    return null;
  }
};

export const updateArea = async (requestBody: UpdateAreaRequestBody): Promise<ApiResponse | null> => {
  try {
    const res = await updateAreaAPI(requestBody);
    if (res && res.data) {
      toast.success(res.data.details);
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error updating area:', error);
    return null;
  }
};

export const getAreaSummary = async (id: string): Promise<AreaSummary | null> => {
  try {
    const res = await getAreaSumamryAPI(id);
    if (res && res.data) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching area summary:', error);
    return null;
  }
};
