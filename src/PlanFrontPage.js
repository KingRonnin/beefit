import React from 'react';
import { Link } from 'react-router-dom';
import './PlanFrontPage.css'; 
import beefitLogo from './images/beefit-logo.png'; 
import heroImage from './images/h1_hero.png'; 

function FrontPage() {
  return (
    <div className="front-page">
      <header className="header">
        <div className="navbar">
          <img src={beefitLogo} alt="Beefit Logo" className="logo" />
          <nav className="nav-links">
        
          </nav>
          <div className="header-buttons">
            <Link to="/SignIn" className="signin-button">Sign In</Link>
            <Link to="/SignUp" className="join-now-button">Join Now</Link>
          </div>
        </div>
        <div
          className="hero-section"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="overlay">
            <h1>Welcome to BEEFIT</h1>
            <h2>YOUR FITNESS PARTNER</h2>
            <Link to="/LogFitness" className="cta-button">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="training-section">
        <div className="training-box">
          <h3>Personal Training</h3>
          <p>One-on-one coaching to push your limits.</p>
          <Link to="/personal-training" className="training-link">
            View Courses
          </Link>
        </div>
        <div className="training-box">
          <h3>Group Training</h3>
          <p>Motivate yourself in a team environment.</p>
          <Link to="/group-training" className="training-link">
            View Courses
          </Link>
        </div>
      </section>

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
    </div>
  );
}

export default FrontPage;
