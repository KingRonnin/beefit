import React from 'react';
import WorkoutLogForm from './WorkoutLogForm';
import './WorkoutLog.css';

const WorkoutLog = () => {
    const handleWorkoutSubmit = (workoutData) => {
        console.log("Workout Data Submitted:", workoutData);
    };

    return (
        <div className="workout-log-container">
            <h1>Workout Log</h1>
            <WorkoutLogForm onSubmit={handleWorkoutSubmit} />
        </div>
    );
};

export default WorkoutLog;
