import axiosClient, { isMockMode } from './axiosClient';
import { mockJourneyHistory } from '../data/mockData';

export const getTrainHistory = async (trainNumber) => {
  if (isMockMode) {
    return new Promise((resolve) => setTimeout(() => resolve(mockJourneyHistory), 600));
  }
  const response = await axiosClient.get(`/api/history/train/${trainNumber}`);
  return response.data;
};

export const getStationHistory = async (stationCode) => {
  if (isMockMode) {
    return new Promise((resolve) => setTimeout(() => resolve(mockJourneyHistory), 600));
  }
  const response = await axiosClient.get(`/api/history/station/${stationCode}`);
  return response.data;
};