import React, { useState } from 'react';

const WorkoutLogForm = ({ onSubmit }) => {
    const [caloriesBurned, setCaloriesBurned] = useState('');
    const [duration, setDuration] = useState('');
    const [workoutType, setWorkoutType] = useState('Cardio');
    const [exercises, setExercises] = useState([]);

    const handleAddExercise = () => {
        setExercises([...exercises, { name: '', reps: 0, sets: 0, weight: 0 }]);
    };

    const handleExerciseChange = (index, field, value) => {
        const newExercises = [...exercises];
        newExercises[index][field] = value;
        setExercises(newExercises);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            date: new Date().toISOString(),
            workoutType,
            caloriesBurned: Number(caloriesBurned),
            duration: Number(duration),
            exercises
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Workout Type:</label>
            <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                <option value="Cardio">Cardio</option>
                <option value="Strength">Strength</option>
                <option value="Flexibility">Flexibility</option>
            </select>

            <label>Calories Burned:</label>
            <input type="number" value={caloriesBurned} onChange={(e) => setCaloriesBurned(e.target.value)} />

            <label>Duration (mins):</label>
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />

            <h3>Exercises</h3>
            {exercises.map((exercise, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Exercise Name"
                        value={exercise.name}
                        onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Reps"
                        value={exercise.reps}
                        onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Sets"
                        value={exercise.sets}
                        onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Weight (if any)"
                        value={exercise.weight}
                        onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)}
                    />
                </div>
            ))}
            <button type="button" onClick={handleAddExercise}>Add Exercise</button>
            <button type="submit">Log Workout</button>
        </form>
    );
};

export default WorkoutLogForm;
