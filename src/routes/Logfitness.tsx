import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogFitness.css';

const LogFitness: React.FC = () => {
    const navigate = useNavigate();
    const [weight, setWeight] = useState('');
    const [measurements, setMeasurements] = useState({ waist: '', chest: '', hips: '' });
    const [achievement, setAchievement] = useState('');
    const [logs, setLogs] = useState<{ date: string; weight: string; measurements: typeof measurements; achievement: string }[]>([]);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (+weight <= 0 || +measurements.waist <= 0 || +measurements.chest <= 0 || +measurements.hips <= 0) {
            alert('Please enter positive values.');
            return;
        }
        const newLog = {
            date: new Date().toLocaleDateString(),
            weight,
            measurements,
            achievement,
        };
        setLogs([...logs, newLog]);
        setSuccessMessage('Log added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setWeight('');
        setMeasurements({ waist: '', chest: '', hips: '' });
        setAchievement('');
    };

    const handleDelete = (index: number) => {
        const newLogs = logs.filter((_, i) => i !== index);
        setLogs(newLogs);
    };

    return (
        <div className="log-fitness">
            <h1>Log Your Fitness Progress</h1>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="weight">Weight (kg):</label>
                    <input
                        type="number"
                        id="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="waist">Waist (cm):</label>
                    <input
                        type="number"
                        id="waist"
                        value={measurements.waist}
                        onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="chest">Chest (cm):</label>
                    <input
                        type="number"
                        id="chest"
                        value={measurements.chest}
                        onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="hips">Hips (cm):</label>
                    <input
                        type="number"
                        id="hips"
                        value={measurements.hips}
                        onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="achievement">Achievements:</label>
                    <input
                        type="text"
                        id="achievement"
                        value={achievement}
                        onChange={(e) => setAchievement(e.target.value)}
                    />
                </div>
                <button type="submit">Log</button>
            </form>
            <div className="log-list">
                <h2>Logged Progress</h2>
                {logs.length > 0 ? (
                    <ul>
                        {logs.map((log, index) => (
                            <li key={index} className="log-card">
                                <strong>{log.date}</strong>
                                <div>Weight: {log.weight}kg</div>
                                <div>Waist: {log.measurements.waist}cm</div>
                                <div>Chest: {log.measurements.chest}cm</div>
                                <div>Hips: {log.measurements.hips}cm</div>
                                <div>Achievement: {log.achievement}</div>
                                <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No logs available.</p>
                )}
            </div>
            <div className="action-buttons">
                <button className="back-btn" onClick={() => navigate('/')}>
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default LogFitness;
