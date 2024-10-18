// FrontPage.jsx
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PlanFrontPage.css'; 
import beefitLogo from './images/beefit-logo.png'; 
import heroImage from './images/h1_hero.png'; 
import loadingGif from './images/loading-gif.gif'; 

function FrontPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const joinNowSectionRef = useRef(null);


  const handleGetStartedClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/LogFitness");
    }, 2000);
  };

  const handleJoinNowClick = () => {
    if (joinNowSectionRef.current) {
      joinNowSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOffersClick = () => {
    if (offersSectionRef.current) {
      offersSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="front-page">
      {/* Side Navigation Bar */}
      <nav className="side-navbar">
        <div className="logo-container">
          <img src={beefitLogo} alt="Beefit Logo" className="logo" />
        </div>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="header-buttons">
          <Link to="/SignIn" className="signin-button">Sign In</Link>
          <button onClick={handleJoinNowClick} className="join-now-section">
            Join Now
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          {/* Hero Section */}
          <div
            className="hero-section"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="overlay">
              <h1>Welcome to BEEFIT</h1>
              <h2>Your Fitness Partner</h2>
              <button className="cta-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
          </div>
        </header>

        {/* Loading Overlay */}
        {loading && (
          <div className="loading-overlay" id="loadingOverlay">
            <img src={loadingGif} alt="Loading..." className="loading-spinner" />
            <p>Loading...</p>
          </div>
        )}

        {/* Testimonials Section */}
        <section className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonial">
            <p>"Beefit has transformed my approach to fitness. The tracking features keep me accountable!"</p>
            <span>- Alex, Fitness Enthusiast</span>
          </div>
          <div className="testimonial">
            <p>"I love the personalized recommendations. It's like having a coach in my pocket!"</p>
            <span>- Jamie, Beginner</span>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="footer">
          <div className="footer-features">
            <h2>Why Choose Beefit Plans?</h2>
            <ul>
              <li>Track your fitness progress</li>
              <li>Analyze your performance with interactive charts</li>
              <li>Get personalized recommendations</li>
              <li>Join a community of fitness enthusiasts</li>
              <li>Access workout plans tailored to your goals</li>
            </ul>
          </div>
          
    

          <div className="footer-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Beefit. All rights reserved.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="back-to-top">
              Back to Top
            </button>
          </div>
        </footer>

        {/* Join Now Section */}
        <section id="join-now" className="join-now-section" ref={joinNowSectionRef}>
          <h2>Join Now</h2>
          <p>Sign up to get access to personalized workout plans and track your fitness progress!</p>
          <button className="join-now-cta">Join the Fitness Journey</button>
        </section>
      </div>
    </div>
  );
}

export default FrontPage;
