import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography, Grid2, Box, Button } from "@mui/material";
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
    const [show, setShow] = useState(true);

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

    const passedKPIData = show ? getLatestData(strengthData) : getLatestData(cardioData);
    const passedTimeSeriesData = show ? strengthData : cardioData;

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

    const PrimaryCustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className='tooltip'>
                    <h4>{format(parseISO(label), "eee, MMM d, yyyy")}</h4>
                    <p>
                        {data.total_volume_load
                            ? `Total Volume: ${data.total_volume_load.toLocaleString('en-US')}`
                            : data.average_workload_per_rep
                            ? `Avg Workload per Rep: ${data.average_workload_per_rep.toLocaleString('en-US')}`
                            : data.total_steps
                            ? `Total Steps: ${data.total_steps.toLocaleString('en-US')}`
                            : data.steps_per_minute
                            ? `Steps per Minute: ${data.steps_per_minute.toLocaleString('en-US')}`
                            : 'No data available'
                    }
                    </p>
                </div>
            );
        }
        return null;
    };

    const SecondaryCustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className='tooltip'>
                    <h4>{format(parseISO(label), "eee, MMM d, yyyy")}</h4>
                    <p>
                        {data.average_workload_per_rep
                            ? `Avg Workload per Rep: ${data.average_workload_per_rep.toLocaleString('en-US')}`
                            : data.steps_per_minute
                            ? `Steps per Minute: ${data.steps_per_minute.toLocaleString('en-US')}`
                            : 'No data available'
                    }
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <div className="cover-in-transparent-white">
                <Header />
                <div className="workout-analysis">
                    <Box sx={{ marginTop: "64px", padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant='h4' gutterBottom>
                                Workout Performance Dashboard
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => setShow(!show)}>
                                Switch to { show ? 'Cardio' : 'Strength'}
                            </Button>
                        </Box>
                        {/* kpis */}
                        <Grid2 container spacing={3}>
                            {show ? (
                                <>
                                    <Grid2 xs={12} md={4}>
                                        <Card className='total_volume_kpi'>
                                            <CardHeader title='Total Volume (Load)' />
                                            <CardContent>
                                                <Typography variant='h4' display="flex" justifyContent='center'>
                                                    {passedKPIData?.total_volume_load}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                    <Grid2 xs={12} md={4}>
                                        <Card className='average_workload_per_rep_kpi'>
                                            <CardHeader title='Average Workload per Rep' />
                                            <CardContent>
                                                <Typography variant='h4' display="flex" justifyContent='center'>
                                                    {passedKPIData?.average_workload_per_rep}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                    <Grid2 xs={12} md={4}>
                                        <Card className='max_weight_kpi'>
                                            <CardHeader title='Max Weight' />
                                            <CardContent>
                                                <Typography variant='h4' display="flex" justifyContent='center'>
                                                    {passedKPIData?.max_weight} lb
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                </>
                            ) : (
                                <>
                                    <Grid2 xs={12} md={4}>
                                        <Card className='total_steps_kpi'>
                                            <CardHeader title='Total Steps' />
                                            <CardContent>
                                                <Typography variant='h4' display="flex" justifyContent='center'>
                                                    {passedKPIData?.total_steps}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                    <Grid2 xs={12} md={4}>
                                        <Card className='average_steps_per_minute_kpi'>
                                            <CardHeader title='Average Steps per Minute' />
                                            <CardContent>
                                                <Typography variant='h4' display="flex" justifyContent='center'>
                                                    {passedKPIData?.steps_per_minute}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                    <Grid2 xs={12} md={4}>
                                        <Card className='duration_kpi'>
                                            <CardHeader title='Duration' />
                                            <CardContent>
                                                <Typography variant='h4' display="flex" justifyContent='center'>
                                                    {passedKPIData?.duration} min
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                </>
                            )}
                        </Grid2>
                        {/* charts */}
                        <Grid2 container spacing={2} sx={{ marginTop: "30px" }}>
                            {show ? (
                                <>
                                    <Grid2 size={6.99}>
                                        <Card className='total_volume_chart'>
                                            <CardHeader title='Total Volume | Over Time' subheader={`Sets * Reps * Weight = Volume`} />
                                            <CardContent>
                                                <ResponsiveContainer width='100%' height={400}>
                                                    <AreaChart data={passedTimeSeriesData} margin={{top: 10, right: 30, left: 0, bottom: 0,}} >
                                                    <defs>
                                                        <linearGradient id='color1' x1='0' y1='0' x2='0' y2='1'>
                                                            <stop offset='5%' stopColor='#504ac6' stopOpacity={1} />
                                                            <stop offset='95%' stopColor='#c0c64a' stopOpacity={0.5} />
                                                        </linearGradient>
                                                    </defs>
                                                        <Area type='step' dataKey='total_volume_load' stroke='#504ac6' fill='url(#color1)' />
                                                        <XAxis type='category' dataKey='date' axisLine={false} tickFormatter={str => {const date = parseISO(str); if (date.getDate() % 1 === 0) { return format(date, 'MMM d'); }; }} padding={{ left: 25 }} domain={['auto', 'auto']} />
                                                        <YAxis dataKey='total_volume_load' label={{ value: 'Total Volume', position: 'insideLeft', angle: -90, style: { fontSize: 12 } }} tickFormatter={number => `${(number / volume_divisor)}`} axisLine={false} tickLine={false} />
                                                        <Tooltip content={PrimaryCustomTooltip}/>
                                                        <CartesianGrid stroke='#666666' opacity={0.3} vertical={false} />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                    <Grid2 size={4.99}>
                                        <Card className='average_workload_per_rep_chart'>
                                            <CardHeader title='Workload per Rep | Over Time' subheader={`Total Volume / Rep = Average Workload per Rep`} />
                                            <CardContent>
                                                <ResponsiveContainer width='100%' height={400}>
                                                    <AreaChart data={passedTimeSeriesData} margin={{top: 10, right: 30, left: 0, bottom: 0,}} >
                                                    <defs>
                                                        <linearGradient id='color2' x1='0' y1='0' x2='0' y2='1'>
                                                            <stop offset='5%' stopColor='#c6504a' stopOpacity={1} />
                                                            <stop offset='95%' stopColor='#4ac0c6' stopOpacity={0.5} />
                                                        </linearGradient>
                                                    </defs>
                                                        <Area type='step' dataKey='average_workload_per_rep' stroke='#c6504a' fill='url(#color2)' />
                                                        <XAxis type='category' dataKey='date' axisLine={false} tickFormatter={str => {const date = parseISO(str); if (date.getDate() % 1 === 0) { return format(date, 'MMM d'); }; }} padding={{ left: 25 }} domain={['auto', 'auto']} />
                                                        <YAxis dataKey='average_workload_per_rep' label={{ value: 'Workload per Rep', position: 'insideLeft', angle: -90, style: { fontSize: 12 } }} tickFormatter={number => `${(number / 100000)}`} axisLine={false} tickLine={false} />
                                                        <Tooltip content={SecondaryCustomTooltip}/>
                                                        <CartesianGrid stroke='#666666' opacity={0.3} vertical={false} />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                </>
                            ) : (
                                <>
                                    <Grid2 size={6.99}>
                                        <Card className='total_steps_chart'>
                                            <CardHeader title='Total Steps | Over Time' sx={{ marginBottom: "24px" }} />
                                            <CardContent>
                                                <ResponsiveContainer width='100%' height={400}>
                                                    <AreaChart data={passedTimeSeriesData} margin={{top: 10, right: 30, left: 0, bottom: 0,}} >
                                                    <defs>
                                                        <linearGradient id='color1' x1='0' y1='0' x2='0' y2='1'>
                                                            <stop offset='5%' stopColor='#c6504a' stopOpacity={1} />
                                                            <stop offset='95%' stopColor='#4ac0c6' stopOpacity={0.5} />
                                                        </linearGradient>
                                                    </defs>
                                                        <Area type='step' dataKey='total_steps' stroke='#c6504a' fill='url(#color1)' />
                                                        <XAxis type='category' dataKey='date' axisLine={false} tickFormatter={str => {const date = parseISO(str); if (date.getDate() % 1 === 0) { return format(date, 'MMM d'); }; }} padding={{ left: 25 }} domain={['auto', 'auto']} />
                                                        <YAxis dataKey='total_steps' label={{ value: 'Total Steps', position: 'insideLeft', angle: -90, style: { fontSize: 12 } }} axisLine={false} tickLine={false} />
                                                        <Tooltip content={PrimaryCustomTooltip}/>
                                                        <CartesianGrid stroke='#666666' opacity={0.3} vertical={false} />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                    <Grid2 size={4.99}>
                                        <Card className='average_steps_per_minute_chart'>
                                            <CardHeader title='Steps per Minute | Over Time' subheader={`Total Steps / Minute = Average Steps per Minute`} />
                                            <CardContent>
                                                <ResponsiveContainer width='100%' height={400}>
                                                    <AreaChart data={passedTimeSeriesData} margin={{top: 10, right: 30, left: 0, bottom: 0,}} >
                                                    <defs>
                                                        <linearGradient id='color2' x1='0' y1='0' x2='0' y2='1'>
                                                            <stop offset='5%' stopColor='#c68e4a' stopOpacity={1} />
                                                            <stop offset='95%' stopColor='#4a82c6' stopOpacity={0.5} />
                                                        </linearGradient>
                                                    </defs>
                                                        <Area type='step' dataKey='steps_per_minute' stroke='#c68e4a' fill='url(#color2)' />
                                                        <XAxis type='category' dataKey='date' axisLine={false} tickFormatter={str => {const date = parseISO(str); if (date.getDate() % 1 === 0) { return format(date, 'MMM d'); }; }} padding={{ left: 25 }} domain={['auto', 'auto']} />
                                                        <YAxis dataKey='steps_per_minute' label={{ value: 'Steps per Minute', position: 'insideLeft', angle: -90, style: { fontSize: 12 } }} axisLine={false} tickLine={false} />
                                                        <Tooltip content={SecondaryCustomTooltip}/>
                                                        <CartesianGrid stroke='#666666' opacity={0.3} vertical={false} />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                </>
                            )}
                        </Grid2>
                        <Card sx={{ marginTop: "30px" }}>
                            <CardContent>
                                <Typography variant='body2' gutterBottom margin={{ top: 20}}>
                                    <b>Steps per Minute (SPM)</b> refers to the number of steps taken by an individual in a minute, primarily for quantifying physical activities that require the lower part of the body to move around. Useful for tracking and evaluating the intensity and duration of various activities, such as walking, jogging, running, climbing, and jumping.
                                </Typography>
                                <Typography variant='body2' gutterBottom margin={{ top: 20}}>
                                    <b>Total Steps (SPM)</b> refers to the cumulative number of steps taken during a workout or a day, regardless of the intensity or type of exercise.
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