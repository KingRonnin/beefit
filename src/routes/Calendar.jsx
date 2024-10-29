import React, { useState, useContext, useEffect } from "react";
import ".\Calendar.css"
import { getMonth } from "../util";
import Sidebar from "../component/layout/Sidebar";
import Month from "../component/layout/Month";
import GlobalContext from "../GlobalContext";
import EventModal from "../component/layout/EventModal";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col light-blue-bg">
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Calendar;



