import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function WeeklyReminderPage() {
    return (
        <>
         <div className="">
            <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                start: "today prev,next", 
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay", 
                }}
            />
         </div>
        </>
    )
}