import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/users/me')
        .then(response => setUser(response.data))
        .catch(() => {
          localStorage.removeItem('authToken');
          setUser(null);
        });
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/api/users/login', { email, password });
    localStorage.setItem('authToken', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    setUser(response.data);
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
