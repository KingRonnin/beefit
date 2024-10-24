import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="brand-name">Beefit</Link>  {/* Beefit on the left */}
        </div>
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/services" className="nav-link">Services</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
        </ul>
        <div className="navbar-right">
          <Link to="/login" className="nav-link login-link">Login</Link>  {/* Login on the right */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
