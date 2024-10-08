import React from 'react';
import { Link } from 'react-router-dom'; 
import './PlanFrontPage.css'; 
import beefitLogo from './images/beefit-logo.png';

function FrontPage() {
  return (
    <div className="front-page">
      <header className="header">
        <h1>Welcome to Beefit Plan</h1>
        <p>Your fitness journey starts here!</p>
        <Link to="/myplan" className="get-started-button">Get Started</Link>
      </header>

      <section className="features">
        <h2>Why Choose Beefit Plans?</h2>
        <ul>
          <li>Track your fitness progress</li>
          <li>Analyze your performance with interactive charts</li>
          <li>Get personalized recommendations</li>
          <li>Join a community of fitness enthusiasts</li>
          <li>Access workout plans tailored to your goals</li>
        </ul>
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
        <p>&copy; 2024 Beefit. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default FrontPage;
