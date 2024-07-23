// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
  
      <Link to="/about">About</Link>

      <Link to="/contact">Contact</Link>

      <Link to="/projects">Projects</Link>
    </footer>
  );
}

export default Footer;
