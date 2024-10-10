import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import CalendarModal from 'src\components\calendarModal.tsx';

type Event = {
    title: string;
    start: string | null;
    allDay: boolean;
};

const CalendarSaveEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]); 
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleDateClick = (arg: DateClickArg) => {  
        setSelectedDate(arg.dateStr);
        setModalOpen(true);
    };

    const addEvent = (title: string) => {  
        if (selectedDate) {  
            const newEvent: Event = {
                title,
                start: selectedDate,
                allDay: true
            };
            setEvents([...events, newEvent]);
            setModalOpen(false);
        }
    };

    return (
        <div style={{ background: 'pink', color: 'yellow', padding: '10px' }}>
            {modalOpen && <CalendarModal onAddEvent={addEvent} onCancel={() => setModalOpen(false)} />}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                height="90vh"
                events={events}
                dateClick={handleDateClick}
            />
        </div>
    );
}

export default CalendarSaveEvents;
