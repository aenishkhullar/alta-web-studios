import api from './api';

export const leadService = {
  createLead: async (leadData) => {
    const response = await api.post('/leads', leadData);
    return response.data;
  },

  getLeads: async () => {
    const response = await api.get('/leads');
    return response.data;
  },

  updateLeadStatus: async (id, status) => {
    const response = await api.put(`/leads/${id}`, { status });
    return response.data;
  },

  deleteLead: async (id) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  },

  convertLead: async (id) => {
    const response = await api.post(`/leads/${id}/convert`);
    return response.data;
  }
};

export default leadService;
