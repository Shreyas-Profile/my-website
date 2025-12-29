import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const activitiesAPI = {
  // Get all activities
  getAll: async () => {
    const response = await api.get('/api/activities');
    return response.data;
  },

  // Get single activity
  getById: async (id) => {
    const response = await api.get(`/api/activities/${id}`);
    return response.data;
  },

  // Create activity with file uploads
  create: async (formData) => {
    const response = await api.post('/api/activities', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete activity
  delete: async (id) => {
    await api.delete(`/api/activities/${id}`);
  },
};

export default api;

