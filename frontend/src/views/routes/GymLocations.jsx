import React, { useState, useEffect, useRef } from 'react';
import { Marker, useMapEvents, useMap, MapContainer, TileLayer, Popup } from 'react-leaflet';
import { Box, Button, Card, CardContent, Typography, Grid2 } from '@mui/material';

import Header from '../component/Header.jsx';
import LocationMarker from '../component/LocationMarker.jsx';

import apiInstance from '../../utils/axios';
import useUserData from '../../plugin/useUserData';
import Toast from '../../plugin/Toast.js';

import './GymLocations.css';
import 'leaflet/dist/leaflet.css'

const GymLocations = () => {
    const [gymLocationData, setGymLocationData] = useState([]);

    const fetchDashboardData = async () => {
        try {
            const gymData_resp = await apiInstance.get('get/gym/list/');
            setGymLocationData(gymData_resp.data);
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
            <div className='gym-location'>
                <Box sx={{ marginTop: "64px", padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                    <MapContainer center={[51.049999, -114.066666]} zoom={12} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                        {gymLocationData.map((item) => (
                            <Marker key={item.id} position={[item.latitude, item.longitude]}>
                                <Popup>
                                    <b> {item.facility} </b>
                                    <p> {item.address} </p>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                    </Box>
                </Box>
            </div>
        </>
    )
}

export default GymLocations;
