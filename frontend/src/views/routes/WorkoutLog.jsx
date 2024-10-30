import React from 'react';
import WorkoutLogForm from './WorkoutLogForm';

const WorkoutLog = () => {
    const handleWorkoutSubmit = (workoutData) => {
        console.log("Workout Data Submitted:", workoutData);
    };

    return (
        <div>
            <h1>Log Your Workout</h1>
            <WorkoutLogForm onSubmit={handleWorkoutSubmit} />
        </div>
    );
};

export default WorkoutLog;
