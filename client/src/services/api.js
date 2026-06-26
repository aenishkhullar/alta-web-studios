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
    const token = localStorage.getItem('token');
    console.log('[AXIOS REQUEST AUDIT] Path:', config.url, 'Token from localStorage:', token ? `${token.substring(0, 15)}... [length: ${token.length}]` : 'not found');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('[AXIOS REQUEST AUDIT] Attached Authorization header:', config.headers['Authorization']);
    } else {
      console.log('[AXIOS REQUEST AUDIT] No token found in localStorage, Authorization header not attached.');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
