import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';


import Header from '../component/Header.jsx';

import apiInstance from '../../utils/axios';
import useUserData from '../../plugin/useUserData';
import Toast from '../../plugin/Toast.js';

const GymLocations = () => {
    const [gymData, setGymData] = useState([]);
    
    const fetchDashboardData = async () => {
        try {
            const gymData_resp = await apiInstance.get('get/gym/list/');
            setGymData(gymData_resp.data);
            console.log(gymData_resp.data);
        } catch (error) {
            Toast("error", "Error fetching dashboard data");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <>
        <Header />

        <div>
            <Typography>
                Gym Locations
            </Typography>
        </div>
        </>
    )
}

export default GymLocations;
