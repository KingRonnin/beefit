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
    const [exerciseList, setExerciseList] = useState([]);
    const [selectedExercise, setSelectedExercise]= useState(null);

    const userId = useUserData()?.user_id;

    const fetchExerciseData = async () => {
        const response = await apiInstance.get('post/exercise/list');
        const filterData = response.data.map(exercise => {
            const { user, ...rest } = exercise;
            return rest;
        })
        setExerciseList(filterData);
        console.log(filterData);
    };

    useEffect(() => {
        fetchExerciseData();
    }, []);

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

    const handleAddStrengthWorkout = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(!strength.sets || !strength.reps || !strength.date) {
            Toast("error", "Sets, Reps, and Date are required to fill in");
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
            Toast("error", "Failed to log strength workout. Please try again")
            setIsLoading(false);
        }
    };

    const handleAddCardioWorkout = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(!cardiovascular.steps || !cardiovascular.time || !cardiovascular.date) {
            Toast("error", "Steps, Time, and Date are required to fill in");
            setIsLoading(false);
            return;
        }
        
        const selectedExercise = exerciseOptions.find((e) => e.name === exercise);
        const caloriesBurned = selectedExercise.caloriesPerMinute * (time * steps);

        const JSON = {
            steps: cardiovascular.steps,
            time: cardiovascular.time,
            date: cardiovascular.date,
            caloriesBurned: caloriesBurned
        };

        const formData = new FormData();

        formData.append("steps", cardiovascular.steps);
        formData.append("time", cardiovascular.time);
        formData.append("date", cardiovascular.date);
        try {
            const response = await apiInstance.post("post/exercise/cardio", formData, {
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
            Toast("error", "Failed to log strength workout. Please try again")
            setIsLoading(false);
        }
    };

return (
    <>
        <div className="workout-log-container">
            <div className="form-card">
                <h2>Log Your Workout</h2>
                <div className="form-group">
                    <label htmlFor="exercise-selector" className='form-label'>Exercise</label>
                    <select name="exercise-selector" id="exercise-selector" onChange={(e) => setSelectedExercise(e.target.value)}>
                        <option value="">Select Exercise</option>
                        {exerciseList.map(exercise => (
                            <option key={exercise.id}>
                                {exercise.exercise} ({exercise.type})
                            </option>
                        ))}
                    </select>
                </div>
                {selectedExercise && (
                    <div className="form-box">
                        {selectedExercise === 'Strength' && (
                            <>
                                <form onSubmit={handleAddStrengthWorkout}>

                                </form>
                            </>
                        )};
                        {selectedExercise === 'Cardiovascular' && (
                            <>
                                <form onSubmit={handleAddCardioWorkout}>
                                    
                                </form>
                            </>
                        )}}
                    </div>
                )}
            </div>
        </div>
    </>
    );
};

export default WorkoutLogPage;


