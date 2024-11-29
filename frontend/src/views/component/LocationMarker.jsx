import React, { useState, useEffect, useRef } from 'react';
import { Marker, useMapEvents, useMap, MapContainer, TileLayer, Popup } from 'react-leaflet';

const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMap();

    useEffect(() => {
        map.locate().on('locationfound', function (e) {
            setPosition(e.latlng);
            console.log(position)
            map.flyTo(e.latlng, map.getZoom());
        });
    }, []);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
}

export default LocationMarker;