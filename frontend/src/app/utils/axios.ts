import axios from 'axios';
import API_BASE_URL from '../../config';
import { getTokenFromCookies } from './cookie';

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
