import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogFitness.css';

const LogFitness: React.FC = () => {
    const navigate = useNavigate();
    const [goal, setGoal] = useState('weight loss');
    const [weight, setWeight] = useState('');
    const [runDistance, setRunDistance] = useState('');
    const [stretchDistance, setStretchDistance] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleGoalClick = (goal: string) => {
        setGoal(goal);
        if (goal === 'weight loss') {
            navigate('/WeightLossPage'); // Navigate to the WeightLossPage
        }
    };
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (+weight <= 0 || +runDistance <= 0 || +stretchDistance <= 0) {
            alert('Please enter positive values.');
            return;
        }

        setSuccessMessage('Data logged successfully!');

        // Clear the form and then navigate to the MyPlan page
        setTimeout(() => {
            setSuccessMessage('');
            navigate('/myplan');
        }, 3000);

        // Clear the input fields
        setWeight('');
        setRunDistance('');
        setStretchDistance('');
    };

    return (
        <div className="log-fitness">
            <div className="left-section" />
            <div className="right-section">
                <h1>Track Your Fitness</h1>
                {successMessage && <p className="success-message">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>What is your primary fitness goal?</label>
                        <div className="button-group">
                            <button
                                type="button"
                                className={goal === 'weight loss' ? 'active' : ''}
                                onClick={() => handleGoalClick('weight loss')} 
                                
                                
                            >
                                Weight loss
                                
                            </button>
                            <button
                                type="button"
                                className={goal === 'improving endurance' ? 'active' : ''}
                                onClick={() => handleGoalClick('improving endurance')}
                            >
                                Improving endurance
                            </button>
                            <button
                                type="button"
                                className={goal === 'enhancing flexibility' ? 'active' : ''}
                                onClick={() => handleGoalClick('enhancing flexibility')}
                            >
                                Enhancing flexibility
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="weight">Current Weight (kg):</label>
                        <input
                            type="number"
                            id="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="runDistance">Run Time/Distance (km):</label>
                        <input
                            type="number"
                            id="runDistance"
                            value={runDistance}
                            onChange={(e) => setRunDistance(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="stretchDistance">Stretching Reach Distance (cm):</label>
                        <input
                            type="number"
                            id="stretchDistance"
                            value={stretchDistance}
                            onChange={(e) => setStretchDistance(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Continue</button>
                </form>
                    <button className="back-btn" onClick={() => navigate('/')}>
                        Return to Home
                    </button>
            </div>
        </div>
    );
};

export default LogFitness;
