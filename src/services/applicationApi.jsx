import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jobpro-backend1.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all job applications
export const getAllApplications = async () => {
  try {
    const response = await api.get('/applications', {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch applications');
  }
};

// Add a new job application
export const addApplication = async (jobData) => {
  try {
    const response = await api.post('/applications', jobData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add application');
  }
};

// Get a single job application by ID
export const getApplicationById = async (applicationId) => {
  try {
    const response = await api.get(`/applications/${applicationId}`, {
      headers: getAuthHeaders(),
    });
    console.log('I have received your request', response)
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch application');
  }
};

// Update application stage
export const updateApplicationStage = async (applicationId, stage) => {
  try {
    const response = await api.put(`/applications/stage/${applicationId}`, { stage }, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update application stage');
  }
};

// Update an application
export const updateApplication = async (applicationId, updatedData) => {
  try {
    const response = await api.put(`/applications/${applicationId}`, updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update application');
  }
};

// Delete an application
export const deleteApplication = async (applicationId) => {
  try {
    const response = await api.delete(`/applications/${applicationId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete application');
  }
};