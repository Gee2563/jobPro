// src/pages/Home.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../style.css';
import Login from "./Account/Login";
import Register from "./Account/Register";
function Home() {
  const { user } = useContext(AuthContext); // Access user from AuthContext

  return (
  <>
  <div className="welcome-container">
    <div className="Welcome">
    <h1>Welcome to JobPro</h1>
    <p>Track your job applications and manage your career progress efficiently.</p>
    </div>

      
      {!user && ( // Check if the user is not authenticated
        <div className="welcome-login-reg">
          <Login />
          <button href="/register">
            Register
          </button>
        </div>
      )}
      {user && ( // Check if the user is authenticated
        <div>
          <p>Welcome back!</p>
          <Link to="/applications" className="btn">View Applications</Link>
        </div>
      )}
      <div className="snapshot">
        {/* Include a snapshot of the job tracker here */}
      </div>
      </div>
      </>
  );
}

export default Home;
