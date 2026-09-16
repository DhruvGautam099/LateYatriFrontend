import axiosClient, { isMockMode } from './axiosClient';
import { mockRoutes } from '../data/mockData';

export const getTrainRoute = async (trainNumber) => {
  if (isMockMode) {
    return new Promise((resolve) => setTimeout(() => resolve(mockRoutes[trainNumber] || []), 500));
  }
  const response = await axiosClient.get(`/api/routes/train/${trainNumber}`);
  return response.data;
};