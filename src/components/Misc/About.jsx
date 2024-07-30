import React from "react";

function About() {
    // Hardcoded, ok?
    return (
        <>
        <h1>About JobPro</h1>
        <p>JobPro is a job application tracker that helps you manage your job applications and track your career progress efficiently.</p>
        <p>With JobPro, you can:</p>
        <ul>
            <li>Track, view and update your job applications</li>
            <li>Tailor your CV to match a job description</li>
            <li>Generate a cover letter</li>
            <li>Help you prep for an interview</li>
        </ul>
        <p>JobPro is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js).</p> 
        <p>It uses JSON Web Tokens (JWT) for authentication and authorization, and it is deployed on Heroku.</p>
        <p>JobPro is a project created by <a href="https://github.com/gee2563">George Smith</a> </p>
        </>
    );
    }

export default About;