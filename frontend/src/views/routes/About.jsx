import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = {
    personalTraining: {
      title: "Personal Training",
      description: (
        <>
          <p>Our personal trainers provide customized workout plans designed to meet your specific fitness goals, with progress tracking, dietary recommendations, and adjustments based on your progress.</p>
          <ul>
            <li>One-on-one sessions with certified trainers</li>
            <li>In-depth body composition analysis and tracking</li>
            <li>Weekly progress checks with data-driven insights</li>
          </ul>
          <p><strong>Testimonials:</strong> "Thanks to Beefit, I've achieved more in three months than I have in years on my own!" – <em>James P.</em></p>
        </>
      ),
    },
    groupClasses: {
      title: "Group Classes",
      description: (
        <>
          <p>Our group classes cater to all fitness levels, providing a supportive and energetic environment. Classes include a range of styles like HIIT, strength training, and flexibility sessions.</p>
          <ul>
            <li>Variety of classes like Yoga, HIIT, and Strength Conditioning</li>
            <li>Flexible scheduling with early morning and evening slots</li>
            <li>Inclusive environment for all fitness levels</li>
          </ul>
          <p><strong>Special Features:</strong> Exclusive access to class recordings and extra tips to perfect your form.</p>
        </>
      ),
    },
    nutritionalCounseling: {
      title: "Nutritional Counseling",
      description: (
        <>
          <p>Receive comprehensive dietary guidance tailored to your body type and fitness goals. Our nutritional counseling includes personalized meal plans and supplement recommendations.</p>
          <ul>
            <li>Personalized meal plans aligned with fitness objectives</li>
            <li>Access to a recipe database with over 500+ health-focused recipes</li>
            <li>Regular adjustments based on progress and dietary preferences</li>
          </ul>
          <p><strong>Client Success Story:</strong> "The meal plans have been a game-changer! I feel energized and more focused." – <em>Lisa T.</em></p>
        </>
      ),
    },
    wellnessPrograms: {
      title: "Wellness Programs",
      description: (
        <>
          <p>Our wellness programs go beyond fitness by incorporating mindfulness practices, stress management, and holistic health guidance for overall well-being.</p>
          <ul>
            <li>Mindfulness and stress management workshops</li>
            <li>Access to guided meditation sessions</li>
            <li>Sleep tracking and wellness insights</li>
          </ul>
          <p><strong>Community Feedback:</strong> "These programs helped me feel more balanced, both physically and mentally." – <em>Chris M.</em></p>
        </>
      ),
    },
    fitnessAssessments: {
      title: "Fitness Assessments",
      description: (
        <>
          <p>We offer comprehensive fitness assessments to track your strength, flexibility, endurance, and other key health metrics. This data helps us tailor your program effectively.</p>
          <ul>
            <li>Full-body strength and endurance tests</li>
            <li>Detailed flexibility and mobility assessments</li>
            <li>Advanced metrics with tracking over time</li>
          </ul>
          <p><strong>What Our Users Say:</strong> "The assessment gave me insight into my strengths and areas to improve. Very motivating!" – <em>Alex J.</em></p>
        </>
      ),
    },
  };

  const handleServiceClick = (serviceKey) => {
    setSelectedService(services[serviceKey]);
  };

  return (
    <div className="about-page">
      <section className="about-section">
        <h1 className="section-title">Features</h1>
        <h2 className="section-subtitle">Services you will get</h2>

        
        
        <div className="services-grid">
          <div className="service-card" onClick={() => handleServiceClick('personalTraining')}>
            <h3>Personal Training</h3>
       
          </div>

          <div className="service-card" onClick={() => handleServiceClick('groupClasses')}>
            <h3>Group Classes</h3>
         
          </div>

          <div className="service-card" onClick={() => handleServiceClick('nutritionalCounseling')}>
            <h3>Nutritional Counseling</h3>
            
          </div>

          <div className="service-card" onClick={() => handleServiceClick('wellnessPrograms')}>
            <h3>Wellness Programs</h3>
           
          </div>

          <div className="service-card" onClick={() => handleServiceClick('fitnessAssessments')}>
            <h3>Fitness Assessments</h3>
          
          </div>
        </div>
      </section>

      {selectedService && (
        <section className="service-details">
          <h2>{selectedService.title}</h2>
          {selectedService.description}
        </section>
      )}

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
