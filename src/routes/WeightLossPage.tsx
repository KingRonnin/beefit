import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import './WeightLossPage.css';

const WeightLossPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [showTips, setShowTips] = useState(false);
  const [showGroupSessions, setShowGroupSessions] = useState(false);

  const navigateToLogFitness = () => {
    navigate('/LogFitness');
  };

  const handleViewTips = () => {
    setShowTips(true);
    setShowGroupSessions(false);
  };

  const handleViewGroupSessions = () => {
    setShowGroupSessions(true);
    setShowTips(false); 
  };

  return (
    <div className="weight-loss-page">
      <header className="header">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li> 
            <li><Link to="/myplan">My Plan</Link></li>
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
          <button onClick={handleViewTips}>View Tips</button>
        </div>
        <div className="course group-training">
          <h2>Group Weight Loss Sessions</h2>
          <p>Support from a community of people.</p>
          <button onClick={handleViewGroupSessions}>View Group Sessions</button>
        </div>
      </section>

      {showTips && (
        <section className="tips-section">
          <h2>Weight Loss Tips</h2>
          <ul>
            <li>Eat a high-protein breakfast to reduce cravings.</li>
            <li>Avoid sugary drinks and fruit juice.</li>
            <li>Drink water before meals to help with portion control.</li>
            <li>Incorporate regular exercise, such as walking or jogging.</li>
            <li>Get enough sleep, as poor sleep is linked to weight gain.</li>
          </ul>
        </section>
      )}

      {showGroupSessions && (
        <section className="group-sessions-section">
          <h2>Group Weight Loss Sessions</h2>
          <p>Join our community group sessions to stay motivated and accountable:</p>
          <ul>
            <li>Weekly check-ins every Monday at 7 PM.</li>
            <li>Online support group available 24/7.</li>
            <li>Access to professional fitness trainers and dietitians.</li>
            <li>Monthly progress tracking and tips for continued success.</li>
            <li>Motivational guest speakers and success stories.</li>
          </ul>
        </section>
      )}

      <button className="back-btn" onClick={() => navigate('/LogFitness')}>
        Return
      </button>
    </div>
  );
};

export default WeightLossPage;
