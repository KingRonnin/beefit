import React, { useState, useEffect } from 'react';
import { Marker, useMap, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

import positionIcon from '../../images/position-marker.png';

const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const map = useMap();
    const positionMarker = new Icon ({
        iconUrl: positionIcon,
        iconSize: [60, 60], // Size of the icon
        iconAnchor: [30, 60], // Center-bottom of the icon
        popupAnchor: [0, -50], // Adjust popup position
    })

    useEffect(() => {
        map.locate().on('locationfound', function (e) {
            setPosition(e.latlng);
            console.log(position)
            map.flyTo(e.latlng, map.getZoom());
        });
    }, []);

    return position === null ? null : (
        <Marker position={position} icon={positionMarker}>
            <Popup >You are here</Popup>
        </Marker>
    );
}

export default LocationMarker;