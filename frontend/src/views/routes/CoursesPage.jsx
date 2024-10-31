import React, { useState } from 'react';
import './CoursesPage.css';

const courses = [
    {
        id: 1,
        title: 'Strength and Cardio with Brian',
        duration: '39 Min/Day • 2 Weeks',
        price: '$11.99',
        youtubeId: 'https://www.youtube.com/watch?v=6FyHoo4Vfxg',
        description: 'Strength Training with a Twist of Cardio',
        bodyFocus: 'Upper Body',
        trainingType: 'Strength',
        equipment: 'Dumbbell',
        specialtyProgram: '5 Day Trainer Series'
    },
    {
        id: 2,
        title: 'Powerful with Tasha',
        duration: '41 Min/Day • 2 Weeks',
        price: '$11.99',
        imageUrl: '/images/powerful-tasha.jpg', // Ensure this path is correct
        description: 'Lifting & Power Training for Improved Strength and Speed',
        bodyFocus: 'Lower Body',
        trainingType: 'Cardio',
        equipment: 'Mat',
        specialtyProgram: 'Pregnancy and Postpartum'
    },
    // Additional courses...
];

const CoursesPage = () => {
    const [activeFilter, setActiveFilter] = useState({
        bodyFocus: null,
        trainingType: null,
        equipment: null,
        specialtyProgram: null
    });

    const handleFilterClick = (category, value) => {
        setActiveFilter((prev) => ({
            ...prev,
            [category]: prev[category] === value ? null : value
        }));
    };

    const filteredCourses = courses.filter((course) => {
        return (
            (!activeFilter.bodyFocus || course.bodyFocus === activeFilter.bodyFocus) &&
            (!activeFilter.trainingType || course.trainingType === activeFilter.trainingType) &&
            (!activeFilter.equipment || course.equipment === activeFilter.equipment) &&
            (!activeFilter.specialtyProgram || course.specialtyProgram === activeFilter.specialtyProgram)
        );
    });

    return (
        <div className="courses-page">
            {/* Sidebar Filters */}
            <aside className="filter-sidebar">
                <h3>Filters</h3>

                <div className="filter-group">
                    <h4>Body Focus</h4>
                    <div className="filter-options">
                        <p onClick={() => handleFilterClick('bodyFocus', 'Upper Body')}
                           className={activeFilter.bodyFocus === 'Upper Body' ? 'active-filter' : ''}>
                            Upper Body
                        </p>
                        <p onClick={() => handleFilterClick('bodyFocus', 'Lower Body')}
                           className={activeFilter.bodyFocus === 'Lower Body' ? 'active-filter' : ''}>
                            Lower Body
                        </p>
                    </div>
                </div>

                <div className="filter-group">
                    <h4>Training Type</h4>
                    <div className="filter-options">
                        <p onClick={() => handleFilterClick('trainingType', 'Strength')}
                           className={activeFilter.trainingType === 'Strength' ? 'active-filter' : ''}>
                            Strength
                        </p>
                        <p onClick={() => handleFilterClick('trainingType', 'Cardio')}
                           className={activeFilter.trainingType === 'Cardio' ? 'active-filter' : ''}>
                            Cardio
                        </p>
                    </div>
                </div>

                <div className="filter-group">
                    <h4>Equipment</h4>
                    <div className="filter-options">
                        <p onClick={() => handleFilterClick('equipment', 'No Equipment')}
                           className={activeFilter.equipment === 'No Equipment' ? 'active-filter' : ''}>
                            No Equipment
                        </p>
                        <p onClick={() => handleFilterClick('equipment', 'Dumbbell')}
                           className={activeFilter.equipment === 'Dumbbell' ? 'active-filter' : ''}>
                            Dumbbell
                        </p>
                        <p onClick={() => handleFilterClick('equipment', 'Mat')}
                           className={activeFilter.equipment === 'Mat' ? 'active-filter' : ''}>
                            Mat
                        </p>
                    </div>
                </div>

                <div className="filter-group">
                    <h4>Specialty Programs</h4>
                    <div className="filter-options">
                        <p onClick={() => handleFilterClick('specialtyProgram', '5 Day Trainer Series')}
                           className={activeFilter.specialtyProgram === '5 Day Trainer Series' ? 'active-filter' : ''}>
                            5 Day Trainer Series
                        </p>
                        <p onClick={() => handleFilterClick('specialtyProgram', '10 Day Trainer Series')}
                           className={activeFilter.specialtyProgram === '10 Day Trainer Series' ? 'active-filter' : ''}>
                            10 Day Trainer Series
                        </p>
                        <p onClick={() => handleFilterClick('specialtyProgram', 'Pregnancy and Postpartum')}
                           className={activeFilter.specialtyProgram === 'Pregnancy and Postpartum' ? 'active-filter' : ''}>
                            Pregnancy and Postpartum
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content for Course Cards */}
            <section className="course-grid">
                <h2>Workout Programs</h2>
                <div className="course-cards">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
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
                        ))
                    ) : (
                        <p>No courses available for the selected filters.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CoursesPage;
