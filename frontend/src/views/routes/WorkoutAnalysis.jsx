const WorkoutAnalysis = ({ data }) => {
    if (data.length === 0) return <p>No workouts logged yet.</p>;

    const totalCalories = data.reduce((sum, workout) => sum + workout.caloriesBurned, 0);
    const averageCalories = totalCalories / data.length;

    const chartData = data.map((workout, index) => ({
        name: workout.date,
        Calories: workout.caloriesBurned,
    }));

    return (
        <div className="workout-analysis">
            <h2>Workout Analysis</h2>
            <p>Total Calories Burned: {totalCalories}</p>
            <p>Average Calories per Workout: {averageCalories.toFixed(1)}</p>

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
