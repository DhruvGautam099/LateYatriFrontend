import axiosClient, { isMockMode } from './axiosClient';

import { getMockETAPrediction } from '../data/mockData';

export const predictETA = async (trainNumber, stationCode) => {
  if (isMockMode) {
    return new Promise((resolve) => setTimeout(() => resolve(getMockETAPrediction(trainNumber, stationCode)), 1500)); // Simulate ML delay
  }
  const response = await axiosClient.post('/api/eta/predict', { trainNumber, stationCode });
  return response.data;
};