import React, { useEffect, useState } from 'react';
import WorkoutAnalysis from './WorkoutAnalysis';
import './WorkoutLog.css';
import '../../images/hbd.jpg';

import apiInstance from '../../utils/axios';
import useUserData from '../../plugin/useUserData';
import Toast from '../../plugin/Toast.js'
import Swal from 'sweetalert2';

const WorkoutLogPage = () => {
    const [strength, setStrength] = useState({sets: 0, reps : 0, weight : 0, date : ""});
    const [cardiovascular, setCardiovascular] = useState({steps: 0, time : 0, date : ""});
    const [isLoading, setIsLoading] = useState(false);
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

    const handleStrengthChange = (event) => {
        setStrength({
            ...strength,
            [event.target.name]: event.target.value,
        });
    };

    const handleCardioChange = (event) => {
        setCardiovascular({
            ...cardiovascular,
            [event.target.name]: event.target.value,
        });
    };

    const handleStrength = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(!strength.sets || !strength.reps || !strength.date) {
            Toast("error", "Sets, Reps, and Date are required to be greater than 0 to log workout");
            setIsLoading(false);
            return;
        }

        const JSON = {
            sets: strength.sets,
            reps: strength.reps,
            weight: strength.weight,
            date: strength.date,
        };

        const formData = new FormData();

        formData.append("sets", strength.sets);
        formData.append("reps", strength.reps);
        formData.append("weight", strength.weight);
        formData.append("date", strength.date);
        try {
            const response = await apiInstance.post("post/exercise/strength", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Workout Logged")
            Swal.fire({
                icon: "success",
                title: "Workout Logged"
            });
        } catch (error) {
            setIsLoading(false);
        }
    };

    // const fetchExerciseData = async () => {
    //     const strength_request = await apiInstance.get(`get/strength/${userId}`);
    //     setStrength(strength_request.data[0]);

    //     const cardiovascular_request = await apiInstance.get(`get/cardio/${userId}`);
    //     setCardiovascular(cardiovascular_request.data[0]);
    // };

    // useEffect(() => {
    //     fetchExerciseData();
    // }, []);

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
