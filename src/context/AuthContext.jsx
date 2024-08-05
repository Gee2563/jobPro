import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {login} from '../services/accountApi';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('Token from localStorage:', token);

      // rest of axios code is in services dir - OK to leave this here?
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/users/me')  
        .then(response => {
          console.log('User data:', response.data);
          setUser(response.data);
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
      const response = await login(email, password);
      console.log('Login response:', response.data);
      localStorage.setItem('authToken', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data);
    } catch (error) {
      console.error('Login error:', error);
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
