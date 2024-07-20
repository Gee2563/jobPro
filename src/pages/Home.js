// src/pages/Home.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../style.css';

function Home() {
  const { user } = useContext(AuthContext); // Access user from AuthContext

  return (
    <main>
      <h1>Welcome to JobPro</h1>
      <p>Track your job applications and manage your career progress efficiently.</p>
      {!user && ( // Check if the user is not authenticated
        <div>
          <Link to="/register" className="btn">Get Started</Link>
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
    </main>
  );
}

export default Home;
