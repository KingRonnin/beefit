import React from 'react';

const EquipmentPage = () => {
    // Sample list of equipment
    const equipmentList = [
        {
            id: 1,
            name: 'Dumbbells',
            description: 'High-quality adjustable dumbbells to suit any strength level.',
            image: '/images/dumbbells.jpg', // Replace with the correct image path
        },
        {
            id: 2,
            name: 'Treadmill',
            description: 'A modern treadmill for intense cardio workouts.',
            image: '/images/treadmill.jpg', // Replace with the correct image path
        },
        {
            id: 3,
            name: 'Kettlebell Set',
            description: 'Durable kettlebells for strength and conditioning.',
            image: '/images/kettlebells.jpg', // Replace with the correct image path
        },
        // Add more equipment items as needed
    ];

    return (
        <div className="equipment-page">
            <h1 className="equipment-title">Our Equipment</h1>
            <div className="equipment-grid">
                {equipmentList.map((equipment) => (
                    <div key={equipment.id} className="equipment-card">
                        <img
                            src={equipment.image}
                            alt={equipment.name}
                            className="equipment-image"
                        />
                        <h2 className="equipment-name">{equipment.name}</h2>
                        <p className="equipment-description">
                            {equipment.description}
                        </p>
                        <button className="equipment-button">
                            Add to Wishlist
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EquipmentPage;
