import axios from 'axios';

const token = localStorage.getItem('authToken');

const api = axios.create({
  baseURL: 'https://jobpro-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  }
});


// Get all tailored CVs
export const getTailoredCvs = async () => {
    try {
      const response = await api.get('/tailored-cvs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tailored CVs');
    }
  };
  
  // Add a new tailored CV
  export const addTailoredCv = async (cvData) => {
    try {
      const response = await api.post('/tailored-cvs', cvData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add tailored CV');
    }
  };
  
  // Get a single tailored CV by ID
  export const getTailoredCvById = async (cvId) => {
    try {
      const response = await api.get(`/tailored-cvs/${cvId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tailored CV');
    }
  };
  
  // Update tailored CV
  export const updateTailoredCv = async (cvId, cvData) => {
    try {
      const response = await api.put(`/tailored-cvs/${cvId}`, cvData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update tailored CV');
    }
  };
  
  // Delete tailored CV
  export const deleteTailoredCv = async (cvId) => {
    try {
      const response = await api.delete(`/tailored-cvs/${cvId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete tailored CV');
    }
  };
  
  // Get all tailored CVs for a specific job application
  export const getTailoredCvsForApplication = async (applicationId) => {
    try {
      const response = await api.get(`/tailored-cvs/application/${applicationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tailored CVs');
    }
  }

    
