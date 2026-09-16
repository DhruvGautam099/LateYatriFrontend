import axios from 'axios';

const apiMode = import.meta.env.VITE_API_MODE || 'mock';
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const isMockMode = apiMode === 'mock';

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;