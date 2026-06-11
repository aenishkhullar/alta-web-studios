import api from './api';

export const deliverableService = {
  getDeliverables: async () => {
    const response = await api.get('/deliverables');
    return response.data;
  },

  getDeliverableById: async (id) => {
    const response = await api.get(`/deliverables/${id}`);
    return response.data;
  },

  createDeliverable: async (deliverableData) => {
    const response = await api.post('/deliverables', deliverableData);
    return response.data;
  },

  updateDeliverable: async (id, deliverableData) => {
    const response = await api.put(`/deliverables/${id}`, deliverableData);
    return response.data;
  },

  deleteDeliverable: async (id) => {
    const response = await api.delete(`/deliverables/${id}`);
    return response.data;
  }
};

export default deliverableService;
