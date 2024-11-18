import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from "@mui/material";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
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
    //optional chaining operator to avoid error if user_id is undefined
    //Fetches workout data specific to the user.
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
        };


    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const maxVolumeLoad = Math.max(...strengthData.map(item => item.total_volume_load));
    const maxAverageWorkload = Math.max(...strengthData.map(item => item.average_workload_per_rep));

    let volume_divisor = 1;
    let workload_divisor = 1;

    if (maxVolumeLoad >= 10000000) {
        volume_divisor = 10000000;
    } else if (maxVolumeLoad >= 1000000) {
        volume_divisor = 1000000;
    } else if (maxVolumeLoad >= 100000) {
        volume_divisor = 100000;
    } else if (maxVolumeLoad >=  1000) {
        volume_divisor = 1000;
    } else {
        volume_divisor = 1;
    }

    if (maxAverageWorkload >= 10000000) {
        workload_divisor = 10000000;
    } else if (maxAverageWorkload >= 1000000) {
        workload_divisor = 1000000;
    } else if (maxAverageWorkload >= 100000) {
        workload_divisor = 100000;
    } else if (maxAverageWorkload >= 1000) {
        workload_divisor = 1000;
    } else {
        workload_divisor = 1;
    }

    const CustomTooltip = ({active, payload, label}) => {
        if (active) {
            return (
                <>
                    <div className='tooltip'>
                        <h4>{format(parseISO(label), "eee, MMM d, yyyy")}</h4>
                        <p>
                            {payload[0].value.toLocaleString('en-US')}
                        </p>
                    </div>
                </>
            )
        }
    };

    return (
        <>
            <div className="cover-in-transparent-white">
                <Header />
                    <div className="workout-analysis">
                        <div className="chart-container">
                            <Card className='total_volume_chart'>
                                <CardHeader title='Total Volume Over Time' subheader={`Sets * Reps * Weight = Volume, * ${volume_divisor.toLocaleString('en-US')}`} />
                                <CardContent>
                                    <ResponsiveContainer width='100%' height={400}>
                                        <AreaChart data={strengthData} margin={{top: 10, right: 30, left: 0, bottom: 0,}} >
                                        <defs>
                                            <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                                                <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                                                <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                            <Area type='step' dataKey='total_volume_load' stroke='#8884d8' fill='url(#color)' />
                                            <XAxis type='category' dataKey='date' axisLine={false} tickFormatter={str => {const date = parseISO(str); if (date.getDate() % 1 === 0) { return format(date, 'MMM d'); }; }} padding={{ left: 25 }} domain={['auto', 'auto']} />
                                            <YAxis dataKey='total_volume_load' label={{ value: 'Total Volume', position: 'insideLeft', angle: -90, style: { fontSize: 12 } }} tickFormatter={number => `${(number / volume_divisor)}`} axisLine={false} tickLine={false} />
                                            <Tooltip content={CustomTooltip}/>
                                            <CartesianGrid opacity={0.5} vertical={false} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                            <Card className='average_workload_per_rep_chart'>
                                <CardHeader title='Average Workload per Rep Over Time' subheader={`Total Volume / Rep = Average Workload per Rep * ${maxAverageWorkload.toLocaleString('en-US')}`} />
                                <CardContent>
                                    <ResponsiveContainer width='100%' height={400}>
                                        <AreaChart data={strengthData} margin={{top: 10, right: 30, left: 0, bottom: 0,}} >
                                        <defs>
                                            <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                                                <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                                                <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                            <Area type='step' dataKey='average_workload_per_rep' stroke='#8884d8' fill='url(#color)' />
                                            <XAxis type='category' dataKey='date' axisLine={false} tickFormatter={str => {const date = parseISO(str); if (date.getDate() % 1 === 0) { return format(date, 'MMM d'); }; }} padding={{ left: 25 }} domain={['auto', 'auto']} />
                                            <YAxis dataKey='average_workload_per_rep' label={{ value: 'Average Workload', position: 'insideLeft', angle: -90, style: { fontSize: 12 } }} tickFormatter={number => `${(number / 100000)}`} axisLine={false} tickLine={false} />
                                            <Tooltip content={CustomTooltip}/>
                                            <CartesianGrid opacity={0.5} vertical={false} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default WorkoutAnalysis;
