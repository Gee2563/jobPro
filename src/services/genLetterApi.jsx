import axios from 'axios';

const token = localStorage.getItem('authToken');

const api = axios.create({
  baseURL: 'https://jobpro-backend1.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  }
});


// Get all cover letters
export const getGenLetters = async () => {
    try {
      const response = await api.get('/gen-letters', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cover letters');
    }
  };
  
  // Add a new cover letter
  export const addGenLetter = async (data) => {
    try {
      const response = await api.post('/gen-letters', data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add cover letter');
    }
  };
  
  // Get a single cover letter by ID
  export const getGenLetterById = async (id) => {
    try {
      const response = await api.get(`/gen-letters/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cover letter');
    }
  };
  
  // Update cover letter
  export const updateGenLetter = async (id, data) => {
    try {
      const response = await api.put(`/gen-letters/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update cover letter');
    }
  };
  
  // Delete cover letter
  export const deleteGenLetter = async (id) => {
    try {
      const response = await api.delete(`/gen-letters/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete cover letter');
    }
  };
  
  // Get all cover letters for a specific job application
  export const getGenLettersForApplication = async (applicationId) => {
    try {
      const response = await api.get(`/gen-letters/application/${applicationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cover letter');
    }
  }

    
