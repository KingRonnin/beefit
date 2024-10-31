import React, { useState } from 'react';
import './CoursesPage.css';

const courses = [
    {
        id: 1,
        title: 'Strength and Cardio with Brian',
        duration: '39 Min/Day • 2 Weeks',
        price: '$11.99',
        youtubeUrl: 'https://www.youtube.com/embed/2xkPjgjCk2w', // Real YouTube embed URL
        description: 'Strength Training with a Twist of Cardio',
        bodyFocus: 'Upper Body',
        trainingType: 'Strength',
        equipment: 'Dumbbell'
    },
    {
        id: 2,
        title: 'Powerful with Tasha',
        duration: '41 Min/Day • 2 Weeks',
        price: '$11.99',
        youtubeUrl: 'https://www.youtube.com/embed/VOZrd6a7dIU', // Real YouTube embed URL
        description: 'Lifting & Power Training for Improved Strength and Speed',
        bodyFocus: 'Lower Body',
        trainingType: 'Cardio',
        equipment: 'Bodyweight'
    },
    // Additional courses with YouTube links
];

const CoursesPage = () => {
    const [filters, setFilters] = useState({
        bodyFocus: '',
        trainingType: '',
        equipment: ''
    });

    const [isCollapsed, setIsCollapsed] = useState({
        bodyFocus: true,
        trainingType: true,
        equipment: true,
        specialtyPrograms: true
    });

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
    };

    const toggleCollapse = (section) => {
        setIsCollapsed(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    };

    // Filter courses based on the selected filters
    const filteredCourses = courses.filter(course => {
        if (filters.bodyFocus && course.bodyFocus !== filters.bodyFocus) return false;
        if (filters.trainingType && course.trainingType !== filters.trainingType) return false;
        if (filters.equipment && course.equipment !== filters.equipment) return false;
        return true;
    });

    return (
        <div className="courses-page">
            {/* Sidebar Filters */}
            <aside className="filter-sidebar">
                <h3>Filters</h3>

                {/* Body Focus Filter */}
                <div className="filter-group">
                    <h4 onClick={() => toggleCollapse('bodyFocus')} className="filter-header">
                        Body Focus {isCollapsed.bodyFocus ? '▼' : '▲'}
                    </h4>
                    {isCollapsed.bodyFocus && (
                        <div className="filter-options">
                            <label><input type="radio" name="bodyFocus" onChange={() => handleFilterChange('bodyFocus', 'Upper Body')} /> Upper Body</label>
                            <label><input type="radio" name="bodyFocus" onChange={() => handleFilterChange('bodyFocus', 'Lower Body')} /> Lower Body</label>
                        </div>
                    )}
                </div>

                {/* Training Type Filter */}
                <div className="filter-group">
                    <h4 onClick={() => toggleCollapse('trainingType')} className="filter-header">
                        Training Type {isCollapsed.trainingType ? '▼' : '▲'}
                    </h4>
                    {isCollapsed.trainingType && (
                        <div className="filter-options">
                            <label><input type="radio" name="trainingType" onChange={() => handleFilterChange('trainingType', 'Strength')} /> Strength</label>
                            <label><input type="radio" name="trainingType" onChange={() => handleFilterChange('trainingType', 'Cardio')} /> Cardio</label>
                        </div>
                    )}
                </div>

                {/* Equipment Filter */}
                <div className="filter-group">
                    <h4 onClick={() => toggleCollapse('equipment')} className="filter-header">
                        Equipment {isCollapsed.equipment ? '▼' : '▲'}
                    </h4>
                    {isCollapsed.equipment && (
                        <div className="filter-options">
                            <label><input type="radio" name="equipment" onChange={() => handleFilterChange('equipment', 'No Equipment')} /> No Equipment</label>
                            <label><input type="radio" name="equipment" onChange={() => handleFilterChange('equipment', 'Dumbbell')} /> Dumbbell</label>
                            <label><input type="radio" name="equipment" onChange={() => handleFilterChange('equipment', 'Mat')} /> Mat</label>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content for Course Cards */}
            <section className="course-grid">
                <h2>Workout Programs</h2>
                <div className="course-cards">
                    {filteredCourses.map((course) => (
                        <div key={course.id} className="course-card">
                            <iframe
                                width="100%"
                                height="180"
                                src={course.youtubeUrl}
                                title={course.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="course-video"
                            ></iframe>
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
