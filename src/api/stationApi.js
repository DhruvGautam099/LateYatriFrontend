import axiosClient, { isMockMode } from './axiosClient';

import { mockStations } from '../data/mockData';

export const getStations = async () => {
  if (isMockMode) {
    return new Promise((resolve) => setTimeout(() => resolve(mockStations), 400));
  }
  const response = await axiosClient.get('/api/stations');
  return response.data;
};