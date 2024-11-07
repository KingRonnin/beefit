import React, { useEffect, useState } from 'react';

import apiInstance from '../../utils/axios';
import useUserData from '../../plugin/useUserData';
import Toast from '../../plugin/Toast.js'
import Swal from 'sweetalert2';

import Header from '../component/Header.jsx';
import './WorkoutLog.css';

const WorkoutLogPage = () => {
    const [strength, setStrength] = useState({set: 0, rep : 0, weight : 0, date : ""});
    const [cardiovascular, setCardiovascular] = useState({step: 0, time : 0, date : ""});
    const [isLoading, setIsLoading] = useState(false);
    const [exerciseList, setExerciseList] = useState([]);
    const [selectedExercise, setSelectedExercise]= useState({id: 0, type: "", exercise: ""});

    const userId = useUserData()?.user_id;

    const fetchExerciseData = async () => {
        const response = await apiInstance.get('get/exercise/list/');
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

    const handleExerciseChange = (event) => {
        const [id, type, exercise] = event.target.value.split("-");
        const selectedExercise = exerciseList.find(ex => ex.id == parseInt(id));
        setSelectedExercise(selectedExercise);
    };

    const handleAddStrengthWorkout = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(!strength.set || !strength.rep || !strength.date) {
            Toast("error", "Sets, Reps, and Date are required to fill in");
            setIsLoading(false);
            return;
        }

        const JSON = {
            exercise_id: selectedExercise.id,
            user_id: userId,
            set: strength.set,
            rep: strength.rep,
            weight: strength.weight,
            date: strength.date,
        };

        const formData = new FormData();
        
        formData.append("exercise_id", selectedExercise.id);
        formData.append("user_id", userId);
        formData.append("set", strength.set);
        formData.append("rep", strength.rep);
        formData.append("weight", strength.weight);
        formData.append("date", strength.date);
        try {
            const response = await apiInstance.post("post/log/strength/", formData, {
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
        if(!cardiovascular.step || !cardiovascular.time || !cardiovascular.date) {
            Toast("error", "Steps, Time, and Date are required to fill in");
            setIsLoading(false);
            return;
        }

        const JSON = {
            exercise_id: selectedExercise.id,
            user_id: userId,
            step: cardiovascular.step,
            time: cardiovascular.time,
            date: cardiovascular.date,
        };

        const formData = new FormData();

        formData.append("exercise_id", selectedExercise.id);
        formData.append("user_id", userId);
        formData.append("step", cardiovascular.step);
        formData.append("time", cardiovascular.time);
        formData.append("date", cardiovascular.date);
        try {
            const response = await apiInstance.post("post/log/cardiovascular/", formData, {
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
    <Header />
    <div className="workout-log-container">
        <div className="form-card">
            <h2>Log Your Workout</h2>
            <div className="form-group">
                <label htmlFor="exercise-selector" className='form-label'>Exercise</label>
                <select name="exercise-selector" id="exercise-selector" className='form-conditioner' onChange={handleExerciseChange}>
                    <option value="">Select Exercise</option>
                    {exerciseList.map(exercise => (
                        <option key={exercise.id} value={`${exercise.id}-${exercise.type}-${exercise.exercise}`}>
                            {exercise.exercise} ({exercise.type})
                        </option>
                    ))}
                </select>
            </div>
            {selectedExercise && (
                <>
                    {selectedExercise.type === 'Strength' && (
                    <form onSubmit={handleAddStrengthWorkout}>
                        <label htmlFor="date" className='form-label'>Date</label>
                        <input type="date" name="date" id="date" className='form-control' value={strength.date} onChange={handleStrengthChange} />
                        <label htmlFor="set" className='form-label'>Sets:</label>
                        <input type="number" id="set" name="set" className='form-control' min={0} value={strength.set} onChange={handleStrengthChange} />
                        <label htmlFor="rept" className='form-label'>Reps</label>
                        <input type="number" name="rep" id="rep" className='form-control' min={0} value={strength.rep} onChange={handleStrengthChange} />
                        <label htmlFor="weight" className='form-label'>Weight (If Applicable)</label>
                        <input type="number" name="weight" id="weight" className='form-control' min={0} value={strength.weight} onChange={handleStrengthChange} />
                        <button type="submit" className='log-button'>Add Workout</button>
                    </form>
                    )}
                    {selectedExercise.type === 'Cardiovascular' && (
                    <form onSubmit={handleAddCardioWorkout}>
                        <label htmlFor="date" className='form-label'>Date:</label>
                        <input type="date" name="date" id="date" className='form-control' value={cardiovascular.date} onChange={handleCardioChange}/>
                        <label htmlFor="step" className='form-label'>Steps:</label>
                        <input type="number" id="step" name="step" className='form-control' min={0} value={cardiovascular.step} onChange={handleCardioChange} />
                        <label htmlFor="time" className='form-label'>Duration</label>
                        <input type="number" name="time" id="time"className='form-control' min={0} value={cardiovascular.time} onChange={handleCardioChange} />
                        <button type="submit" className='log-button'>Add Workout</button>
                    </form>
                    )}
                </>
            )}
        </div>
    </div>
    </>
    );
};

export default WorkoutLogPage;


