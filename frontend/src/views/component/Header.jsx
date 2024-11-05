import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.js'
import './Header.css';
import { logout } from '../../utils/auth.js';

const Header = () => {
  const[isLoggedIn, user] = useAuthStore((state) => [state.isLoggedIn, state.user]);
  console.log(isLoggedIn());
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
            <Link to="/About" className="nav-link">Services</Link>
          </li>
          <li>
            <Link to="/CoursesPage" className="nav-link">Courses</Link>
          </li>
          <li>
            <Link to="/Blog" className="nav-link">Blog</Link>
          </li>
          <li> 
            <Link to="/WorkoutLog" className="nav-link">Workout Log</Link>
          </li>
          <li>
            <Link to="/LogFitness" className="nav-link">Tracking Fitness</Link> {/* Link to Log Fitness */}
          </li>
          <Link to="/HabitChallenges" className="nav-link">HabitChallenges</Link>
        </ul>
          {isLoggedIn() ? (
          <>
            <div className="navbar-right">
              <Link to="/" className="nav-link login-link">Dashboard</Link>
              <Link to="/" className='nav-link logout-link' onClick={logout}>Logout</Link>
            </div>
          </>) : (
          <>
            <div className="navbar-right">
              <Link to="/login" className="nav-link login-link">Login</Link>
            </div>
          </>)}
      </nav>
    </header>
  );
};

export default Header;
