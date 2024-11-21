import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import useUserData from '../../plugin/useUserData.js';
import { useAuthStore } from '../../store/auth.js'
import { logout } from '../../utils/auth.js';


const Header = () => {
  const[isLoggedIn, user] = useAuthStore((state) => [state.isLoggedIn, state.user]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const username = useUserData()?.username;

  const capitalizedUsername = username?.charAt(0).toUpperCase() + username?.slice(1);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <>
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
                <div className='dropdown' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <Link to="/WorkoutLog" className="dropdown-link">Progress <i className='fa fa-caret-down'></i></Link>
                  {isDropdownOpen && (
                    <ul className="dropdown-menu">
                      <li className="dropdown-item">
                        <Link className='dropdown-item-link' to="/WorkoutAnalysis">Analytics</Link>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
              <Link to="/HabitChallenges" className="nav-link">Challenges</Link>
              <Link to="/Equipment" className="nav-link">Equipments</Link>
            </ul>
              {isLoggedIn() ? (
              <>
                <div className="navbar-right">
                  <div className="user-welcome"><span>Welcome {capitalizedUsername}!</span></div>
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
    </>
  );
};

export default Header;
