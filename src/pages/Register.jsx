import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api'; // Import the register function from api.js
import { AuthContext } from '../context/AuthContext';
import '../style.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUser } = useContext(AuthContext); // Ensure AuthContext is imported and used correctly
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      const { token, user } = await register(email, password); // Use the register function from api.js
      localStorage.setItem('authToken', token);
      setUser(user); // Ensure setUser is a function provided by AuthContext
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Registration failed:', error.message);
      alert('Registration failed. Please check the console for details.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
