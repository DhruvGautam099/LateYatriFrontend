import axiosClient, { isMockMode } from './axiosClient';
import { getMockLocationHistory } from '../data/mockData';

export const getTrainLocation = async (trainNumber) => {
  if (isMockMode) {
    const history = getMockLocationHistory(trainNumber);
    return new Promise((resolve) => setTimeout(() => resolve(history[history.length - 1]), 300));
  }
  const response = await axiosClient.get(`/api/trains/${trainNumber}/location`);
  return response.data;
};

export const getTrainLocationHistory = async (trainNumber) => {
  if (isMockMode) {
    return new Promise((resolve) => setTimeout(() => resolve(getMockLocationHistory(trainNumber)), 500));
  }
  const response = await axiosClient.get(`/api/trains/${trainNumber}/location/history`);
  return response.data;
};