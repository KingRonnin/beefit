import React, { useState } from "react";
import "./CoursesPage.css";
import CheckoutForm from "./CheckoutForm";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Upper Body Strength",
    duration: "30 Min",
    price: "$10.99",
    youtubeId: "6FyHoo4Vfxg",
    description: "Upper body strength workout",
    bodyFocus: "Upper Body",
    trainingType: "Strength",
    equipment: "Dumbbell",
    specialtyProgram: "5 Day Trainer Series",
  },
  {
    id: 2,
    title: "Upper Body Cardio Blast",
    duration: "25 Min",
    price: "$9.99",
    youtubeId: "ESkI_WR1qqc",
    description: "Upper body cardio",
    bodyFocus: "Upper Body",
    trainingType: "Cardio",
    equipment: "No Equipment",
    specialtyProgram: "Upper Body",
  },
  {
    id: 3,
    title: "Upper Body Workout Without Weights",
    duration: "33 Min",
    price: "$12.99",
    youtubeId: "3yw5y1DN2pI",
    description: "Upper body without weights",
    bodyFocus: "Upper Body",
    trainingType: "Strength",
    equipment: "No Equipment",
    specialtyProgram: "Upper Body",
  },
  {
    id: 4,
    title: "Upper Body Yoga Flow",
    duration: "20 Min",
    price: "$8.99",
    youtubeId: "cbKkB3POqaY",
    description: "Upper body yoga session",
    bodyFocus: "Upper Body",
    trainingType: "Flexibility",
    equipment: "Mat",
    specialtyProgram: "Yoga Series",
  },
  {
    id: 5,
    title: "Upper Body Circuit",
    duration: "40 Min",
    price: "$11.99",
    youtubeId: "W4eKVKwf3rQ",
    description: "Circuit workout for upper body",
    bodyFocus: "Upper Body",
    trainingType: "Strength",
    equipment: "Dumbbell",
    specialtyProgram: "Strength Series",
  },

  {
    id: 6,
    title: "Lower Body Burn",
    duration: "35 Min",
    price: "$11.99",
    youtubeId: "GViX8riaHX4",
    description: "Lower body strength workout",
    bodyFocus: "Lower Body",
    trainingType: "Strength",
    equipment: "Dumbbell",
    specialtyProgram: "5 Day Trainer Series",
  },
  {
    id: 7,
    title: "Lower Body Cardio Challenge",
    duration: "20 Min",
    price: "$8.99",
    youtubeId: "nardrbgqZ00",
    description: "Lower body cardio",
    bodyFocus: "Lower Body",
    trainingType: "Cardio",
    equipment: "No Equipment",
    specialtyProgram: "Pregnancy and Postpartum",
  },
  {
    id: 8,
    title: "Lower Body Yoga Flow",
    duration: "25 Min",
    price: "$9.99",
    youtubeId: "0XBcrjkkwQo",
    description: "Yoga flow for lower body flexibility",
    bodyFocus: "Lower Body",
    trainingType: "Flexibility",
    equipment: "Mat",
    specialtyProgram: "Yoga Series",
  },
  {
    id: 9,
    title: "Lower Body Strength Circuit",
    duration: "45 Min",
    price: "$14.99",
    youtubeId: "FeR-4_Opt-g",
    description: "Strength circuit for lower body",
    bodyFocus: "Lower Body",
    trainingType: "Strength",
    equipment: "Dumbbell",
    specialtyProgram: "10 Day Trainer Series",
  },
  {
    id: 10,
    title: "Lower Body Pilates",
    duration: "30 Min",
    price: "$10.99",
    youtubeId: "nKzZLE6s1cs",
    description: "Pilates routine for lower body",
    bodyFocus: "Lower Body",
    trainingType: "Strength",
    equipment: "No Equipment",
    specialtyProgram: "Pilates Series",
  },

  {
    id: 11,
    title: "Core Strength Builder",
    duration: "30 Min",
    price: "$10.99",
    youtubeId: "9FHdGb5hvZs",
    description: "Core strength training",
    bodyFocus: "Core",
    trainingType: "Strength",
    equipment: "Mat",
    specialtyProgram: "Core Series",
  },
  {
    id: 12,
    title: "Total Body Strength",
    duration: "35 Min",
    price: "$12.99",
    youtubeId: "3BC6Zbs-Kk0",
    description: "Total body strength",
    bodyFocus: "Full Body",
    trainingType: "Strength",
    equipment: "Dumbbell",
    specialtyProgram: "Strength Program",
  },
  {
    id: 13,
    title: "Strength Circuit",
    duration: "40 Min",
    price: "$13.99",
    youtubeId: "5CwOg_L9IOE",
    description: "Strength workout circuit",
    bodyFocus: "Upper Body",
    trainingType: "Strength",
    equipment: "Dumbbell",
    specialtyProgram: "5 Day Trainer Series",
  },
  {
    id: 14,
    title: "Strength Without Equipment",
    duration: "20 Min",
    price: "$8.99",
    youtubeId: "9dq2eo1kTlk",
    description: "Strength exercises without equipment",
    bodyFocus: "Lower Body",
    trainingType: "Strength",
    equipment: "No Equipment",
    specialtyProgram: "Bodyweight Series",
  },
  {
    id: 15,
    title: "Strength Training for Legs",
    duration: "25 Min",
    price: "$9.99",
    youtubeId: "S7FwlVuVBm8",
    description: "Lower body strength workout",
    bodyFocus: "Lower Body",
    trainingType: "Strength",
    equipment: "Dumbbell",
    specialtyProgram: "Leg Day",
  },

  {
    id: 16,
    title: "Full Body Cardio",
    duration: "45 Min",
    price: "$14.99",
    youtubeId: "NiB19KOLOP8",
    description: "High-intensity cardio",
    bodyFocus: "Full Body",
    trainingType: "Cardio",
    equipment: "No Equipment",
    specialtyProgram: "HIIT",
  },
  {
    id: 17,
    title: "Upper Body Cardio",
    duration: "30 Min",
    price: "$10.99",
    youtubeId: "T93cYM3JQGs",
    description: "Upper body cardio session",
    bodyFocus: "Upper Body",
    trainingType: "Cardio",
    equipment: "Dumbbell",
    specialtyProgram: "Upper Body Cardio",
  },
  {
    id: 18,
    title: "Cardio Without Weights",
    duration: "20 Min",
    price: "$7.99",
    youtubeId: "XyHib0M2PiU",
    description: "Cardio workout without equipment",
    bodyFocus: "Lower Body",
    trainingType: "Cardio",
    equipment: "No Equipment",
    specialtyProgram: "Bodyweight Cardio",
  },
  {
    id: 19,
    title: "Core Cardio Blast",
    duration: "25 Min",
    price: "$8.99",
    youtubeId: "c4jNKLRnwnY",
    description: "Core cardio session",
    bodyFocus: "Core",
    trainingType: "Cardio",
    equipment: "Mat",
    specialtyProgram: "Core Cardio",
  },
  {
    id: 20,
    title: "Advanced Cardio Challenge",
    duration: "40 Min",
    price: "$13.99",
    youtubeId: "a6kuU8KOiIM",
    description: "Advanced cardio workout",
    bodyFocus: "Full Body",
    trainingType: "Cardio",
    equipment: "No Equipment",
    specialtyProgram: "Advanced Cardio",
  },

  {
    id: 21,
    title: "No Equipment Strength",
    duration: "25 Min",
    price: "$9.99",
    youtubeId: "LP97TjEID6s",
    description: "Strength workout with no equipment",
    bodyFocus: "Full Body",
    trainingType: "Strength",
    equipment: "No Equipment",
    specialtyProgram: "Bodyweight Strength",
  },
  {
    id: 22,
    title: "Cardio Without Weights",
    duration: "20 Min",
    price: "$8.99",
    youtubeId: "jRZ4A4li4rs",
    description: "Cardio workout without weights",
    bodyFocus: "Upper Body",
    trainingType: "Cardio",
    equipment: "No Equipment",
    specialtyProgram: "Upper Body Cardio",
  },
  {
    id: 23,
    title: "Core Stability",
    duration: "30 Min",
    price: "$9.99",
    youtubeId: "t5e9sZIjBfU",
    description: "Core workout without equipment",
    bodyFocus: "Core",
    trainingType: "Strength",
    equipment: "No Equipment",
    specialtyProgram: "Core Stability",
  },
  {
    id: 24,
    title: "Bodyweight HIIT",
    duration: "30 Min",
    price: "$10.99",
    youtubeId: "M8hZp0XX9gY",
    description: "HIIT workout using bodyweight",
    bodyFocus: "Full Body",
    trainingType: "Cardio",
    equipment: "No Equipment",
    specialtyProgram: "HIIT Series",
  },
  {
    id: 25,
    title: "Lower Body Bodyweight",
    duration: "25 Min",
    price: "$8.99",
    youtubeId: "xy7u2l_rk4A",
    description: "Lower body workout with no equipment",
    bodyFocus: "Lower Body",
    trainingType: "Strength",
    equipment: "No Equipment",
    specialtyProgram: "Bodyweight Lower Body",
  },

  {
    id: 26,
    title: "Dumbbell Full Body Strength",
    duration: "40 Min",
    price: "$12.99",
    youtubeId: "lG6-Jv8fSa4",
    description: "Strength workout with dumbbells",
    bodyFocus: "Full Body",
    trainingType: "Strength",
    equipment: "Dumbbell",
    specialtyProgram: "Strength Circuit",
  },
  {
    id: 27,
    title: "Upper Body Dumbbell Workout",
    duration: "30 Min",
    price: "$10.99",
    youtubeId: "cZ9gWzGjVvk",
    description: "Upper body dumbbell workout",
    bodyFocus: "Upper Body",
    trainingType: "Strength",
    equipment: "Dumbbell",
    specialtyProgram: "Upper Body Strength",
  },
  {
    id: 28,
    title: "Dumbbell Lower Body",
    duration: "35 Min",
    price: "$11.99",
    youtubeId: "Zh37ZZsdC8Q",
    description: "Lower body dumbbell workout",
    bodyFocus: "Lower Body",
    trainingType: "Strength",
    equipment: "Dumbbell",
    specialtyProgram: "Lower Body Dumbbell",
  },
  {
    id: 29,
    title: "Core Dumbbell Challenge",
    duration: "25 Min",
    price: "$9.99",
    youtubeId: "jF2h3y9yzUo",
    description: "Core strength with dumbbells",
    bodyFocus: "Core",
    trainingType: "Strength",
    equipment: "Dumbbell",
    specialtyProgram: "Core Strength",
  },
  {
    id: 30,
    title: "Total Body Dumbbell HIIT",
    duration: "45 Min",
    price: "$13.99",
    youtubeId: "MfhTrUvOUpA",
    description: "Full body HIIT with dumbbells",
    bodyFocus: "Full Body",
    trainingType: "Cardio",
    equipment: "Dumbbell",
    specialtyProgram: "HIIT Dumbbell",
  },

  {
    id: 31,
    title: "Core Workout on Mat",
    duration: "25 Min",
    price: "$8.99",
    youtubeId: "bV3rtmvUP3k",
    description: "Core exercises on mat",
    bodyFocus: "Core",
    trainingType: "Strength",
    equipment: "Mat",
    specialtyProgram: "Core Mat Series",
  },
  {
    id: 32,
    title: "Mat Cardio Flow",
    duration: "30 Min",
    price: "$9.99",
    youtubeId: "T9kVWxVsPF0",
    description: "Cardio on mat",
    bodyFocus: "Full Body",
    trainingType: "Cardio",
    equipment: "Mat",
    specialtyProgram: "Mat Cardio",
  },
  {
    id: 33,
    title: "Strength Workout on Mat",
    duration: "20 Min",
    price: "$7.99",
    youtubeId: "nFz0ZYKE5yM",
    description: "Strength on mat",
    bodyFocus: "Upper Body",
    trainingType: "Strength",
    equipment: "Mat",
    specialtyProgram: "Upper Body Mat",
  },
  {
    id: 34,
    title: "Full Body Stretch on Mat",
    duration: "15 Min",
    price: "$5.99",
    youtubeId: "wZVcZFlZce4",
    description: "Full body stretch session",
    bodyFocus: "Full Body",
    trainingType: "Flexibility",
    equipment: "Mat",
    specialtyProgram: "Flexibility Series",
  },
  {
    id: 35,
    title: "Lower Body Stretch on Mat",
    duration: "20 Min",
    price: "$6.99",
    youtubeId: "uSR6h1W2rCc",
    description: "Lower body stretch on mat",
    bodyFocus: "Lower Body",
    trainingType: "Flexibility",
    equipment: "Mat",
    specialtyProgram: "Lower Body Flexibility",
  },
];
const CoursesPage = () => {


  const navigate = useNavigate()

  const [cart, setCart] = useState([]); 

  const handleAddToCart = async (course) => {
    navigate(`/Payment/${encodeURIComponent(JSON.stringify({title: course.title, amount: course.price.substr(1)}))}`)

  };

  const [activeFilter, setActiveFilter] = useState({
    bodyFocus: null,
    trainingType: null,
    equipment: null,
    specialtyProgram: null,
  });

  const handleFilterClick = (category, value) => {
    setActiveFilter((prev) => ({
      ...prev,
      [category]: prev[category] === value ? null : value,
    }));
  };

  const filteredCourses = courses.filter((course) => {
    return (
      (!activeFilter.bodyFocus ||
        course.bodyFocus === activeFilter.bodyFocus) &&
      (!activeFilter.trainingType ||
        course.trainingType === activeFilter.trainingType) &&
      (!activeFilter.equipment ||
        course.equipment === activeFilter.equipment) &&
      (!activeFilter.specialtyProgram ||
        course.specialtyProgram === activeFilter.specialtyProgram)
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
            <p
              onClick={() => handleFilterClick("bodyFocus", "Upper Body")}
              className={
                activeFilter.bodyFocus === "Upper Body" ? "active-filter" : ""
              }
            >
              Upper Body
            </p>
            <p
              onClick={() => handleFilterClick("bodyFocus", "Lower Body")}
              className={
                activeFilter.bodyFocus === "Lower Body" ? "active-filter" : ""
              }
            >
              Lower Body
            </p>
          </div>
        </div>

        <div className="filter-group">
          <h4>Training Type</h4>
          <div className="filter-options">
            <p
              onClick={() => handleFilterClick("trainingType", "Strength")}
              className={
                activeFilter.trainingType === "Strength" ? "active-filter" : ""
              }
            >
              Strength
            </p>
            <p
              onClick={() => handleFilterClick("trainingType", "Cardio")}
              className={
                activeFilter.trainingType === "Cardio" ? "active-filter" : ""
              }
            >
              Cardio
            </p>
          </div>
        </div>

        <div className="filter-group">
          <h4>Equipment</h4>
          <div className="filter-options">
            <p
              onClick={() => handleFilterClick("equipment", "No Equipment")}
              className={
                activeFilter.equipment === "No Equipment" ? "active-filter" : ""
              }
            >
              No Equipment
            </p>
            <p
              onClick={() => handleFilterClick("equipment", "Dumbbell")}
              className={
                activeFilter.equipment === "Dumbbell" ? "active-filter" : ""
              }
            >
              Dumbbell
            </p>
            <p
              onClick={() => handleFilterClick("equipment", "Mat")}
              className={
                activeFilter.equipment === "Mat" ? "active-filter" : ""
              }
            >
              Mat
            </p>
          </div>
        </div>

        <div className="filter-group">
          <h4>Specialty Programs</h4>
          <div className="filter-options">
            <p
              onClick={() =>
                handleFilterClick("specialtyProgram", "5 Day Trainer Series")
              }
              className={
                activeFilter.specialtyProgram === "5 Day Trainer Series"
                  ? "active-filter"
                  : ""
              }
            >
              5 Day Trainer Series
            </p>
            <p
              onClick={() =>
                handleFilterClick("specialtyProgram", "10 Day Trainer Series")
              }
              className={
                activeFilter.specialtyProgram === "10 Day Trainer Series"
                  ? "active-filter"
                  : ""
              }
            >
              10 Day Trainer Series
            </p>
            <p
              onClick={() =>
                handleFilterClick(
                  "specialtyProgram",
                  "Pregnancy and Postpartum"
                )
              }
              className={
                activeFilter.specialtyProgram === "Pregnancy and Postpartum"
                  ? "active-filter"
                  : ""
              }
            >
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
                <div className="course-video">
                  <iframe
                    width="100%"
                    height="180"
                    src={`https://www.youtube.com/embed/${course.youtubeId}`}
                    title={course.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <p>
                    <strong>{course.duration}</strong>
                  </p>
                  <p>
                    <strong>{course.price}</strong>
                  </p>
                  <button onClick={() => handleAddToCart(course)}>
                    Get This Course
                  </button>
                </div>
              </div>
              
            ))
          ) : (
            <p>No courses available for the selected filters.</p>
          )}
        </div>
      </section>
      {cart.length > 0 && (
        <section className="cart-section">
          <h2>Cart</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.title} - {item.price}
              </li>
            ))}
          </ul>
          <CheckoutForm cartItems={cart} />{" "}
        </section>
      )}
    </div>
  );
};

export default CoursesPage;
