import React, { useState } from 'react';
import './EquipmentPage.css'; // Create a CSS file for styling

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
            image: '/images/treadmill.jpg',
            rating: 5,
        },
        {
            id: 2,
            name: 'Nordictrack R35 Bike',
            description: 'Exercise Bike',
            price: 1949,
            material: 'Metal',
            seller: 'Amazon CA',
            image: '/images/bike.jpg',
            rating: 4,
        },
        {
            id: 3,
            name: 'Nordictrack RW600 Rower',
            description: 'Rower Equipment',
            price: 1399,
            material: 'Steel',
            seller: 'The Treadmill Factory',
            image: '/images/rower.jpg',
            rating: 4.5,
        },
        // Add more equipment here
    ];

    const [filteredEquipment, setFilteredEquipment] = useState(equipmentList);

    // Filter handlers
    const filterByPrice = (range) => {
        let filtered = [];
        if (range === 'low') {
            filtered = equipmentList.filter((item) => item.price <= 60);
        } else if (range === 'medium') {
            filtered = equipmentList.filter((item) => item.price > 60 && item.price <= 140);
        } else if (range === 'high') {
            filtered = equipmentList.filter((item) => item.price > 140 && item.price <= 350);
        } else if (range === 'premium') {
            filtered = equipmentList.filter((item) => item.price > 350 && item.price <= 1300);
        } else if (range === 'luxury') {
            filtered = equipmentList.filter((item) => item.price > 1300);
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
        <div className="equipment-page">
            <div className="filters">
                <h3>Filters</h3>
                <button onClick={resetFilters} className="reset-filters">
                    Reset Filters
                </button>
                <div>
                    <h4>Price</h4>
                    <ul>
                        <li onClick={() => filterByPrice('low')}>Up to $60</li>
                        <li onClick={() => filterByPrice('medium')}>$60 - $140</li>
                        <li onClick={() => filterByPrice('high')}>$140 - $350</li>
                        <li onClick={() => filterByPrice('premium')}>$350 - $1,300</li>
                        <li onClick={() => filterByPrice('luxury')}>Over $1,300</li>
                    </ul>
                </div>
                <div>
                    <h4>Material</h4>
                    <ul>
                        <li onClick={() => filterByMaterial('Steel')}>Steel</li>
                        <li onClick={() => filterByMaterial('Metal')}>Metal</li>
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
    );
};

export default EquipmentPage;
