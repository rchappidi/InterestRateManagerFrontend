import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
});

// Automatically attach the token to each request if it exists
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add response interceptor to handle 401 errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized. Redirecting to login...');
      // Optionally trigger logout or redirect here
    }
    return Promise.reject(error);
  }
);

export default instance;
