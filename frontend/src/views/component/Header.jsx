import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="brand-name">Beefit</Link> {}
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/About" className="nav-link">About</Link>
          </li>
          <li>
            <Link to="/CoursesPage" className="nav-link">Courses</Link>
          </li>
          <li>
            <Link to="/services" className="nav-link">Services</Link>
          </li>
          <li> 
            <Link to="/WorkoutLog" className="nav-link">Workout Log</Link>
          </li>
          <li>
            <Link to="/LogFitness" className="nav-link">Log Fitness</Link> {/* Link to Log Fitness */}
          </li>
        </ul>
        <div className="navbar-right">
          <Link to="/login" className="nav-link login-link">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
