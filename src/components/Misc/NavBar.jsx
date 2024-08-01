import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';



function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>

      <Link className="left-side" to="/">Home</Link>
      
      {user ? (
        <>
        
        <div className='user-logged-in'>
          <div className ='nav-center'>
          <Link to="/applications">Application Tracker</Link>
          <Link to="/tailoredcv">Tailored CV</Link>
          <Link to="/genletter">Cover Letter Gen</Link>
          {/* <Link to="Interview Prep">Interview Prep</Link> */}
          {/* <Link to="Job Search">Job Search</Link>*/}
          </div>
        <div className='right-side'>
        <Link to="/account">Account</Link>
          <span className='display-email'>{user.email}</span>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
        </div>
        </>
      ) : (
        <>
        <div className='nav-center'>

        </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
