import axiosClient, { isMockMode } from './axiosClient';
import { mockLogin, mockRegister } from '../data/mockData';

export const login = async (email, password) => {
  if (isMockMode) {
    return await mockLogin(email, password);
  }
  const response = await axiosClient.post('/api/auth/login', { email, password });
  return response.data;
};

export const register = async (email, password, name) => {
  if (isMockMode) {
    return await mockRegister(email, password, name);
  }
  const response = await axiosClient.post('/api/auth/register', { email, password, name });
  return response.data;
};