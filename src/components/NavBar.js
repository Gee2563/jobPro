import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../style.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      
      {user ? (
        <>
        <Link to="/applications">Application Tracker</Link>
        <div className='user-logged-in'>
        <Link to="/my-account">Account</Link>
          <span>{user.email}</span>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
        </>
      ) : (
        <>
        <div className='user-logged-out'>
          <Link to="/login">Log In</Link>
          <Link to="/register">Register</Link>
        </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
