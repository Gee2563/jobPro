import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../style.css';

function Account() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cvs, setCvs] = useState([]);
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const { data } = await axios.get('/api/users/cvs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        setCvs(data);
      } catch (error) {
        console.error('Failed to fetch CVs', error);
      }
    };
    fetchCvs();
  }, []);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      await axios.put('/api/users/password', { currentPassword, newPassword }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      });
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Failed to update password', error);
      alert('Failed to update password');
    }
  };

  const handleCvUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cv', cvFile);
    try {
      const { data } = await axios.post('/api/users/cvs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setCvs([...cvs, data]);
      setCvFile(null);
    } catch (error) {
      console.error('Failed to upload CV', error);
    }
  };

  const handleCvRemove = async (cvId) => {
    try {
      await axios.delete(`/api/users/cvs/${cvId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      });
      setCvs(cvs.filter(cv => cv._id !== cvId));
    } catch (error) {
      console.error('Failed to remove CV', error);
    }
  };

  return (
    <div>
      <h2>Account Settings</h2>
      <div>
        <h3>Change Password</h3>
        <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button onClick={handlePasswordChange}>Update Password</button>
      </div>
      <div>
        <h3>Upload CV</h3>
        <form onSubmit={handleCvUpload}>
          <input type="file" onChange={(e) => setCvFile(e.target.files[0])} />
          <button type="submit">Upload</button>
        </form>
        <div>
          <h4>Uploaded CVs</h4>
          <ul>
            {cvs.map(cv => (
              <li key={cv._id}>
                {cv.name} <button onClick={() => handleCvRemove(cv._id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Account;
