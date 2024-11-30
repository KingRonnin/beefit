import React, { useState, useEffect, useRef } from 'react';
import { Marker, useMapEvents, useMap, MapContainer, TileLayer, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Box, Button, Card, CardHeader, CardContent, Typography, Grid2 } from '@mui/material';

import Header from '../component/Header.jsx';
import LocationMarker from '../component/LocationMarker.jsx';

import apiInstance from '../../utils/axios';
import useUserData from '../../plugin/useUserData';
import Toast from '../../plugin/Toast.js';

import './GymLocations.css';
import 'leaflet/dist/leaflet.css';

import markerIcon from '../../images/marker.png';

const GymLocations = () => {
    const [gymLocationData, setGymLocationData] = useState([]);
    const [position, setPosition] = useState(null);
    const marker = new Icon ({
        iconUrl: markerIcon,
        iconSize: [60, 60], // Size of the icon
        iconAnchor: [30, 60], // Center-bottom of the icon
        popupAnchor: [0, -50], // Adjust popup position
    })

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
            <div className='cover-in-transparent-white'>
            <Header />
                <div className='gym-location'>
                    <Box sx={{ marginTop: "64px", padding: "20px", backgroundColor: "#f5f5f5", minHeight: "88vh" }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant='h4' gutterBottom>
                                Nearby Gyms
                            </Typography>
                        </Box>
                        <Grid2 container spacing={2}>
                            <Grid2 xs={12} md={4}>
                                <Card>
                                    <CardContent>
                                        <MapContainer center={[51.049999, -114.066666]} zoom={13} scrollWheelZoom={true}>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <LocationMarker />
                                            {gymLocationData.map((item) => (
                                                <Marker key={item.id} position={[item.latitude, item.longitude]} icon={marker}>
                                                    <Popup>
                                                        <b> {item.facility} </b>
                                                        <a href={`${item.linksAttached}`}> {item.address} </a>
                                                    </Popup>
                                                </Marker>
                                            ))}
                                        </MapContainer>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        </Grid2>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default GymLocations;
