// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Ensure you're importing the correct CSS file

const Header = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">About</Link>
        </li>
        <li>
          <Link to="/services" className="nav-link">Services</Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
