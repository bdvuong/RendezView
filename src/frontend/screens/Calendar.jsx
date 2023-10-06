import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/calendar.css";

const localizer = momentLocalizer(moment);

export default function Sample() {
  const [dateRange, setDateRange] = useState(null);
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateSelect = ({ start, end }) => {
    setDateRange({ start, end });
    // Reset events when changing the date range
    setEvents([]);
    // Set the date and view for the time picker calendar
    setCurrentDate(start);
    setCurrentView("week");
  };

  const handleTimeSelect = ({ start, end }) => {
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
          {/* Date Range Picker */}
          <div style={{ height: "500px", margin: "20px 0" }}>
            <BigCalendar
              localizer={localizer}
              events={[]}
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
              selectable={true}
              onSelectSlot={handleDateSelect}
              style={{ height: "100%" }}
            />
          </div>
          {dateRange && (
            <div>
              <p>Selected Start Date: {dateRange.start.toLocaleDateString()}</p>
              <p>Selected End Date: {dateRange.end.toLocaleDateString()}</p>
            </div>
          )}
          {/* Time Slot Picker */}
          {dateRange && (
            <div style={{ height: "500px", marginTop: "20px" }}>
              <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={currentDate}
                view={currentView}
                onView={setCurrentView}
                onNavigate={setCurrentDate}
                views={['week', 'day']}
                selectable={true}
                onSelectSlot={handleTimeSelect}
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
