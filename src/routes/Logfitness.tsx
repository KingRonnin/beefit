import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LogFitness.css';
import loadingGif from '../images/loading-gif.gif'; // Add the loading GIF import

const LogFitness: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the user data passed via navigation
    const user = location.state?.user || {}; // Safely retrieve user information, fallback to empty object if no user

    const [goal, setGoal] = useState('weight loss');
    const [weight, setWeight] = useState('');
    const [runDistance, setRunDistance] = useState('');
    const [stretchDistance, setStretchDistance] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    // Handle clicking on a goal
    const handleGoalClick = (goal: string) => {
        setGoal(goal);
        if (goal === 'weight loss') {
            setLoading(true); // Set loading to true when "Weight loss" is clicked
            setTimeout(() => {
                setLoading(false); // Stop loading after 2 seconds
                navigate('/WeightLossPage'); // Navigate to the "WeightLossPage"
            }, 2000); // Simulate loading delay
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (+weight <= 0 || +runDistance <= 0 || +stretchDistance <= 0) {
            alert('Please enter positive values.');
            return;
        }

        setSuccessMessage('Data logged successfully!');
        setLoading(true); // Start loading when form is submitted

        setTimeout(() => {
            setSuccessMessage('');
            setLoading(false); // Stop loading after success
            navigate('/myplan');
        }, 3000); // Simulate loading delay

        // Clear the input fields
        setWeight('');
        setRunDistance('');
        setStretchDistance('');
    };

    return (
        <div className="log-fitness">
            <div className="left-section" />
            <div className="right-section">

                {/* Display the logged-in user's name at the top-right corner */}
                <div className="user-info">
                    <p>Welcome, {user.name || 'Guest'}!</p>
                </div>

                <h1>Track Your Fitness</h1>
                {successMessage && <p className="success-message">{successMessage}</p>}

                {/* Loading overlay */}
                {loading && (
                    <div className="loading-overlay">
                        <img src={loadingGif} alt="Loading..." className="loading-spinner" />
                        <p>Loading...</p>
                    </div>
                )}

                {!loading && (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>What is your primary fitness goal?</label>
                            <div className="button-group">
                                <button
                                    type="button"
                                    className={goal === 'weight loss' ? 'active' : ''}
                                    onClick={() => handleGoalClick('weight loss')}
                                    disabled={loading} // Disable buttons while loading
                                >
                                    Weight loss
                                </button>
                                <button
                                    type="button"
                                    className={goal === 'improving endurance' ? 'active' : ''}
                                    onClick={() => handleGoalClick('improving endurance')}
                                    disabled={loading}
                                >
                                    Improving endurance
                                </button>
                                <button
                                    type="button"
                                    className={goal === 'enhancing flexibility' ? 'active' : ''}
                                    onClick={() => handleGoalClick('enhancing flexibility')}
                                    disabled={loading}
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
                                disabled={loading} // Disable inputs while loading
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
                                disabled={loading}
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
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" disabled={loading}>Continue</button>
                    </form>
                )}

                <button className="back-btn" onClick={() => navigate('/')} disabled={loading}>
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default LogFitness;
