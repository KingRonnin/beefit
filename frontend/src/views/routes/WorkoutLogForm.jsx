import React, { useState } from 'react';
import WorkoutAnalysis from './WorkoutAnalysis';
import './WorkoutLog.css';
import '../../images/hbd.jpg';

import apiInstance from '../../utils/axios';
import useUserData from '../../plugin/useUserData';
import Toast from '../../plugin/Toast.js'

const WorkoutLogPage = () => {
    const [strength, setStrength] = useState([]);
    const [cardiovascular, setCardiovascular] = useState([]);
    // const [date, setDate] = useState('');
    // const [exercise, setExercise] = useState('');
    // const [reps, setReps] = useState('');
    // const [sets, setSets] = useState('');
    // const [weight, setWeight] = useState('');
    // const [workoutData, setWorkoutData] = useState([]);

    const exerciseOptions = [
        { name: 'Running', type: 'Cardio', caloriesPerMinute: 10 },
        { name: 'Squats', type: 'Strength', caloriesPerRep: 0.5 },
        { name: 'Push-ups', type: 'Strength', caloriesPerRep: 0.3 },
    ];

    const userId = useUserData()?.user_id;

    const fetchExerciseData = async () => {
        const strength_response = await apiInstance.get('')
    }

    const handleAddWorkout = () => {
        const selectedExercise = exerciseOptions.find((e) => e.name === exercise);
        const caloriesBurned = selectedExercise.type === 'Cardio'
            ? selectedExercise.caloriesPerMinute * (reps * sets)
            : selectedExercise.caloriesPerRep * reps * sets;

        const newWorkout = {
            date,
            exercise,
            reps: Number(reps),
            sets: Number(sets),
            weight: Number(weight),
            caloriesBurned,
        };

        setWorkoutData([...workoutData, newWorkout]);
        setDate('');
        setExercise('');
        setReps('');
        setSets('');
        setWeight('');
    };

    return (
        <div className="workout-log-container">
            <div className="form-card">
                <h2>Log Your Workout</h2>
                <form className="workout-form">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <label>Exercise:</label>
                    <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
                        <option value="">Select Exercise</option>
                        {exerciseOptions.map((ex) => (
                            <option key={ex.name} value={ex.name}>
                                {ex.name} ({ex.type})
                            </option>
                        ))}
                    </select>

                    <label>Reps:</label>
                    <input
                        type="number"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                    />

                    <label>Sets:</label>
                    <input
                        type="number"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                    />

                    {exerciseOptions.find((ex) => ex.name === exercise)?.type === 'Strength' && (
                        <>
                            <label>Weight (kg):</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            />
                        </>
                    )}

                    <button type="button" className="add-exercise-button" onClick={handleAddWorkout}>Add Exercise</button>
                </form>
            </div>

            {/* Analysis Section */}
            <WorkoutAnalysis data={workoutData} />
        </div>
    );
};

export default WorkoutLogPage;
