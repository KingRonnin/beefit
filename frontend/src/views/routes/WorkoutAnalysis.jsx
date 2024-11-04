import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import apiInstance from '../../utils/axios';
import useUserData from '../../plugin/useUserData';
import Toast from '../../plugin/Toast.js'
import Swal from 'sweetalert2';

const colors = ["#8884d8", "#82ca9d", "#ffc658"]; // Colors for the pie chart

const WorkoutLogPage = () => {
    const [strengthData, setStrengthData] = useState([]);
    const [cardioData, setCardioData] = useState([]);

    const userId = useUserData()?.user_id;

    const fetchDashboardData = async () => {
        try {
            const strengthData_resp = await apiInstance.get(`dashboard/strength/${userId}/`);
            setStrengthData(strengthData_resp.data);
    
            const cardioData_resp = await apiInstance.get(`dashboard/strength/${userId}/`);
            setCardioData(cardioData_resp.data);
        } catch (error) {
            Toast("error", "Error fetching dashboard data");
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    
}

// const WorkoutAnalysis = ({ data, weightData, macroData }) => {
//     if (data.length === 0) return <p>No workouts logged yet.</p>;

//     // Calculate total and average calories burned
//     const totalCalories = data.reduce((sum, workout) => sum + workout.caloriesBurned, 0);
//     const averageCalories = (totalCalories / data.length).toFixed(1);

//     // Prepare data for the bar chart (Calories)
//     const calorieChartData = data.map((workout) => ({
//         name: workout.date,
//         Calories: workout.caloriesBurned,
//     }));

//     // Prepare data for the line chart (Workout Duration)
//     const durationChartData = data.map((workout) => ({
//         name: workout.date,
//         Duration: workout.duration,
//     }));

//     return (
//         <div className="workout-analysis">
//             <h2>Workout Analysis</h2>
//             <p><strong>Total Calories Burned:</strong> {totalCalories} kcal</p>
//             <p><strong>Average Calories per Workout:</strong> {averageCalories} kcal</p>

//             {/* Calories Bar Chart */}
//             <h3>Calories Burned per Workout</h3>
//             <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={calorieChartData}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="Calories" fill="#8884d8" />
//                 </BarChart>
//             </ResponsiveContainer>

//             {/* Workout Duration Line Chart */}
//             <h3>Workout Duration per Session</h3>
//             <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={durationChartData}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="Duration" stroke="#82ca9d" name="Duration (min)" />
//                 </LineChart>
//             </ResponsiveContainer>

//             {/* Weight Progression Line Chart */}
//             {weightData && weightData.length > 0 && (
//                 <>
//                     <h3>Weight Progression</h3>
//                     <ResponsiveContainer width="100%" height={300}>
//                         <LineChart data={weightData}>
//                             <XAxis dataKey="date" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Line type="monotone" dataKey="weight" stroke="#ffc658" name="Weight (kg)" />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </>
//             )}

//             {/* Macronutrient Pie Chart */}
//             {macroData && macroData.length > 0 && (
//                 <>
//                     <h3>Macronutrient Breakdown</h3>
//                     <ResponsiveContainer width="100%" height={300}>
//                         <PieChart>
//                             <Pie
//                                 data={macroData}
//                                 dataKey="value"
//                                 nameKey="name"
//                                 cx="50%"
//                                 cy="50%"
//                                 outerRadius={100}
//                                 fill="#8884d8"
//                                 label
//                             >
//                                 {macroData.map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//                                 ))}
//                             </Pie>
//                             <Tooltip />
//                             <Legend />
//                         </PieChart>
//                     </ResponsiveContainer>
//                 </>
//             )}
//         </div>
//     );
// };

// export default WorkoutAnalysis;
