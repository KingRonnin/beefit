import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';
import loadingGif from '../../images/loading-gif.gif';
import { FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';  // Importing Font Awesome icons
import Header from '../component/Header.jsx';
import hbdImage from '../../images/hbd.jpg';

function FrontPage() {
  const [loading, setLoading] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Create references for all sections
  const homeSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const pricingSectionRef = useRef(null);
  const coursesSectionRef = useRef(null);
  const offersSectionRef = useRef(null);

  // Function to handle scrolling to specific sections
  const handleScrollToSection = (sectionRef) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStartedClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/LogFitness");
    }, 2000);
  };

  const handleCheckOurPlansClick = () => {
    setShowPricing(true);
    handleScrollToSection(pricingSectionRef);
  };

  const handleJoinNowClick = () => {
    setSuccessMessage('Successfully added plan!');
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/register');
    }, 2000);
  };

  // Define the sections object
  const sections = {
    home: homeSectionRef,
    about: aboutSectionRef,
    services: servicesSectionRef,
    courses: coursesSectionRef,
    contact: contactSectionRef,
  };

  return (
    <div className="front-page">
      <Header handleScrollToSection={handleScrollToSection} sections={sections} />

<section id="home" className="section home-section" ref={homeSectionRef}>
  <header className="hero-section" style={{ backgroundImage: `url(${hbdImage})` }}>
    <div className="overlay">
      <h1 className="hero-main-text">TRAIN THE</h1>
      <h1 className="hero-main-text">FIGHTER IN YOU</h1>
      <button className="cta-button" onClick={handleGetStartedClick}>Get Started</button>
    </div>
  </header>
</section>

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



{showPricing && (
  <section id="pricing" className="section pricing-section" ref={pricingSectionRef}>
    <h2>Our Pricing Plans</h2>
    <div className="pricing-plans-container">
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
      
      <div className="pricing-plan">
        <div className="plan-details">
          <h3>12 MONTH</h3>
          <p className="price">$50/M <span>(BEST VALUE)</span></p>
          <ul>
            <li>✔ Free Riding</li>
            <li>✔ Unlimited Equipment</li>
            <li>✔ Personal Trainer</li>
            <li>✔ Weight Loss Classes</li>
            <li>✔ Nutrition Guide</li>
          </ul>
          <button className="join-now-cta" onClick={handleJoinNowClick}>JOIN NOW</button>
        </div>
      </div>

      <div className="pricing-plan">
        <div className="plan-details">
          <h3>1 MONTH</h3>
          <p className="price">$40/M <span>(BASIC CLASS)</span></p>
          <ul>
            <li>✔ Free Riding</li>
            <li>✔ Unlimited Equipment</li>
            <li>✔ Personal Trainer</li>
          </ul>
          <button className="join-now-cta" onClick={handleJoinNowClick}>JOIN NOW</button>
        </div>
      </div>
    </div>
  </section>
)}


 ]
      <section id="offers" className="section offers-section" ref={offersSectionRef}>
        <h2>Special Offers</h2>
        <p>Sign up today and get 30% off on all premium plans!</p>
        <button className="offers-cta-button" onClick={handleCheckOurPlansClick}>
          Check Our Plans
        </button>
      </section>

    
      <section id="contact" className="section contact-section" ref={contactSectionRef}>
        <div className="content">
          <h2>Contact Us</h2>
          <p>Get in touch for any inquiries or support. We’re here to help you succeed in your fitness journey.</p>
          <button className="contact-button">Contact Us</button>
          
         
          <div className="social-media-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon instagram-icon" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon twitter-icon" />
            </a>
            <a href="mailto:example@gmail.com">
              <FaEnvelope className="social-icon email-icon" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}


export default FrontPage;
