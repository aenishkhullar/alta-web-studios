import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    
    // Check if the response was successful and contains data
    if (response.data && response.data.success) {
      const { token, admin } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));
    }
    
    return response.data;
  },

  getCurrentAdmin: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  logout: async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error on server:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getCurrentUser: () => {
    const adminStr = localStorage.getItem('admin');
    try {
      return adminStr ? JSON.parse(adminStr) : null;
    } catch (e) {
      return null;
    }
  }
};

export default authService;
