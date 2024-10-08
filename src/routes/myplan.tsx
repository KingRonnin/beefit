import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './myplan.css';
import logo from '../images/beefit-logo.png';

const ExerciseModal: React.FC<{
    exercises: Exercise[];
    onClose: () => void;
    onSelectExercise: (exercise: Exercise) => void;
}> = ({ exercises, onClose, onSelectExercise }) => {
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Select Exercise</h2>
                {exercises.map((exercise) => (
                    <div key={exercise.id} className="modal-exercise-item">
                        <input
                            type="radio"
                            id={exercise.title}
                            name="exercise"
                            value={exercise.title}
                            onChange={() => setSelectedExercise(exercise)}
                        />
                        <label htmlFor={exercise.title}>
                            {exercise.title} - {exercise.kcal} KCAL - {exercise.mins} MINS
                        </label>
                    </div>
                ))}
                {selectedExercise && (
                    <div className="exercise-gif-container">
                        <img src={selectedExercise.gif} alt={selectedExercise.title} style={{ width: '100%', height: '500px', objectFit:'contain' }} />
                    </div>
                )}
                <div className="modal-actions">
                    <button
                        disabled={!selectedExercise}
                        onClick={() => {
                            if (selectedExercise) {
                                onSelectExercise(selectedExercise);
                            }
                            onClose();
                        }}
                    >
                        Done
                    </button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

interface Exercise {
    id: string;
    title: string;
    kcal: number;
    mins: number;
    gif: string;
}

const MyPlan: React.FC = () => {
    const [totalExercises, setTotalExercises] = useState<number>(0);
    const [totalKcal, setTotalKcal] = useState<number>(0);
    const [totalMins, setTotalMins] = useState<number>(0);
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [categoryExercises, setCategoryExercises] = useState<Exercise[]>([]);
    const [showLevels, setShowLevels] = useState<boolean>(false);

    const workoutData: Record<string, Record<string, Exercise[]>> = {
        fullBody: {
            beginner: [
                { id: 'fullBody1', title: 'Push Ups', kcal: 50, mins: 10, gif: 'https://media.post.rvohealth.io/wp-content/uploads/sites/2/2019/05/PERFECT-PUSHUP.gif' },
                { id: 'fullBody2', title: 'Squats', kcal: 100, mins: 15, gif: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTZ3Zm0xM3Z5Nmgxdmh3ejg2NG84YmRlb3duOXRxY2Uwdm9zOWdsciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/HIlZpE5TxLHVmfTTxe/giphy.webp' },
            ],
            intermediate: [
                { id: 'fullBody3', title: 'Burpees', kcal: 80, mins: 10, gif: 'https://i.makeagif.com/media/1-27-2017/iKECQ7.gif' },
                { id: 'fullBody4', title: 'Lunges', kcal: 90, mins: 12, gif: 'https://media.tenor.com/fWiC9Ze5eUMAAAAM/lunges-exercise.gif' },
            ],
            advanced: [
                { id: 'fullBody5', title: 'Mountain Climbers', kcal: 100, mins: 15, gif: 'https://www.mitrecsports.com/assets/Mountain-Climbers-Gif.gif' },
                { id: 'fullBody6', title: 'Deadlifts', kcal: 150, mins: 20, gif: 'https://www.journalmenu.com/wp-content/uploads/2018/03/deadlift-gif-side.gif' },
            ],
        },
        abs: {
            beginner: [
                { id: 'abs1', title: 'Planks', kcal: 30, mins: 5, gif: 'https://media.tenor.com/6SOetkNbfakAAAAM/plank-abs.gif' },
                { id: 'abs2', title: 'Crunches', kcal: 50, mins: 10, gif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-HyWOI9XzwnOgJW3B4s2BPpI6diwr38stQQ&s' },
            ],
            intermediate: [
                { id: 'abs3', title: 'Leg Raises', kcal: 40, mins: 8, gif: 'https://media.tenor.com/IDGUQ-6TBpEAAAAM/leg-lifts.gif' },
                { id: 'abs4', title: 'Russian Twists', kcal: 60, mins: 12, gif: 'https://media2.giphy.com/media/cpKD9u3S25xYL8tcbr/200w.gif?cid=6c09b952982qc93qznei3hb7a8usnmmsroqq1z5stb1kfpgu&ep=v1_gifs_search&rid=200w.gif&ct=g' },
            ],
            advanced: [
                { id: 'abs5', title: 'Bicycle Crunches', kcal: 70, mins: 10, gif: 'https://www.icegif.com/wp-content/uploads/2022/08/icegif-121.gif' },
                { id: 'abs6', title: 'V-Ups', kcal: 90, mins: 15, gif: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKU3hzpo7bcI5C28-dZp5aez53kP2-iGwU7A&s' },
            ],
        },
        arm: {
            beginner: [
                { id: 'arm1', title: 'Bicep Curls', kcal: 40, mins: 10, gif: 'https://media1.popsugar-assets.com/files/thumbor/LvmfizMv8KR6r7MkMR-TmOrs9ck/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2021/08/27/563/n/1922729/a776b229bf1e8e99_IMB_MUp4Uh/i/Bicep-Curl.GIF' },
                { id: 'arm2', title: 'Tricep Dips', kcal: 60, mins: 15, gif: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/05/Chair-dip.gif?w=1155&h=840' },
            ],
            intermediate: [
                { id: 'arm3', title: 'Hammer Curls', kcal: 50, mins: 12, gif: 'https://s3.amazonaws.com/photography.prod.demandstudios.com/642e896b-4ac7-44ba-84fd-4173ea4440e1.gif' },
                { id: 'arm4', title: 'Overhead Press', kcal: 70, mins: 14, gif: 'https://post.healthline.com/wp-content/uploads/2019/06/Standing-dumbbell-military-press.gif' },
            ],
            advanced: [
                { id: 'arm5', title: 'Arnold Press', kcal: 80, mins: 15, gif: 'https://dannyleejames.com/wp-content/uploads/2024/02/Single-Arm-Arnold-Press-Gif.gif' },
                { id: 'arm6', title: 'Pull Ups', kcal: 100, mins: 20, gif: 'https://www.nerdfitness.com/wp-content/uploads/2019/03/chin-up-staci.gif' },
            ],
        },
    };

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        setShowLevels(true);
    };

    const handleLevelSelect = (level: string) => {
        if (activeCategory) {
            setCategoryExercises(workoutData[activeCategory][level]);
            setShowModal(true);
        }
        setShowLevels(false);
    };

    const handleSelectExercise = (exercise: Exercise) => {
        setSelectedExercises((prev) => [...prev, exercise]);
        setTotalKcal((prev) => prev + exercise.kcal);
        setTotalMins((prev) => prev + exercise.mins);
        setTotalExercises((prev) => prev + 1);
    };

    const handleClearExercises = () => {
        setSelectedExercises([]);
        setTotalKcal(0);
        setTotalMins(0);
        setTotalExercises(0);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setActiveCategory(null);
        setCategoryExercises([]);
    };

    return (
        <div className="myplan-container">
            <img src={logo} alt="Beefit Logo" className="beefit-logo" />
            <h1>My Plan</h1>
            <div className="myplan-content">
                {selectedExercises.length > 0 && (
                    <div className="summary">
                        <h2>Selected Exercises</h2>
                        <ul>
                            {selectedExercises.map((exercise) => (
                                <li key={exercise.id}>{exercise.title}</li>
                            ))}
                        </ul>
                        <p>Total Exercises: {totalExercises}</p>
                        <p>Total Calories: {totalKcal} KCAL</p>
                        <p>Total Time: {totalMins} MINUTES</p>
                        <button onClick={handleClearExercises} className="clear-button">Clear</button>
                    </div>
                )}

                <h2>Choose Your Workout Category:</h2>
                <div className="categories">
                    <button onClick={() => handleCategoryClick('fullBody')}>Full Body</button>
                    <button onClick={() => handleCategoryClick('abs')}>Abs</button>
                    <button onClick={() => handleCategoryClick('arm')}>Arms</button>
                </div>

                {showLevels && (
                    <div className="levels">
                        <h3>Select Difficulty Level:</h3>
                        <button onClick={() => handleLevelSelect('beginner')}>Beginner</button>
                        <button onClick={() => handleLevelSelect('intermediate')}>Intermediate</button>
                        <button onClick={() => handleLevelSelect('advanced')}>Advanced</button>
                    </div>
                )}

                {showModal && (
                    <ExerciseModal
                        exercises={categoryExercises}
                        onClose={handleCloseModal}
                        onSelectExercise={handleSelectExercise}
                    />
                )}

                <Link to="/LogFitness">
                    <button className="next-button">Next</button>
                </Link>
            </div>
        </div>
    );
};

export default MyPlan;
