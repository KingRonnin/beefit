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
        <div>
            <WorkoutLogForm />
        </div>
    );
};

export default WorkoutLog;
