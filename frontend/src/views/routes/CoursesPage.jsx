import React, { useState } from 'react';
import './CoursesPage.css';

const courses = [
    {
        id: 1,
        title: 'Strength and Cardio with Brian',
        duration: '39 Min/Day • 2 Weeks',
        price: '$11.99',
        imageUrl: '/images/strength-cardio.jpg', // Ensure this path is correct
        description: 'Strength Training with a Twist of Cardio',
        specialtyProgram: '5 Day Trainer Series'
    },
    {
        id: 2,
        title: 'Powerful with Tasha',
        duration: '41 Min/Day • 2 Weeks',
        price: '$11.99',
        imageUrl: '/images/powerful-tasha.jpg', // Ensure this path is correct
        description: 'Lifting & Power Training for Improved Strength and Speed',
        specialtyProgram: 'Pregnancy and Postpartum'
    },
    // Additional courses...
];

const CoursesPage = () => {
    const [filters, setFilters] = useState({
        bodyFocus: [],
        trainingType: [],
        equipment: [],
        specialtyPrograms: []
    });

    const handleCheckboxChange = (filterName, value) => {
        setFilters(prevFilters => {
            const currentValues = prevFilters[filterName];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value) // Remove if already selected
                : [...currentValues, value]; // Add if not selected

            return {
                ...prevFilters,
                [filterName]: newValues
            };
        });
    };

    return (
        <div className="courses-page">
            {/* Sidebar Filters */}
            <aside className="filter-sidebar">
                <h3>Filters</h3>

                <div className="filter-group">
                    <h4>Body Focus</h4>
                    <div className="filter-options">
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('bodyFocus', 'Upper Body')}
                                checked={filters.bodyFocus.includes('Upper Body')}
                            /> Upper Body
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('bodyFocus', 'Lower Body')}
                                checked={filters.bodyFocus.includes('Lower Body')}
                            /> Lower Body
                        </label>
                    </div>
                </div>

                <div className="filter-group">
                    <h4>Training Type</h4>
                    <div className="filter-options">
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('trainingType', 'Strength')}
                                checked={filters.trainingType.includes('Strength')}
                            /> Strength
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('trainingType', 'Cardio')}
                                checked={filters.trainingType.includes('Cardio')}
                            /> Cardio
                        </label>
                    </div>
                </div>

                <div className="filter-group">
                    <h4>Equipment</h4>
                    <div className="filter-options">
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('equipment', 'No Equipment')}
                                checked={filters.equipment.includes('No Equipment')}
                            /> No Equipment
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('equipment', 'Dumbbell')}
                                checked={filters.equipment.includes('Dumbbell')}
                            /> Dumbbell
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('equipment', 'Mat')}
                                checked={filters.equipment.includes('Mat')}
                            /> Mat
                        </label>
                    </div>
                </div>

                <div className="filter-group">
                    <h4>Specialty Programs</h4>
                    <div className="filter-options">
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('specialtyPrograms', '5 Day Trainer Series')}
                                checked={filters.specialtyPrograms.includes('5 Day Trainer Series')}
                            /> 5 Day Trainer Series
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('specialtyPrograms', '10 Day Trainer Series')}
                                checked={filters.specialtyPrograms.includes('10 Day Trainer Series')}
                            /> 10 Day Trainer Series
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                onChange={() => handleCheckboxChange('specialtyPrograms', 'Pregnancy and Postpartum')}
                                checked={filters.specialtyPrograms.includes('Pregnancy and Postpartum')}
                            /> Pregnancy and Postpartum
                        </label>
                    </div>
                </div>
            </aside>

            {/* Main Content for Course Cards */}
            <section className="course-grid">
                <h2>Workout Programs</h2>
                <div className="course-cards">
                    {courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <img src={course.imageUrl} alt={course.title} className="course-image" />
                            <div className="course-info">
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <p><strong>{course.duration}</strong></p>
                                <p><strong>{course.price}</strong></p>
                                <button className="add-to-cart-button">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CoursesPage;
