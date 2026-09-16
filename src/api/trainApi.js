import axiosClient, { isMockMode } from './axiosClient';
import { mockTrains, getMockTrainStatus } from '../data/mockData';

export const getTrains = async () => {
  if (isMockMode) {
    return new Promise((resolve) => setTimeout(() => resolve(mockTrains), 500));
  }
  const response = await axiosClient.get('/api/trains');
  return response.data;
};

export const getTrainByNumber = async (trainNumber) => {
  if (isMockMode) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const train = mockTrains.find((t) => t.trainNumber === trainNumber);
        if (train) resolve(train);else
        reject(new Error('Train not found'));
      }, 300);
    });
  }
  const response = await axiosClient.get(`/api/trains/${trainNumber}`);
  return response.data;
};

export const getTrainStatus = async (trainNumber) => {
  if (isMockMode) {
    return new Promise((resolve) => setTimeout(() => resolve(getMockTrainStatus(trainNumber)), 500));
  }
  const response = await axiosClient.get(`/api/trains/${trainNumber}/status`);
  return response.data;
};