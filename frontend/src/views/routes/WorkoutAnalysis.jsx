import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography, Grid2, Box } from "@mui/material";
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
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const getLatestData = (data) => {
        if (data.length === 0) {
            return null;
        }

        let latest = data[0];
        for (let i = 1; i < data.length; i++) {
            if (new Date(data[i].date) > new Date(latest.date)) {
            latest = data[i];
            }
        }
        return latest;
    };

    const latestStrengthData = getLatestData(strengthData);

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
    };

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
    };

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
        };
    };

    return (
        <>
            <div className="cover-in-transparent-white">
                <Header />
                <div className="workout-analysis">
                    <Box sx={{ marginTop: "64px", padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                        <Typography variant='h4' gutterBottom>
                            Workout Performance Dashboard
                        </Typography>
                        <Grid2 container spacing={3}>
                            <Grid2 xs={12} md={4}>
                                <Card className='total_volume_kpi'>
                                    <CardHeader title='Total Volume (Load)' />
                                    <CardContent>
                                        <Typography variant='h4' display="flex" justifyContent='center'>
                                            {latestStrengthData?.total_volume_load}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid2>
                            <Grid2 xs={12} md={4}>
                                <Card className='average_workload_per_rep_kpi'>
                                    <CardHeader title='Average Workload per Rep' />
                                    <CardContent>
                                        <Typography variant='h4' display="flex" justifyContent='center'>
                                            {latestStrengthData?.average_workload_per_rep}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid2>
                            <Grid2 xs={12} md={4}>
                                <Card className='max_weight_kpi'>
                                    <CardHeader title='Max Weight' />
                                    <CardContent>
                                        <Typography variant='h4' display="flex" justifyContent='center'>
                                            {latestStrengthData?.max_weight} lb
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        </Grid2>
                        <Grid2 container spacing={2} sx={{ marginTop: "30px" }}>
                            <Grid2 size={6.99}>
                                <Card className='total_volume_chart'>
                                    <CardHeader title='Total Volume Over Time' subheader={`Sets * Reps * Weight = Volume`} />
                                    <CardContent>
                                        <ResponsiveContainer width='100%' height={400}>
                                            <AreaChart data={strengthData} margin={{top: 10, right: 30, left: 0, bottom: 0,}} >
                                            <defs>
                                                <linearGradient id='color1' x1='0' y1='0' x2='0' y2='1'>
                                                    <stop offset='5%' stopColor='#8884d8' stopOpacity={1} />
                                                    <stop offset='95%' stopColor='#84aad8' stopOpacity={0.5} />
                                                </linearGradient>
                                            </defs>
                                                <Area type='step' dataKey='total_volume_load' stroke='#8884d8' fill='url(#color1)' />
                                                <XAxis type='category' dataKey='date' axisLine={false} tickFormatter={str => {const date = parseISO(str); if (date.getDate() % 1 === 0) { return format(date, 'MMM d'); }; }} padding={{ left: 25 }} domain={['auto', 'auto']} />
                                                <YAxis dataKey='total_volume_load' label={{ value: 'Total Volume', position: 'insideLeft', angle: -90, style: { fontSize: 12 } }} tickFormatter={number => `${(number / volume_divisor)}`} axisLine={false} tickLine={false} />
                                                <Tooltip content={CustomTooltip}/>
                                                <CartesianGrid stroke='#666666' opacity={0.5} vertical={false} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </Grid2>
                            <Grid2 size={4.99}>
                                <Card className='average_workload_per_rep_chart'>
                                    <CardHeader title='Average Workload per Rep Over Time' subheader={`Total Volume / Rep = Average Workload per Rep`} />
                                    <CardContent>
                                        <ResponsiveContainer width='100%' height={400}>
                                            <AreaChart data={strengthData} margin={{top: 10, right: 30, left: 0, bottom: 0,}} >
                                            <defs>
                                                <linearGradient id='color2' x1='0' y1='0' x2='0' y2='1'>
                                                    <stop offset='5%' stopColor='#b284d8' stopOpacity={1} />
                                                    <stop offset='95%' stopColor='#8884d8' stopOpacity={0.5} />
                                                </linearGradient>
                                            </defs>
                                                <Area type='step' dataKey='average_workload_per_rep' stroke='#b284d8' fill='url(#color2)' />
                                                <XAxis type='category' dataKey='date' axisLine={false} tickFormatter={str => {const date = parseISO(str); if (date.getDate() % 1 === 0) { return format(date, 'MMM d'); }; }} padding={{ left: 25 }} domain={['auto', 'auto']} />
                                                <YAxis dataKey='average_workload_per_rep' label={{ value: 'Average Workload', position: 'insideLeft', angle: -90, style: { fontSize: 12 } }} tickFormatter={number => `${(number / 100000)}`} axisLine={false} tickLine={false} />
                                                <Tooltip content={CustomTooltip}/>
                                                <CartesianGrid stroke='#666666' opacity={0.3} vertical={false} />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        </Grid2>
                        <Card sx={{ marginTop: "30px" }}>
                            <CardContent>
                                <Typography variant='body2' gutterBottom margin={{ top: 20}}>
                                    <b>Total Volume (Load)</b> refers to the overall amount of work performed during a workout or exercise program.
                                </Typography>
                                <Typography variant='body2' gutterBottom>
                                    <b>Average Workload per Rep</b> refers to the overall intensity or difficulty of an exercise. Primary focused on the number of reps (volume) or weight lifted (intensity). In the case of the dashboard in-front, we are using volume, which is calculated from the multipliers of the numbers; sets, reps, and weight lifted.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default WorkoutAnalysis;
