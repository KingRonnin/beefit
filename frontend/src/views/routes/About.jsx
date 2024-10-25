import React from 'react';
import './About.css'; // Import your custom CSS file for styling

const About = () => {
  return (
    <div className="about-page">
      <section className="about-section">
        <h1 className="section-title">Features</h1>
        <h2 className="section-subtitle">Services you will get</h2>
        <p className="section-description">
          These are the main features of Beefit, but there are also vast services that can take anyone from anywhere.
        </p>
        
        <div className="services-grid">
          <div className="service-card">
            <img src="/path-to-icon.png" alt="Personal Training" />
            <h3>Personal Training</h3>
            <p>Tailored workouts with expert guidance for optimal results.</p>
          </div>

          <div className="service-card">
            <img src="/path-to-icon.png" alt="Group Classes" />
            <h3>Group Classes</h3>
            <p>Dynamic fitness sessions for all skill levels and interests.</p>
          </div>

          <div className="service-card">
            <img src="/path-to-icon.png" alt="Nutritional Counseling" />
            <h3>Nutritional Counseling</h3>
            <p>Personalized diet plans to complement your fitness goals.</p>
          </div>

          <div className="service-card">
            <img src="/path-to-icon.png" alt="Wellness Programs" />
            <h3>Wellness Programs</h3>
            <p>Comprehensive plans for overall health and well-being.</p>
          </div>

          <div className="service-card">
            <img src="/path-to-icon.png" alt="Fitness Assessments" />
            <h3>Fitness Assessments</h3>
            <p>Detailed evaluations to track and improve performance.</p>
          </div>

          <div className="service-card">
            <img src="/path-to-icon.png" alt="Spa Services" />
            <h3>Spa Services</h3>
            <p>Relaxing treatments to aid recovery and rejuvenation.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Product</h3>
            <ul>
              <li>Features</li>
              <li>Integrations</li>
              <li>Pricing</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li>Privacy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Address</h3>
            <p>Beefit Center</p>
            <p>1234 Elmwood Avenue</p>
            <p>Metropolis, NY 10101</p>
            <p>USA</p>
          </div>
          <div className="footer-section">
            <h3>Social Media</h3>
            <div className="social-media-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
