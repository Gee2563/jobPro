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
        <Link to="/my-account">Account</Link>
          <span>{user.email}</span>
          <button onClick={handleLogout}>Sign Out</button>
        </>
      ) : (
        <>
          <Link to="/login">Log In</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
