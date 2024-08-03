// src/components/Account.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import UploadACv from '../UploadedCvs/UploadACv';
import { getAccount, changePassword } from '../../services/accountApi';
import AllUploadedCv from '../UploadedCvs/AllUploadedCv';
import { passwordValid } from '../../utils/passwordValid';

function Account() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setEmail(user?.email || '');
  }
  , [user]);



  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!passwordValid(newPassword)) {
      alert('Password must be between 8 and 20 characters and contain at least one uppercase letter, one lowercase letter, and one number.');
      return;
    }
    try {
      await changePassword(user.token, currentPassword, newPassword);
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Failed to update password', error);
      alert('Failed to update password');
    }
  };

  



  return (
    <div className='account-container'>
      <h2>Account Settings</h2>
      <div>
        <h3>Change Password</h3>
        <input className="password-input" type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        <input className="password-input" type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <input className="password-input" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button onClick={handlePasswordChange}>Update Password</button>

      
      </div>
      <UploadACv />
      <AllUploadedCv />
    </div>
  );
}

export default Account;
