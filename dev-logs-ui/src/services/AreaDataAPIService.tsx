import axios from 'axios';
import { EndpointsConfig } from '../config/endpoints.config';
import type { ApiResponse, AreaDetails, AreaInfo, CreateAreaRequestBody, UpdateAreaRequestBody } from '../types';
import { handleError } from '../utils/ErrorHandler';

export const getAreasAPI = async () => {
  try {
    const data = await axios.get<AreaInfo[]>(EndpointsConfig.areaData.getAreas);

    return data;
  } catch (error) {
    console.error('Error fetching areas:', error);
    handleError(error);
  }
};

export const getAreaDetailsAPI = async (id: string) => {
  try {
    const data = await axios.get<AreaDetails>(EndpointsConfig.areaData.getAreaDetails.replace(':id', id));

    return data;
  } catch (error) {
    console.error('Error fetching area details:', error);
    handleError(error);
  }
};

export const createAreaAPI = async (requestBody: CreateAreaRequestBody) => {
  try {
    const data = await axios.post<ApiResponse>(EndpointsConfig.areaData.createArea, requestBody);

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteAreaAPI = async (id: string) => {
  try {
    const data = await axios.delete<ApiResponse>(EndpointsConfig.areaData.deleteArea.replace(':id', id));

    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updateAreaAPI = async (requestBody: UpdateAreaRequestBody) => {
  try {
    const data = await axios.put<ApiResponse>(EndpointsConfig.areaData.updateArea, requestBody);

    return data;
  } catch (error) {
    handleError(error);
  }
};
