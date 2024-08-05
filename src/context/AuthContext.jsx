import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, getAccount } from '../services/accountApi';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('Token from localStorage:', token);

      // Configure axios defaults
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch user data
      getAccount()
        .then(response => {
          console.log('User data:', response);
          setUser(response);
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
          localStorage.removeItem('authToken');
          setUser(null);
        });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiLogin(email, password);
      console.log('Login response:', response);
      localStorage.setItem('authToken', response.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      setUser(response.user); // Assuming `response.user` contains user data
    } catch (error) {
      console.error('Login error:', error);
      // Optionally, handle error feedback to the user
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
