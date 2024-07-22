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
        
        <div className='user-logged-in'>
          <div className ='app-links'>
          <Link to="/applications">Application Tracker</Link>
          <Link to="/tailor-CV">Customise your CV</Link>
          <Link to="/generate-cover-letter">Cover Letter Gen</Link>
          {/* <Link to="Interview Prep">Interview Prep</Link> */}
          {/* <Link to="Job Search">Job Search</Link>*/}
          </div>
        <div className='center'>
        <Link to="/my-account">Account</Link>
          <span>{user.email}</span>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
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
