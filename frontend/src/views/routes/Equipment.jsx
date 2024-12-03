import React, { useState } from 'react';
import './Equipment.css'; // Create a CSS file for styling

import Header from '../component/Header.jsx';

import treadmill_1 from '../../images/treadmill_1.jpg';
import bike_1 from '../../images/bike_1.png';
import rowing_1 from '../../images/rower_1.jpg';
import treadmill_2 from '../../images/treadmill_2.jpg';
import bike_2 from '../../images/bike_2.jpg';
import rowing_2 from '../../images/rower_2.jpg';
import treadmill_3 from '../../images/treadmill_3.jpg'
import bike_3 from '../../images/bike_3.jpg';
import rowing_3 from '../../images/rower_3.jpg';
import treadmill_4 from '../../images/treadmill_4.jpg';
import bike_4 from '../../images/bike_4.jpg';
import rowing_4 from '../../images/rowing_4.jpg';

const EquipmentPage = () => {
    // Sample equipment data
    const equipmentList = [
        {
            id: 1,
            name: 'Nordictrack X16 Treadmill',
            description: 'Treadmill Exercise Equipment',
            price: 4799,
            material: 'Metal',
            seller: 'NordicTrack Canada',
            image: treadmill_1,
            rating: 5,
        },
        {
            id: 2,
            name: 'Nordictrack R35 Bike',
            description: 'Exercise Bike',
            price: 1949,
            material: 'Metal',
            seller: 'Amazon CA',
            image: bike_1,
            rating: 4,
        },
        {
            id: 3,
            name: 'Nordictrack RW600 Rower',
            description: 'Rower Equipment',
            price: 1399,
            material: 'Steel',
            seller: 'The Treadmill Factory',
            image: rowing_1,
            rating: 4.5,
        },
        {
            id: 4,
            name: 'ProForm X10 Treadmill',
            description: 'High-performance treadmill',
            price: 3299,
            material: 'Alloy Steel',
            seller: 'ProForm Canada',
            image: treadmill_2,
            rating: 4.8,
        },
        {
            id: 5,
            name: 'Peloton Inspire Spin Bike',
            description: 'Interactive stationary bike',
            price: 2599,
            material: 'Carbon Steel',
            seller: 'Peloton Online',
            image: bike_2,
            rating: 4,
        },
        {
            id: 6,
            name: 'Concept2 Model D Rower',
            description: 'Ergonomic rower',
            price: 1299,
            material: 'Aluminum',
            seller: 'Fitness Depot',
            image: rowing_2,
            rating: 4.5,
        },
        {
            id: 7,
            name: 'NordicTrack 7.8AT Treadmill',
            description: 'High-speed treadmill',
            price: 3299,
            material: 'Carbon Steel',
            seller: 'NordicTrack Canada',
            image: treadmill_3,
            rating: 4.6,
        },
        {
            id: 8,
            name: 'Echelon Smart Connect EX5 Bike',
            description: 'Compact exercise bike',
            price: 1499,
            material: 'Metal',
            seller: 'Amazon CA',
            image: bike_3,
            rating: 4.2,
        },
        {
            id: 9,
            name: 'WaterRower Natural Rower',
            description: 'Stylish oak rower',
            price: 1249,
            material: 'Aluminum',
            seller: 'The Treadmill Factory',
            image: rowing_3,
            rating: 4.8,
        },
        {
            id: 10,
            name: 'NordicTrack T618 Treadmill',
            description: 'Feature-rich treadmill',
            price: 1799,
            material: 'Carbon Steel',
            seller: 'NordicTrack Canada',
            image: treadmill_4,
            rating: 4.4,
        },
        {
            id: 11,
            name: 'Peloton SF-B1805 Bike',
            description: 'Sturdy spin bike',
            price: 899,
            material: 'Metal',
            seller: 'Peloton Online',
            image: bike_4,
            rating: 4.0,
        },
        {
            id: 12,
            name: 'Stamina BodyTrac Glider 1050',
            description: 'Compact rowing machine',
            price: 549,
            material: 'Aluminum Steel',
            seller: 'The Treadmill Factory',
            image: rowing_4,
            rating: 3.8,
        },
        // Add more equipment here
    ];

    const [filteredEquipment, setFilteredEquipment] = useState(equipmentList);

    // Filter handlers
    const filterByPrice = (range) => {
        let filtered = [];
        if (range === 'low') {
            filtered = equipmentList.filter((item) => item.price <= 1000);
        } else if (range === 'medium') {
            filtered = equipmentList.filter((item) => item.price > 1000 && item.price <= 1300);
        } else if (range === 'high') {
            filtered = equipmentList.filter((item) => item.price > 1300 && item.price <= 1700);
        } else if (range === 'premium') {
            filtered = equipmentList.filter((item) => item.price > 1700 && item.price <= 2000);
        } else if (range === 'luxury') {
            filtered = equipmentList.filter((item) => item.price > 2000);
        }
        setFilteredEquipment(filtered);
    };

    const filterByMaterial = (material) => {
        setFilteredEquipment(
            equipmentList.filter((item) => item.material === material)
        );
    };

    const filterBySeller = (seller) => {
        setFilteredEquipment(
            equipmentList.filter((item) => item.seller === seller)
        );
    };

    const resetFilters = () => {
        setFilteredEquipment(equipmentList);
    };

    return (
        <>
        <Header />
        <div className="equipment-page">
            <div className="filters">
                <h3>Filters</h3>
                <button onClick={resetFilters} className="reset-filters">
                    Reset Filters
                </button>
                <div>
                    <h4>Price</h4>
                    <ul>
                        <li onClick={() => filterByPrice('low')}>Up to $1,000</li>
                        <li onClick={() => filterByPrice('medium')}>$1,000 - $1,300</li>
                        <li onClick={() => filterByPrice('high')}>$1,300 - $1,700</li>
                        <li onClick={() => filterByPrice('premium')}>$1,700 - $2,000</li>
                        <li onClick={() => filterByPrice('luxury')}>Over $2,000</li>
                    </ul>
                </div>
                <div>
                    <h4>Material</h4>
                    <ul>
                        <li onClick={() => filterByMaterial('Steel')}>Steel</li>
                        <li onClick={() => filterByMaterial('Metal')}>Metal</li>
                        <li onClick={() => filterByMaterial('Aluminum')}>
                            Aluminum
                        </li>
                        <li onClick={() => filterByMaterial('Carbon Steel')}>
                            Carbon Steel
                        </li>
                        <li onClick={() => filterByMaterial('Alloy Steel')}>
                            Alloy Steel
                        </li>
                    </ul>
                </div>
                <div>
                    <h4>Seller</h4>
                    <ul>
                        <li onClick={() => filterBySeller('NordicTrack Canada')}>
                            NordicTrack Canada
                        </li>
                        <li onClick={() => filterBySeller('The Treadmill Factory')}>
                            The Treadmill Factory
                        </li>
                        <li onClick={() => filterBySeller('Amazon CA')}>Amazon CA</li>
                        <li onClick={() => filterBySeller('Fitness Depot')}>
                            Fitness Depot
                        </li>
                        <li onClick={() => filterBySeller('Peloton Online')}>
                            Peloton Online
                        </li>
                        <li onClick={() => filterBySeller('ProForm Canada')}>
                            ProForm Canada
                        </li>
                    </ul>
                </div>
            </div>
            <div className="equipment-grid">
                {filteredEquipment.length > 0 ? (
                    filteredEquipment.map((item) => (
                        <div key={item.id} className="equipment-card">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="equipment-image"
                            />
                            <div className="equipment-info">
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p className="price">${item.price}</p>
                                <button className="add-to-cart-button">Add to Cart</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No equipment matches the selected filters.</p>
                )}
            </div>
        </div>
        </>
    );
};

export default EquipmentPage;
