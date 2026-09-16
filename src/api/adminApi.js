import axiosClient, { isMockMode } from './axiosClient';
import { mockTrains, mockAddTrain, mockUpdateTrain, mockDeleteTrain } from '../data/mockData';

export const getAdminTrains = async () => {
  if (isMockMode) {
    return new Promise((resolve) => setTimeout(() => resolve(mockTrains), 400));
  }
  const response = await axiosClient.get('/api/admin/trains');
  return response.data;
};

export const createTrain = async (train) => {
  if (isMockMode) {
    return await mockAddTrain(train);
  }
  const response = await axiosClient.post('/api/admin/trains', train);
  return response.data;
};

export const updateTrain = async (id, train) => {
  if (isMockMode) {
    return await mockUpdateTrain(id, train);
  }
  const response = await axiosClient.put(`/api/admin/trains/${id}`, train);
  return response.data;
};

export const deleteTrain = async (id) => {
  if (isMockMode) {
    return await mockDeleteTrain(id);
  }
  await axiosClient.delete(`/api/admin/trains/${id}`);
};