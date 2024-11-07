import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from "@mui/material/Card"
import { Card, CardHeader, CardContent, AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format, parseISO } from 'date-fns';

import Header from '../component/Header.jsx';

import apiInstance from '../../utils/axios';
import useUserData from '../../plugin/useUserData';
import Toast from '../../plugin/Toast.js'
import './WorkoutAnalysis.css';



const WorkoutAnalysis = () => {
    const [strengthData, setStrengthData] = useState([]);
    const [cardioData, setCardioData] = useState([]);

    const userId = useUserData()?.user_id;

//retrieves the current user's ID to personalize data requests.
    const fetchDashboardData = async () => {
        try {
            const strengthData_resp = await apiInstance.get(`dashboard/strength/${userId}/`);
            setStrengthData(strengthData_resp.data);
            console.log(strengthData_resp.data);
    
            const cardioData_resp = await apiInstance.get(`dashboard/cardio/${userId}/`);
            setCardioData(cardioData_resp.data);
            console.log(cardioData_resp.data);
        } catch (error) {
            Toast("error", "Error fetching dashboard data");
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <>
            <Header />
            <div className="workout-analysis">
                <h2>Workout Analysis</h2>
                <div>
                    <h3>Sets</h3>
                    <Card>
                        <CardHeader>Total Volume Over Time</CardHeader>
                        <CardContent>
                            <ResponsiveContainer width='100%' height={300}>
                                <AreaChart data={strengthData} margin={{top: 10, right: 30, left: 0, bottom: 0,}} >
                                <defs>
                                    <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                                        <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                                        <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                    <Area type='natural' dataKey='total_volume_load' stroke='#8884d8' fill='url(#color)' />
                                    <XAxis dataKey='date' axisLine={false} tickFormatter={str => {const date = parseISO(str); if (date.getDate() % 1 === 0) { return format(date, 'MMM d'); } return ""; }} />
                                    <YAxis dataKey='total_volume_load' axisLine={false} tickLine={false} />
                                    <Tooltip/>
                                    <CartesianGrid opacity={0.5} vertical={false} />
                                </AreaChart>
                                {/* <AreaChart data={strengthData}>
                                    <Area dataKey='reps' />
                                </AreaChart>
                                <AreaChart data={strengthData}>
                                    <Area dataKey='weight' />
                                </AreaChart> */}
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                        <CardContent>

                        </CardContent>
                    
                </div>
                {/* <div className="cardio-box">
                    <h3>Cardio Exercise</h3>
                    <ResponsiveContainer width='100%' height={400}>
                        <AreaChart data={cardioData}>
                            <Area dataKey='steps' />
                        </AreaChart>
                    </ResponsiveContainer>
                </div> */}
            </div>
        </>
    )
}

export default WorkoutAnalysis;
