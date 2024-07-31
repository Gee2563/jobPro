import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Account/Register';
import Login from './components/Account/Login';
import Account from './components/Account/AccountSettings';
import AllApplications from './components/Application/AllApplications';
import NewApplication from './components/Application/NewApplication';
import ViewApplication from './components/Application/ViewApplication';
import About from './components/Misc/About';
import Contact from './components/Misc/Contact';
import Projects from './components/Misc/Projects';
import ProtectedRoute from './components/Misc/ProtectedRoutes';
import Navbar from './components/Misc/NavBar';
import Footer from './components/Misc/Footer';
import ViewTailoredCv from './components/TailoredCvs/ViewTailoredCV';
import TailorCv from './components/TailoredCvs/TailorCv';
import AllUploadedCv from './components/UploadedCvs/AllUploadedCv';
import UploadACv from './components/UploadedCvs/UploadACv';
import ViewUploadedCv from './components/UploadedCvs/ViewUploadedCv';
import { AuthProvider } from './context/AuthContext';


// Issue with reloading - When I hit refresh, I'm automatically sent to login despite being logged in.

function App() {
  return (
    <div className='screen'>
<AuthProvider>
      <Router>
        <Navbar />
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/applications" element={<ProtectedRoute><AllApplications /></ProtectedRoute>} />
            <Route path="/applications/new" element={<ProtectedRoute><NewApplication /></ProtectedRoute>} />
            <Route path="/applications/:id" element={<ProtectedRoute><ViewApplication /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tailoredcv" element={<ProtectedRoute><TailorCv /></ProtectedRoute>} />
            <Route path="/tailoredcv/:id" element={<ProtectedRoute><ViewTailoredCv /></ProtectedRoute>} />
            <Route path="/uploadedcv" element={<ProtectedRoute><AllUploadedCv /></ProtectedRoute>} />
            <Route path="/uploadedcv/new" element={<ProtectedRoute><UploadACv /></ProtectedRoute>} />
            <Route path="/uploadedcv/:id" elemgent={<ProtectedRoute><ViewUploadedCv /></ProtectedRoute>} />
          </Routes>
        <Footer />
      </Router>
    </AuthProvider>
      
    </div>
  
  );
}

export default App;
