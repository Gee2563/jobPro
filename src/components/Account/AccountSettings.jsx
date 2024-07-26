// src/components/Account.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import UploadACv from '../UploadedCvs/UploadACv';
import { getAccount, changePassword } from '../../services/accountApi';
import AllUploadedCv from '../UploadedCvs/AllUploadedCv';

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
    try {
      await changePassword(user.token, currentPassword, newPassword);
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Failed to update password', error);
      alert('Failed to update password');
    }
  };

  



  return (
    <main>
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
    </main>
  );
}

export default Account;
