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
      const end = moment(dateRange.end).subtract(1, 'day');
      const days = [];

      while (start.isSameOrBefore(end)) {
        days.push({
          title: "",
          allDay: true,
          start: new Date(start),
          end: new Date(start),
          isDatePickerEvent: true,
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

    const daysDifference = moment(end).diff(moment(start), 'days');
    setCurrentView(daysDifference > 1 ? "week" : "day");

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

  const customWeekDayFormat = (date, culture, localizer) => {
    const formattedDate = localizer.format(date, 'dddd', culture);

    if (currentView === "day") {
      return formattedDate; // Always show the full day name in 'day' view
    }

    // In 'week' view, only show day names within the selected range
    if (date >= dateRange.start && date <= dateRange.end) {
      return formattedDate;
    }

    return '';
  };


  return (
    <div className="Calendar">
      <header>
        <h1>Calendar</h1>
      </header>
      <div className="Calendar__container">
        <main className="Calendar__container__content">
          <div style={{ height: "500px", margin: "20px 0" }}>
            <BigCalendar
              localizer={localizer}
              events={datePickerEvents}
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
              views={["month"]}
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
          {dateRange && (
            <div style={{ height: "500px", marginTop: "20px" }}>
              <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={currentView === "day" ? currentDate : moment(currentDate).add(daysDifference - 1, "days").toDate()}
                view={currentView}
                views={['day', 'week']}
                selectable={true}
                onSelectSlot={handleTimeSelect}
                style={{ height: "100%" }}
                toolbar={false}
                formats={{ dayFormat: customWeekDayFormat }}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
