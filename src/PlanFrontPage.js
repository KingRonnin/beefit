import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PlanFrontPage.css'; 
import beefitLogo from './images/beefit-logo.png'; 
import heroImage from './images/h1_hero.png'; 
import loadingGif from './images/loading-gif.gif'; 

function FrontPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const aboutSectionRef = useRef(null);
  const coursesSectionRef = useRef(null);
  const pricingSectionRef = useRef(null);
  const joinNowSectionRef = useRef(null);
  const offersSectionRef = useRef(null);

  const handleGetStartedClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/LogFitness");
    }, 2000);
  };

  const handleScrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="front-page">
    
      <nav className="side-navbar">
        <div className="logo-container">
          <img src={beefitLogo} alt="Beefit Logo" className="logo" />
        </div>
        <div className="nav-links">
          <button onClick={() => handleScrollToSection(aboutSectionRef)}>About</button>
          <button onClick={() => handleScrollToSection(coursesSectionRef)}>Courses</button>
          <button onClick={() => handleScrollToSection(pricingSectionRef)}>Pricing</button>
          <button onClick={() => handleScrollToSection(offersSectionRef)}>Offers</button>
          <button onClick={() => handleScrollToSection(joinNowSectionRef)}>Join Now</button>
        </div>
        <div className="header-buttons">
          <Link to="/SignIn" className="signin-button">Sign In</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
            <div className="overlay">
              <h1>Welcome to BEEFIT</h1>
              <h2>Your Fitness Partner</h2>
              <button className="cta-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
          </div>
        </header>

        {loading && (
          <div className="loading-overlay">
            <img src={loadingGif} alt="Loading..." className="loading-spinner" />
            <p>Loading...</p>
          </div>
        )}

        <section id="about" className="about-section" ref={aboutSectionRef}>
          <h2>About Beefit</h2>
          <p>Beefit is your ultimate fitness companion, helping you achieve your health goals with personalized plans, progress tracking, and a supportive community.</p>
        </section>

        {/* Courses Section */}
        <section id="courses" className="courses-section" ref={coursesSectionRef}>
          <h2>Courses We Offer</h2>
          <p>Explore our range of fitness courses, from beginner to advanced, designed to suit all fitness levels and help you reach your personal goals.</p>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="pricing-section" ref={pricingSectionRef}>
          <h2>Our Pricing Plans</h2>
          <p>Choose a plan that fits your needs. We offer affordable pricing options, whether you’re just starting or looking for premium features.</p>
        </section>

        {/* Offers Section */}
        <section id="offers" className="offers-section" ref={offersSectionRef}>
          <h2>Special Offers</h2>
          <p>Sign up today and get 30% off on all premium plans!</p>
          <button className="offers-cta-button">Check Our Plans</button>
        </section>

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
