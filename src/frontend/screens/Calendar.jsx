import React, { useState } from "react";
import Calendar from "react-calendar";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/calendar.css";

const localizer = momentLocalizer(moment);

export default function Sample() {
  const [value, setValue] = useState([new Date(), new Date()]);
  const [events, setEvents] = useState([]);

  const handleDateChange = (selectedDates) => {
    setValue(selectedDates);
  };

  const handleSelect = ({ start, end }) => {
    const newEvent = {
      title: "Available",
      start,
      end,
    };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <div className="Calendar">
      <header>
        <h1>Calendar</h1>
      </header>
      <div className="Calendar__container">
        <main className="Calendar__container__content">
          <Calendar
            selectRange
            onChange={handleDateChange}
            value={value}
          />
          <div>
            <p>Selected Start Date: {value[0].toLocaleDateString()}</p>
            <p>Selected End Date: {value[1].toLocaleDateString()}</p>
          </div>
          {value && (
            <div style={{ height: "500px", marginTop: "20px" }}>
              <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultDate={value[0]}
                defaultView="week"
                selectable={true}
                onSelectSlot={handleSelect}
                style={{ height: "100%" }}
                min={new Date(2022, 0, 1, 8, 0)} // 8.00 AM
                max={new Date(2022, 0, 1, 20, 0)} // 8.00 PM
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
