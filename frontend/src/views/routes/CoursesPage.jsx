import React, { useState } from 'react';
import './CoursesPage.css';

const courses = [
    {
        id: 1,
        title: 'Strength and Cardio with Brian',
        duration: '39 Min/Day • 2 Weeks',
        price: '$11.99',
        imageUrl: 'path/to/image1.jpg',
        description: 'Strength Training with a Twist of Cardio',
    },
    {
        id: 2,
        title: 'Powerful with Tasha',
        duration: '41 Min/Day • 2 Weeks',
        price: '$11.99',
        imageUrl: 'path/to/image2.jpg',
        description: 'Lifting & Power Training for Improved Strength and Speed',
    },
    // Add more courses as needed
];

const CoursesPage = () => {
    const [filters, setFilters] = useState({
        bodyFocus: '',
        trainingType: '',
        equipment: ''
    });

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
    };

    return (
        <div className="courses-page">
            {/* Sidebar Filters */}
            <aside className="filter-sidebar">
                <h3>Filters</h3>
                <div className="filter-group">
                    <h4>Body Focus</h4>
                    <label><input type="radio" name="bodyFocus" onChange={() => handleFilterChange('bodyFocus', 'Upper Body')} /> Upper Body</label>
                    <label><input type="radio" name="bodyFocus" onChange={() => handleFilterChange('bodyFocus', 'Lower Body')} /> Lower Body</label>
                </div>
                <div className="filter-group">
                    <h4>Training Type</h4>
                    <label><input type="radio" name="trainingType" onChange={() => handleFilterChange('trainingType', 'Strength')} /> Strength</label>
                    <label><input type="radio" name="trainingType" onChange={() => handleFilterChange('trainingType', 'Cardio')} /> Cardio</label>
                </div>
                <div className="filter-group">
                    <h4>Equipment</h4>
                    <label><input type="radio" name="equipment" onChange={() => handleFilterChange('equipment', 'Dumbbells')} /> Dumbbells</label>
                    <label><input type="radio" name="equipment" onChange={() => handleFilterChange('equipment', 'Bodyweight')} /> Bodyweight</label>
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
