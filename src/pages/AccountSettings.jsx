// src/components/Account.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Account() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cvs, setCvs] = useState([]);
  const [cvContent, setCvContent] = useState('');
  const [cvComments, setCvComments] = useState('');

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const { data } = await axios.get('/api/uploaded-cvs', {
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

  const handleCvSubmit = async (e) => {
    e.preventDefault();
    const cvFilename = `CV_${new Date().toISOString()}.txt`;

    try {
      const payload = {
        cvComments,
        cvContent,
        cvFilename
      };

      const { data } = await axios.post('/api/uploaded-cvs', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      setCvs([...cvs, data]);
      setCvContent('');
      setCvComments('');
    } catch (error) {
      console.error('Failed to submit CV', error);
      alert('Failed to submit CV');
    }
  };

  const handleCvRemove = async (cvId) => {
    try {
      await axios.delete(`/api/uploaded-cvs/${cvId}`, {
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
        <h3>Paste CV</h3>
        <form onSubmit={handleCvSubmit}>
          <textarea
            placeholder="Paste your CV content here"
            value={cvContent}
            onChange={(e) => setCvContent(e.target.value)}
            rows="10"
            cols="50"
          />
          <input
            type="text"
            placeholder="Add comments for your CV"
            value={cvComments}
            onChange={(e) => setCvComments(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <div>
          {/* Need to include lines */}
          <h4>Submitted CVs</h4>
          <ul>
            {cvs.map(cv => (
              <li key={cv._id}>
                <h2>{cv.cvComments}</h2>
                <p>{cv.cvContent}</p> <button onClick={() => handleCvRemove(cv._id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Account;
