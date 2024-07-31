import axios from 'axios';

const token = localStorage.getItem('authToken');

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Get all uploaded CVs
export const getUploadedCvs = async () => {
    try {
      const response = await api.get('/uploaded-cvs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch uploaded CVs');
    }
  };
  
  // Add a new uploaded CV
  export const addUploadedCv = async (cvData) => {
    try {
      const response = await api.post('/uploaded-cvs', cvData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add uploaded CV');
    }
  };
  
  // Get a single uploaded CV by ID
  export const getUploadedCvById = async (cvId) => {
    try {
      const response = await api.get(`/uploaded-cvs/${cvId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch uploaded CV');
    }
  };
  
  // Update uploaded CV
  export const updateUploadedCv = async (cvId, cvData) => {
    try {
      const response = await api.put(`/uploaded-cvs/${cvId}`, cvData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update uploaded CV');
    }
  };
  
  // Delete uploaded CV
  export const deleteUploadedCv = async (cvId) => {
    try {
      const response = await api.delete(`/uploaded-cvs/${cvId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete uploaded CV');
    }
  };
  
  