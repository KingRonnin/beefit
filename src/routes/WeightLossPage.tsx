import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WeightLossPage.css';

const WeightLossPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateToLogFitness = () => {
    navigate('/LogFitness'); // Corrected the navigation function
  };

  return (
    <div className="weight-loss-page">
      <header className="header">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="overlay"></div>
        <div className="content">
          <h1>Weight Loss Tips</h1>
          <button onClick={navigateToLogFitness}>Log Fitness</button>
        </div>
      </section>

      <section className="courses-section">
        <div className="course personal-training">
          <h2>Personalized Weight Loss Plans</h2>
          <p>Tailored tips for your journey.</p>
          <button>View Tips</button>
        </div>
        <div className="course group-training">
          <h2>Group Weight Loss Sessions</h2>
          <p>Support from a community of people.</p>
          <button>View Group Sessions</button>
        </div>
      </section>

      <button className="back-btn" onClick={() => navigate('/LogFitness')}>
        Return 
      </button>
    </div>
  );
};

export default WeightLossPage;
