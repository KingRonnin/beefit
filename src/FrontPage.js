import React from 'react';
import './FrontPage.css'; 

function FrontPage() {
  return (
    <div className="front-page">
      <header className="header">
        <h1>Welcome to Beefit</h1>
        <p>Your fitness journey starts here!</p>
        <button className="cta-button">Get Started</button>
      </header>
      <section className="features">
        <h2>Why Choose Beefit?</h2>
        <ul>
          <li>Track your fitness progress</li>
          <li>Analyze your performance with interactive charts</li>
          <li>Get personalized recommendations</li>
        </ul>
      </section>
    </div>
  );
}

export default FrontPage;  