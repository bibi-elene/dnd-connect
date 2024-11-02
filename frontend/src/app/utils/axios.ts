import axios from 'axios';
import API_BASE_URL from '../../config';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the token
instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
