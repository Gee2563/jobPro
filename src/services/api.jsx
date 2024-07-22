import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Register a new user
export const register = async (email, password) => {
  try {
    const response = await api.post('/users/register', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Log in a user
export const login = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Get user account information
export const getAccount = async (token) => {
  try {
    const response = await api.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch account');
  }
};

// Change user password
export const changePassword = async (token, currentPassword, newPassword) => {
  try {
    const response = await api.put('/users/password', { currentPassword, newPassword }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Password change failed');
  }
};

// Upload a CV
export const uploadCV = async (token, formData) => {
  try {
    const response = await api.post('/users/cvs', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'CV upload failed');
  }
};

// Get all job applications
export const getAllApplications = async (token) => {
  try {
    const response = await api.get('/applications', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch applications');
  }
};

// Add a new job application
export const addApplication = async (token, jobData) => {
  try {
    const response = await api.post('/applications', jobData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add application');
  }
};

// Get a single job application by ID
export const getApplicationById = async (token, applicationId) => {
  try {
    const response = await api.get(`/applications/${applicationId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch application');
  }
};
