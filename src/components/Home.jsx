// src/pages/Home.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../style.css';
import Login from "./Account/Login";
import screenshotImage from "./static/screenshot.png";

function Home() {
  const { user } = useContext(AuthContext); // Access user from AuthContext

  return (
  <>
  <div className="welcome">
  <div className="welcome-left">
    <h1>Welcome to JobPro</h1>
    <p>Track your job applications and manage your career progress efficiently.</p>
    
    <div className="screenshot">
      <img src={screenshotImage} alt="Screenshot" width={"900px"} height={"350px"}/>
    </div>
    </div>

    <div className="welcome-right">
      {!user && ( // Check if the user is not authenticated
      // Will build card for login and register
        <div className="welcome-login-reg">
          <Login />

          <button>
          <Link to="/register" >Register</Link>
          </button>
          
    
        </div>
      )}
      {user && ( // Check if the user is authenticated
        <div className='welcome-back'>
          <p>Welcome back!</p>
          <Link to="/applications" className="btn">View Applications</Link>
        </div>
      )}
      
      </div>
    </div>
      </>
  );
}

export default Home;
