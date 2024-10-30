import React, { useState } from 'react';
import WorkoutAnalysis from './WorkoutAnalysis'; // Make sure the path is correct
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"; // if not already imported

const WorkoutLogForm = () => {
    const [date, setDate] = useState('');
    const [exercise, setExercise] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [weight, setWeight] = useState('');
    const [workoutData, setWorkoutData] = useState([]); // Store each workout log

    const exerciseOptions = [
        { name: 'Running', type: 'Cardio', caloriesPerMinute: 10 },
        { name: 'Squats', type: 'Strength', caloriesPerRep: 0.5 },
        { name: 'Push-ups', type: 'Strength', caloriesPerRep: 0.3 },
        // Add more exercises as needed
    ];

    const handleAddWorkout = () => {
        const selectedExercise = exerciseOptions.find((e) => e.name === exercise);
        const caloriesBurned = selectedExercise.type === 'Cardio'
            ? selectedExercise.caloriesPerMinute * (reps * sets) // reps in this case is treated as minutes for cardio
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
        <div className="workout-logger">
            <h2>Log Your Workout</h2>
            <div className="workout-form">
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

                <button onClick={handleAddWorkout}>Continue</button>
            </div>

            {/* Render WorkoutAnalysis and pass workoutData as prop */}
            <WorkoutAnalysis data={workoutData} />
        </div>
    );
};

export default WorkoutLogForm;
