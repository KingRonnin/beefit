import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PlanFrontPage.css'; 
import beefitLogo from './images/beefit-logo.png'; 
import heroImage from './images/h1_hero.png'; 
import loadingGif from './images/loading-gif.gif'; 

function FrontPage() {
  const [loading, setLoading] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
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

  const handleCheckOurPlansClick = () => {
    setShowPricing(true);
    handleScrollToSection(pricingSectionRef);
  };

  const handleJoinNowClick = () => {
    setSuccessMessage('Successfully added plan!');
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/SignIn');
    }, 2000);
  };

  return (
    <div className="front-page">
      <nav className="side-navbar">
        <div className="logo-container">
          <img src={beefitLogo} alt="Beefit Logo" className="logo" />
        </div>
        <div className="nav-links">
          <button onClick={() => handleScrollToSection(coursesSectionRef)}>Courses</button>
          <button onClick={() => handleScrollToSection(pricingSectionRef)}>Pricing</button>
          <button onClick={() => handleScrollToSection(joinNowSectionRef)}>Join Now</button>
          <button onClick={() => handleScrollToSection(aboutSectionRef)}>About</button>
        </div>
        <div className="header-buttons">
          <Link to="/SignIn" className="signin-button">Sign In</Link>
          <Link to="/myplan" className="myplan-button">Workout Category</Link>
        </div>
      </nav>

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

       
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}

        <section id="courses" className="courses-section" ref={coursesSectionRef}>
          <h2>Courses We Offer</h2>
          <p>Explore our range of fitness courses, from beginner to advanced, designed to suit all fitness levels and help you reach your personal goals.</p>
        </section>

        {showPricing && (
          <section id="pricing" className="pricing-section" ref={pricingSectionRef}>
            <h2>Our Pricing Plans</h2>

            
            <div className="pricing-plan">
              <div className="plan-details">
                <h3>6 MONTH</h3>
                <p className="price">$30/M <span>(SINGLE CLASS)</span></p>
                <ul>
                  <li>✔ Free Riding</li>
                  <li>✔ Unlimited Equipments</li>
                  <li>✔ Personal Trainer</li>
                  <li>✔ Weight Losing Classes</li>
                  <li>✔ Month To Month</li>
                </ul>
                <button className="join-now-cta" onClick={handleJoinNowClick}>JOIN NOW</button>
              </div>
            </div>

            
            <div className="pricing-plan">
              <div className="plan-details">
                <h3>12 MONTH</h3>
                <p className="price">$25/M <span>(BILLED ANNUALLY)</span></p>
                <ul>
                  <li>✔ Free Riding</li>
                  <li>✔ Unlimited Equipments</li>
                  <li>✔ 2 Personal Training Sessions/month</li>
                  <li>✔ Weight Loss and Nutrition Classes</li>
                  <li>✔ 24/7 Gym Access</li>
                </ul>
                <button className="join-now-cta" onClick={handleJoinNowClick}>JOIN NOW</button>
              </div>
            </div>

            <div className="pricing-plan">
              <div className="plan-details">
                <h3>3 MONTH</h3>
                <p className="price">$40/M <span>(GROUP CLASSES)</span></p>
                <ul>
                  <li>✔ Free Riding</li>
                  <li>✔ Group Classes</li>
                  <li>✔ Monthly Nutrition Workshop</li>
                  <li>✔ Weight Losing Classes</li>
                  <li>✔ Access to Online Portal</li>
                </ul>
                <button className="join-now-cta" onClick={handleJoinNowClick}>JOIN NOW</button>
              </div>
            </div>

            {/* Pricing Plan 4 */}
            <div className="pricing-plan">
              <div className="plan-details">
                <h3>1 MONTH</h3>
                <p className="price">$50 <span>(PREMIUM)</span></p>
                <ul>
                  <li>✔ Free Riding</li>
                  <li>✔ Unlimited Equipments</li>
                  <li>✔ Personal Trainer Anytime</li>
                  <li>✔ One-on-One Consultations</li>
                  <li>✔ Access to Premium Classes</li>
                </ul>
                <button className="join-now-cta" onClick={handleJoinNowClick}>JOIN NOW</button>
              </div>
            </div>

            <p>Choose a plan that fits your needs. We offer affordable pricing options, whether you’re just starting or looking for premium features.</p>
          </section>
        )}

        <section id="offers" className="offers-section" ref={offersSectionRef}>
          <h2>Special Offers</h2>
          <p>Sign up today and get 30% off on all premium plans!</p>
          <button className="offers-cta-button" onClick={handleCheckOurPlansClick}>
            Check Our Plans
          </button>
        </section>

        <section id="join-now" className="join-now-section" ref={joinNowSectionRef}>
          <h2>Join Now</h2>
          <p>Sign up to get access to personalized workout plans and track your fitness progress!</p>
          <button className="join-now-cta">Join the Fitness Journey</button>
        </section>

        <section id="about" className="about-section" ref={aboutSectionRef}>
          <h2>About Beefit</h2>
          <p>Beefit is your ultimate fitness companion, helping you achieve your health goals with personalized plans, progress tracking, and a supportive community.</p>
        </section>
      </div>
    </div>
  );
}

export default FrontPage;
