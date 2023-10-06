import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/calendar.css";

const localizer = momentLocalizer(moment);

export default function Calendar() {
  const [dateRange, setDateRange] = useState(null);
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState("week");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [datePickerEvents, setDatePickerEvents] = useState([]);

  useEffect(() => {
    if (dateRange) {
      const start = moment(dateRange.start);
      const end = moment(dateRange.end).subtract(1, 'day'); // Subtracting one day here
      const days = [];
  
      while (start.isSameOrBefore(end)) {
        days.push({
          title: "",
          allDay: true,
          start: new Date(start),
          end: new Date(start),
          isDatePickerEvent: true,  // Identify these events easily
        });
        start.add(1, "day");
      }
      setDatePickerEvents(days);
    }
  }, [dateRange]);
  

  const handleDateSelect = ({ start, end }) => {
    setDateRange({ start, end });
    setEvents([]);
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

  const customEventPropGetter = (event) => {
    if (event.isDatePickerEvent) {
      return {
        style: {
          backgroundColor: "blue",
        },
      };
    }
    return {};
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
              events={datePickerEvents}
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
              selectable={true}
              onSelectSlot={handleDateSelect}
              style={{ height: "100%" }}
              eventPropGetter={customEventPropGetter}
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
