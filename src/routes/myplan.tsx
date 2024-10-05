import React, { useState } from 'react';
import './myplan.css';
import logo from '../images/beefit-logo.png';
import texture from '../images/texture.png'; // Ensure the path is correct

interface Exercise {
    id: number;
    title: string;
    kcal: number;
    mins: number;
}

const MyPlan: React.FC = () => {
    const [totalExercises, setTotalExercises] = useState<number>(0);
    const [totalKcal, setTotalKcal] = useState<number>(0);
    const [totalMins, setTotalMins] = useState<number>(0);
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
    const [subExercises, setSubExercises] = useState<Exercise[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [showCategories, setShowCategories] = useState<boolean>(false);

    const workoutData: Record<string, Exercise[]> = {
        fullBody: [
            { id: 1, title: 'Push Ups', kcal: 50, mins: 10 },
            { id: 2, title: 'Squats', kcal: 100, mins: 15 },
            { id: 3, title: 'Burpees', kcal: 80, mins: 10 },
        ],
        abs: [
            { id: 1, title: 'Planks', kcal: 30, mins: 5 },
            { id: 2, title: 'Crunches', kcal: 50, mins: 10 },
            { id: 3, title: 'Leg Raises', kcal: 40, mins: 8 },
        ],
        arm: [
            { id: 1, title: 'Bicep Curls', kcal: 40, mins: 10 },
            { id: 2, title: 'Tricep Dips', kcal: 60, mins: 15 },
            { id: 3, title: 'Push Ups', kcal: 50, mins: 10 },
        ],
    };

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        setSubExercises(workoutData[category]);
    };

    const handleExerciseClick = (exercise: Exercise) => {
        setTotalExercises(totalExercises + 1);
        setTotalKcal(totalKcal + exercise.kcal);
        setTotalMins(totalMins + exercise.mins);
        setSelectedExercises((prevExercises) => [...prevExercises, exercise]);
    };

    const handleRemoveExercise = (exercise: Exercise) => {
        setTotalExercises(totalExercises - 1);
        setTotalKcal(totalKcal - exercise.kcal);
        setTotalMins(totalMins - exercise.mins);
        setSelectedExercises((prevExercises) => prevExercises.filter(item => item.id !== exercise.id));
    };

    const handleEditExercise = (exercise: Exercise, newKcal: number, newMins: number) => {
        const updatedExercises = selectedExercises.map(item => {
            if (item.id === exercise.id) {
                const kcalDiff = newKcal - item.kcal;
                const minsDiff = newMins - item.mins;
                setTotalKcal(totalKcal + kcalDiff);
                setTotalMins(totalMins + minsDiff);
                return { ...item, kcal: newKcal, mins: newMins };
            }
            return item;
        });
        setSelectedExercises(updatedExercises);
    };

    const toggleCategories = () => {
        setShowCategories((prevShow) => !prevShow);
    };

    return (
        <div className="myplan-container">
            <div className="myplan-content">
                <img src={logo} alt="Beefit Logo" className="logo" />
                <h1 className="page-title">WORKOUT PLANS</h1>

                <div className="stats">
                    <div className="stat">
                        <h2>{totalExercises}</h2>
                        <p>EXERCISES</p>
                    </div>
                    <div className="stat">
                        <h2>{totalKcal}</h2>
                        <p>KCAL</p>
                    </div>
                    <div className="stat">
                        <h2>{totalMins}</h2>
                        <p>MINS</p>
                    </div>
                </div>

                <p className="choose-workout">Choose your Workout!</p>

                <button className="create-plan-btn" onClick={toggleCategories}>
                    CREATE YOUR PLAN HERE!
                </button>

                {showCategories && (
                    <div className="workout-grid">
                        <div className="workout-card" onClick={() => handleCategoryClick('fullBody')}>
                            <img src="/images/full-body.webp" alt="Full Body" className="workout-image" />
                            <p className="workout-title">FULL BODY WORKOUT</p>
                        </div>

                        <div className="workout-card" onClick={() => handleCategoryClick('abs')}>
                            <img src="../images/abs-beginner.jpg" alt="Abs Beginner" className="workout-image" />
                            <p className="workout-title">ABS BEGINNER</p>
                        </div>

                        <div className="workout-card" onClick={() => handleCategoryClick('arm')}>
                            <img src="../images/arm-beginner.webp" alt="Arm Beginner" className="workout-image" />
                            <p className="workout-title">ARM BEGINNER</p>
                        </div>
                    </div>
                )}

                {activeCategory && (
                    <div className="sub-exercises">
                        <h2>{activeCategory.toUpperCase()} EXERCISES</h2>
                        <ul>
                            {subExercises.map((exercise) => (
                                <li key={exercise.id} className="sub-exercise">
                                    <span>{exercise.title} - {exercise.kcal} KCAL - {exercise.mins} MINS</span>
                                    <button className="add-btn" onClick={() => handleExerciseClick(exercise)}>Add</button>
                                    <button
                                        className="edit-btn"
                                        onClick={() => {
                                            const newKcal = parseInt(prompt('Edit KCAL:', exercise.kcal.toString()) || '0', 10);
                                            const newMins = parseInt(prompt('Edit MINS:', exercise.mins.toString()) || '0', 10);
                                            handleEditExercise(exercise, newKcal, newMins);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button className="remove-btn" onClick={() => handleRemoveExercise(exercise)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="selected-exercises">
                    <h2>Selected Exercises</h2>
                    {selectedExercises.length > 0 ? (
                        <ul>
                            {selectedExercises.map((exercise) => (
                                <li key={exercise.id} className="selected-exercise">
                                    <span>{exercise.title} - {exercise.kcal} KCAL - {exercise.mins} MINS</span>
                                    <button
                                        className="edit-btn"
                                        onClick={() => {
                                            const newKcal = parseInt(prompt('Edit KCAL:', exercise.kcal.toString()) || '0', 10);
                                            const newMins = parseInt(prompt('Edit MINS:', exercise.mins.toString()) || '0', 10);
                                            handleEditExercise(exercise, newKcal, newMins);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button className="remove-btn" onClick={() => handleRemoveExercise(exercise)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No exercises selected yet.</p>
                    )}
                </div>

                {/* Save Button */}
                {selectedExercises.length > 0 && (
                    <div className="action-buttons">
                        <button
                            className="save-btn"
                            onClick={() => {
                                // Implement your save logic here
                                alert('Exercises saved!'); // Placeholder action
                            }}
                        >
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};



export default MyPlan;
