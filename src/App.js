import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Account from './pages/AccountSettings';
import NewApplication from './pages/NewApplication';
import Applications from './pages/AllApplications';
import ViewApplication from './pages/ViewApplication';
import ProtectedRoute from './components/ProtectedRoutes';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import TailorCV from './components/TailorCv';
import ViewTailoredCv from './pages/ViewTailoredCV';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/new-application" element={<ProtectedRoute><NewApplication /></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
          <Route path="/application/:id" element={<ProtectedRoute><ViewApplication /></ProtectedRoute>} />
          <Route path='/my-account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/tailor-cv' element={<ProtectedRoute><TailorCV /></ProtectedRoute>} />
          <Route path='/tailor-cv/:id' element={<ProtectedRoute><ViewTailoredCv /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
