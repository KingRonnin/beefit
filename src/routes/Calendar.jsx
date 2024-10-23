import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link, useNavigate } from "react-router-dom"; 
import './Calendar.css';

function Calendar() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to other pages

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/user/events"); 
      const data = await response.json();
      setEvents(data); 
    };

    fetchEvents();
  }, []);

  const handleDateClick = (arg) => {
    const eventTitle = prompt("Enter Event Title");
    if (eventTitle) {
      
      if (eventTitle.toLowerCase() === "fullbody", "ARMS" , "ABS") {
        navigate("/myplan");
      } else {
        setEvents((prevEvents) => [
          ...prevEvents,
          {
            title: eventTitle,
            date: arg.date,
            allDay: true,
          },
        ]);
      }
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>My Fitness Calendar</h1>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        className="fullcalendar"
        events={events} 
        dateClick={handleDateClick} 
        editable={true} 
        eventClick={(info) => {
          const confirmed = window.confirm("Do you want to delete this event?");
          if (confirmed) {
            setEvents((prevEvents) =>
              prevEvents.filter((event) => event !== info.event)
            );
          }
        }}
      />

      <div className="button-container">
        <Link to="/PlanFrontPage">
          <button className="Return-button">Return to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Calendar;
