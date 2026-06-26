import axios from 'axios';

// Centralized API configuration
export const API_BASE_URL = (() => {
  let url = import.meta.env.VITE_API_URL || '';
  if (url.endsWith('/api')) {
    url = url.slice(0, -4);
  }
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  return url;
})();

if (!API_BASE_URL) {
  console.warn(
    'Warning: VITE_API_URL environment variable is not defined.\n' +
    'API calls will fall back to relative path (using local proxy in development).'
  );
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to automatically add authorization token
api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');
    if (token) {
      // Clean any wrapping quotes from token (defensive programming)
      if (token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
      }
      if (config.headers && typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration or unauthorized errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      
      // Redirect to login page if we are not already there
      if (!window.location.pathname.endsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
