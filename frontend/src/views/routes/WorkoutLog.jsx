import React, { useState } from 'react';
import WorkoutLogForm from './WorkoutLogForm';
import WorkoutAnalysis from './WorkoutAnalysis';
import './WorkoutLog.css';

const WorkoutLog = () => {
    const [workoutData, setWorkoutData] = useState([]);

    const handleWorkoutSubmit = (newWorkout) => {
        setWorkoutData((prevData) => [...prevData, newWorkout]);
        console.log("Workout Data Submitted:", newWorkout);
    };

    return (
        <div className="workout-log-container">
            
            {/* Form for logging workouts */}
            <WorkoutLogForm onSubmit={handleWorkoutSubmit} />

            {/* Analysis section that uses the logged workouts */}
            <WorkoutAnalysis data={workoutData} />
        </div>
    );
};

export default WorkoutLog;
