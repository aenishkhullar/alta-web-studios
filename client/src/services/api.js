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
      console.log('[AXIOS REQUEST AUDIT] Path:', config.url, 'Token from localStorage:', token ? `${token.substring(0, 15)}... [length: ${token.length}]` : 'not found');
      if (config.headers && typeof config.headers.set === 'function') {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      const authHeader = (config.headers && typeof config.headers.get === 'function') 
        ? config.headers.get('Authorization') 
        : config.headers?.Authorization;
      console.log('[AXIOS REQUEST AUDIT] Attached Authorization header:', authHeader);
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
