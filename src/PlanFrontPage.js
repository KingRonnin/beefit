import React from 'react';
import { Link } from 'react-router-dom';
import './PlanFrontPage.css'; 
import beefitLogo from './images/beefit-logo.png'; 
import heroImage from './images/h1_hero.png'; 


function scrollToJoinNow() {
  const joinNowSection = document.getElementById("join-now");
  if (joinNowSection) {
    joinNowSection.scrollIntoView({ behavior: "smooth" });
  }
}


function FrontPage() {
  return (
    <div className="front-page">
      {/* Header Section */}
      <header className="header">
        <div className="navbar">
          <img src={beefitLogo} alt="Beefit Logo" className="logo" />
          <nav className="nav-links">
            {/* Add links here */}
            <Link to="/home">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="header-buttons">
            <Link to="/SignIn" className="signin-button">Sign In</Link>
            <Link to="/" className="join-now-button">Join Now</Link>
          </div>
        </div>

        {/* Hero Section */}
        <div
          className="hero-section"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="overlay">
            <h1>Welcome to BEEFIT</h1>
            <h2>Your Fitness Partner</h2>
            <Link to="/LogFitness" className="cta-button">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* What I Offer Section */}
      <section className="what-i-offer">
        <h2>What I Offer</h2>
        <div className="offerings">
          <div className="offer">
            <img src="images/bodybuilding.jpg" alt="Body Building" />
            <h3>Body Building</h3>
            <p>Build strength and mass through expert training plans.</p>
          </div>
          <div className="offer">
            <img src="images/musclegain.jpg" alt="Muscle Gain" />
            <h3>Muscle Gain</h3>
            <p>Gain lean muscle with tailored workout routines.</p>
          </div>
          <div className="offer">
            <img src="images/weightloss.jpg" alt="Weight Loss" />
            <h3>Weight Loss</h3>
            <p>Get fit and lose weight with our custom plans.</p>
          </div>
        </div>
      </section>

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
    </div>
  );
}
<section id="join-now" className="join-now-section">
<h2>Join Now</h2>
<p>Sign up to get access to personalized workout plans and track your fitness progress!</p>
<button className="join-now-cta">Join the Fitness Journey</button>
</section>




export default FrontPage;
