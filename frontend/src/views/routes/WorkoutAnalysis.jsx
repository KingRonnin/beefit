import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WorkoutAnalysis = ({ data }) => {
    if (data.length === 0) return <p>No workouts logged yet.</p>;

    // Calculate total calories and average per workout
    const totalCalories = data.reduce((sum, workout) => sum + workout.caloriesBurned, 0);
    const averageCalories = (totalCalories / data.length).toFixed(1);

    // Prepare data for the bar chart
    const chartData = data.map((workout, index) => ({
        name: workout.date,
        Calories: workout.caloriesBurned,
    }));

    return (
        <div className="workout-analysis">
            <h2>Workout Analysis</h2>
            <p><strong>Total Calories Burned:</strong> {totalCalories} kcal</p>
            <p><strong>Average Calories per Workout:</strong> {averageCalories} kcal</p>

            <h3>Calories Burned per Workout</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Calories" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WorkoutAnalysis;
