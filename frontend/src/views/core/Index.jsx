import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.css';  
import heroImage from '../../images/h1_hero.png';  
import loadingGif from '../../images/loading-gif.gif';
import Header from '../component/Header.jsx';  

function Index() {
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
      navigate('/SignIn');
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

      {/* Home Section */}
      <section id="home" className="section home-section" ref={homeSectionRef}>
        <header className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="overlay">
            <h1>Welcome TO BEEFIT</h1>
            <h2>Your Fitness Partner</h2>
            <button className="cta-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
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

      {/* About Section */}
      <section id="about" className="section about-section" ref={aboutSectionRef}>
        <div className="content">
          <h2>About Us</h2>
          <p>Beefit is dedicated to empowering fitness starters. We help you discover the joy of fitness with easy-to-follow plans and a supportive community.</p>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="section courses-section" ref={coursesSectionRef}>
        <h2>Courses We Offer</h2>
        <p>Explore our range of fitness courses, from beginner to advanced, designed to suit all fitness levels and help you reach your personal goals.</p>
      </section>

      {/* Services Section */}
      <section id="services" className="section services-section" ref={servicesSectionRef}>
        <div className="content">
          <h2>Our Services</h2>
          <p>Explore personalized workout plans, nutritional guidance, and a range of classes designed to keep you motivated and on track.</p>
        </div>
      </section>

      {/* Pricing Section */}
      {showPricing && (
        <section id="pricing" className="section pricing-section" ref={pricingSectionRef}>
          <h2>Our Pricing Plans</h2>
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
        </section>
      )}

      {/* Offers Section */}
      <section id="offers" className="section offers-section" ref={offersSectionRef}>
        <h2>Special Offers</h2>
        <p>Sign up today and get 30% off on all premium plans!</p>
        <button className="offers-cta-button" onClick={handleCheckOurPlansClick}>
          Check Our Plans
        </button>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section" ref={contactSectionRef}>
        <div className="content">
          <h2>Contact Us</h2>
          <p>Get in touch for any inquiries or support. We’re here to help you succeed in your fitness journey.</p>
          <button className="contact-button">Contact Us</button>
        </div>
      </section>
    </div>
  );
}

export default Index;