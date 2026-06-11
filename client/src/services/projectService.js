import api from './api';

export const projectService = {
  getProjects: async () => {
    const response = await api.get('/api/projects');
    return response.data;
  },

  getProjectById: async (id) => {
    const response = await api.get(`/api/projects/${id}`);
    return response.data;
  },

  createProject: async (projectData) => {
    const response = await api.post('/api/projects', projectData);
    return response.data;
  },

  updateProject: async (id, projectData) => {
    const response = await api.put(`/api/projects/${id}`, projectData);
    return response.data;
  },

  deleteProject: async (id) => {
    const response = await api.delete(`/api/projects/${id}`);
    return response.data;
  }
};

export default projectService;
