import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LogFitness.css';
import loadingGif from '../../images/loading-gif.gif';


const LogFitness: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user || {};

    const [goal, setGoal] = useState('weight loss');
    const [savedGoal, setSavedGoal] = useState<string | null>(null);
    const [weight, setWeight] = useState('');
    const [runDistance, setRunDistance] = useState('');
    const [stretchDistance, setStretchDistance] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [goalSavedMessage, setGoalSavedMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [goalSelected, setGoalSelected] = useState(false);
    const [showFormContent, setShowFormContent] = useState(false);

    const weightLossRef = useRef<HTMLDivElement>(null);
    const enduranceRef = useRef<HTMLDivElement>(null);
    const flexibilityRef = useRef<HTMLDivElement>(null);

    const handleGoalClick = (goal: string) => {
        setGoal(goal);
        setGoalSavedMessage('');
        setGoalSelected(true);

        if (goal === 'weight loss' && weightLossRef.current) {
            weightLossRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (goal === 'improving endurance' && enduranceRef.current) {
            enduranceRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (goal === 'enhancing flexibility' && flexibilityRef.current) {
            flexibilityRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (+weight <= 0 || +runDistance <= 0 || +stretchDistance <= 0) {
            alert('Please enter positive values.');
            return;
        }

        const loggedData = {
            weight: +weight,
            runDistance: +runDistance,
            stretchDistance: +stretchDistance,
            date: new Date().toISOString(),
        };

        const previousData = JSON.parse(localStorage.getItem('fitnessData') || '[]');
        previousData.push(loggedData);
        localStorage.setItem('fitnessData', JSON.stringify(previousData));

        setSuccessMessage('Data logged successfully!');
        setLoading(true);

        setTimeout(() => {
            setSuccessMessage('');
            setLoading(false);
            navigate('/myplan');
        }, 3000);

        setWeight('');
        setRunDistance('');
        setStretchDistance('');
    };

    const handleSaveGoal = () => {
        setSavedGoal(goal);
        setGoalSavedMessage('Goal saved!');
        setShowFormContent(true);
    };

    const handleDeleteGoal = () => {
        setSavedGoal(null);
        setGoal('');
        setGoalSavedMessage('Goal removed!');
        setGoalSelected(false);
        setShowFormContent(false);
    };

    const handleBack = () => {
        
        setSavedGoal(null);
        setGoal('');
        setWeight('');
        setRunDistance('');
        setStretchDistance('');
        setGoalSavedMessage('');
        setSuccessMessage('');
        setGoalSelected(false);
        setShowFormContent(false);
        navigate('/LogFitness'); 
    };

    return (
        <div className="log-fitness">
            <div className="left-section" />
            <div className="right-section">
                <div className="user-info">
                    <p>Welcome, {user.name || 'Jagpreet'}!</p>
                </div>

                <h1>Track Your Fitness</h1>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {goalSavedMessage && <p className="goal-saved-message">{goalSavedMessage}</p>}

                {loading && (
                    <div className="loading-overlay">
                        <img src={loadingGif} alt="Loading..." className="loading-spinner" />
                        <p>Loading...</p>
                    </div>
                )}

                {!loading && (
                    <>
                       
                        {savedGoal && showFormContent && (
                            <div className="form-group">
                                <h2>Your Saved Goal: {savedGoal}</h2>
                                <button onClick={handleDeleteGoal} className="delete-goal-btn">
                                    Delete Goal
                                </button>
                            </div>
                        )}

                        {(!savedGoal || (savedGoal && showFormContent)) && (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    {savedGoal ? (
                                        <>
                                            <label>Your Current Weight (kg):</label>
                                            <input
                                                type="number"
                                                id="weight"
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                                required
                                            />
                                        </>
                                    ) : (
                                        <>
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
                                        </>
                                    )}
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
                        )}

                        {/* Weight Loss Section */}
                        {goal === 'weight loss' && (
                            <div className="additional-section weight-loss" ref={weightLossRef}>
                                <h2>Weight Loss Tips</h2>
                                <p>
                                    For weight loss, focus on creating a calorie deficit by burning more calories than you consume. 
                                    A combination of cardio exercises, strength training, and a balanced diet will help you achieve sustainable results. 
                                    Incorporate high-intensity interval training (HIIT) and monitor your calorie intake.
                                </p>
                                <p>
                                    Track your daily calorie intake and aim for steady progress to avoid burnout. Make sure you're eating nutrient-dense foods to maintain energy levels.
                                </p>
                                {goalSelected && !savedGoal && (
                                    <button onClick={handleSaveGoal} className="save-goal-btn">Save Goal</button>
                                )}
                            </div>
                        )}

                        {/* Endurance Section */}
                        {goal === 'improving endurance' && (
                            <div className="additional-section endurance" ref={enduranceRef}>
                                <h2>Endurance Training Tips</h2>
                                <p>
                                    To improve endurance, focus on increasing your running distance and time gradually.
                                    Aim for consistent, moderate-intensity cardio exercises like running, cycling, or swimming.
                                    Track your progress weekly to stay motivated!
                                </p>
                                <p>Consider adding strength training for better stamina.</p>
                                {goalSelected && !savedGoal && (
                                    <button onClick={handleSaveGoal} className="save-goal-btn">Save Goal</button>
                                )}
                            </div>
                        )}

                        {/* Flexibility Section */}
                        {goal === 'enhancing flexibility' && (
                            <div className="additional-section flexibility" ref={flexibilityRef}>
                                <h2>Flexibility Exercises</h2>
                                <p>
                                    To enhance flexibility, incorporate stretching exercises such as yoga or Pilates.
                                    Dynamic stretches before a workout and static stretches afterward can improve your range of motion.
                                    Focus on all major muscle groups to maintain balance and prevent injuries.
                                </p>
                                <p>Track how your stretching distance improves over time!</p>
                                {goalSelected && !savedGoal && (
                                    <button onClick={handleSaveGoal} className="save-goal-btn">Save Goal</button>
                                )}
                            </div>
                        )}
                    </>
                )}

                <button className="back-btn" onClick={handleBack} disabled={loading}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default LogFitness;