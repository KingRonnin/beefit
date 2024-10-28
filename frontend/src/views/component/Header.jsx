import React from 'react';
import './Header.css';  // Import the CSS file for styling


const Header = ({ handleScrollToSection, sections }) => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-left">
          <span className="brand-name" onClick={() => handleScrollToSection(sections.home)}>Beefit</span>  {/* Beefit logo scrolls to Home */}
        </div>
        <ul className="nav-menu">
          <li onClick={() => handleScrollToSection(sections.home)} className="nav-link">Home</li>
          <li onClick={() => handleScrollToSection(sections.about)} className="nav-link">About</li>
          <li onClick={() => handleScrollToSection(sections.courses)} className="nav-link">Courses</li>
          <li onClick={() => handleScrollToSection(sections.services)} className="nav-link">Services</li>
          <li onClick={() => handleScrollToSection(sections.contact)} className="nav-link">Contact</li>
        </ul>
        <div className="navbar-right">
          <a href="/login" className="nav-link login-link">Login</a>  {/* External Login link */}
        </div>
      </nav>
     
    </header>
  );
};

export default Header;