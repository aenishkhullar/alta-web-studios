import api from './api';

export const emailService = {
  sendEmail: async (emailData) => {
    const response = await api.post('/api/emails/send', emailData);
    return response.data;
  },

  saveDraft: async (draftData) => {
    const response = await api.post('/api/emails/draft', draftData);
    return response.data;
  },

  getEmails: async (status, search) => {
    const params = {};
    if (status && status !== 'All') {
      params.status = status.toLowerCase();
    }
    if (search) {
      params.search = search;
    }
    const response = await api.get('/api/emails', { params });
    return response.data;
  },

  getEmailById: async (id) => {
    const response = await api.get(`/api/emails/${id}`);
    return response.data;
  },

  deleteEmail: async (id) => {
    const response = await api.delete(`/api/emails/${id}`);
    return response.data;
  }
};

export default emailService;
