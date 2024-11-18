import React from 'react';
import './Equipment.css'; // Create a CSS file for styling

const EquipmentPage = () => {
    // Sample equipment data
    const equipmentList = [
        {
            id: 1,
            name: 'Nordictrack X16 Treadmill',
            description: 'Treadmill Exercise Equipment',
            price: '$4,799.00',
            image: '/images/treadmill.jpg', // Replace with the correct image path
            rating: 5,
        },
        {
            id: 2,
            name: 'Nordictrack R35 Bike',
            description: 'Exercise Bike',
            price: '$1,949.00',
            image: '/images/bike.jpg', // Replace with the correct image path
            rating: 4,
        },
        {
            id: 3,
            name: 'Nordictrack RW600 Rower',
            description: 'Rower Equipment',
            price: '$1,399.00',
            image: '/images/rower.jpg', // Replace with the correct image path
            rating: 4.5,
        },
        // Add more equipment items here
    ];

    return (
        <div className="equipment-page">
            <div className="filters">
                <h3>Filters</h3>
                <div>
                    <h4>Price</h4>
                    <ul>
                        <li>Up to $60</li>
                        <li>$60 - $140</li>
                        <li>$140 - $350</li>
                        <li>$350 - $1,300</li>
                        <li>Over $1,300</li>
                    </ul>
                </div>
                <div>
                    <h4>Material</h4>
                    <ul>
                        <li>Steel</li>
                        <li>Metal</li>
                    </ul>
                </div>
                <div>
                    <h4>Seller</h4>
                    <ul>
                        <li>NordicTrack Canada</li>
                        <li>The Treadmill Factory</li>
                        <li>Amazon CA</li>
                    </ul>
                </div>
            </div>
            <div className="equipment-grid">
                {equipmentList.map((item) => (
                    <div key={item.id} className="equipment-card">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="equipment-image"
                        />
                        <div className="equipment-info">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p className="price">{item.price}</p>
                            <button className="add-to-cart-button">Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EquipmentPage;
