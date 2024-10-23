import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PlanFrontPage.css';  // Your custom styles for this page
import heroImage from './images/h1_hero.png';  // Make sure the path is correct
import loadingGif from './images/loading-gif.gif';  // Make sure the path is correct
import Header from './component/layout/Header.jsx';  // Ensure path is correct and no .jsx needed for import

function FrontPage() {
  const [loading, setLoading] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

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
      <Header />
      <div className="main-content">
        <header className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="overlay">
            <h1>Welcome to BEEFIT</h1>
            <h2>Your Fitness Partner</h2>
            <button className="cta-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
        </header>

        {/* Loading Overlay */}
        {loading && (
          <div className="loading-overlay">
            <img src={loadingGif} alt="Loading..." className="loading-spinner" />
            <p>Loading...</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}

        {/* Courses Section */}
        <section id="courses" className="courses-section" ref={coursesSectionRef}>
          <h2>Courses We Offer</h2>
          <p>Explore our range of fitness courses, from beginner to advanced, designed to suit all fitness levels and help you reach your personal goals.</p>
        </section>

        {/* Pricing Section */}
        {showPricing && (
          <section id="pricing" className="pricing-section" ref={pricingSectionRef}>
            <h2>Our Pricing Plans</h2>
            {/* Repeat the pricing plan block as needed */}
            <div className="pricing-plan">
              <div className="plan-details">
                <h3>6 MONTH</h3>
                <p className="price">$30/M <span>(SINGLE CLASS)</span></p>
                <ul>
                  <li>✔ Free Riding</li>
                  <li>✔ Unlimited Equipment</li>
                  <li>✔ Personal Trainer</li>
                  <li>✔ Weight Loss Classes</li>
                </ul>
                <button className="join-now-cta" onClick={handleJoinNowClick}>JOIN NOW</button>
              </div>
            </div>
            {/* Repeat more pricing plan blocks */}
          </section>
        )}

        {/* Offers Section */}
        <section id="offers" className="offers-section" ref={offersSectionRef}>
          <h2>Special Offers</h2>
          <p>Sign up today and get 30% off on all premium plans!</p>
          <button className="offers-cta-button" onClick={handleCheckOurPlansClick}>
            Check Our Plans
          </button>
        </section>

      </div>
    </div>
  );
}

export default FrontPage;
