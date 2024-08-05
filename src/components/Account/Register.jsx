import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/accountApi';
import { AuthContext } from '../../context/AuthContext';
import { passwordValid } from '../../utils/passwordValid';


function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!passwordValid(password)) {
      alert('Password must be between 8 and 20 characters and contain at least one uppercase letter, one lowercase letter, and one number.');
      return;
    }
    try {
      const { token, user } = await register(email, password); 
      localStorage.setItem('authToken', token);
      setUser(user); 
      navigate('/'); 
    } catch (error) {
      console.error('Registration failed:', error.message);
      alert('Registration failed. Please check the console for details.');
    }
  };

  return (
    <div className='register-container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:
          <input className="password-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>Password:
          <input className="password-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
        </div>
        <div>
          <label>Confirm Password:
          <input className="password-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </label>
        </div>
        <button type="submit">Register</button>
        
      </form>
    </div>
  );
}

export default Register;
