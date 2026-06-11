import api from './api';

export const deliverableService = {
  getDeliverables: async () => {
    const response = await api.get('/api/deliverables');
    return response.data;
  },

  getDeliverableById: async (id) => {
    const response = await api.get(`/api/deliverables/${id}`);
    return response.data;
  },

  createDeliverable: async (deliverableData) => {
    const response = await api.post('/api/deliverables', deliverableData);
    return response.data;
  },

  updateDeliverable: async (id, deliverableData) => {
    const response = await api.put(`/api/deliverables/${id}`, deliverableData);
    return response.data;
  },

  deleteDeliverable: async (id) => {
    const response = await api.delete(`/api/deliverables/${id}`);
    return response.data;
  }
};

export default deliverableService;
