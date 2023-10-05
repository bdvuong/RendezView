import React, { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css" // Gives us the default calendar styling

import "../css/calendar.css" 

export default function Sample() {
  const [value, onChange] = useState(new Date()) // from sample

  // State value now stores an array: [startDate, endDate]
  // const [value, setValue] = useState([]);


  return (
    <div className="Calendar">
      <header>
        <h1>Calendar</h1>
      </header>
      <div className="Calendar__container">
        <main className="Calendar__container__content">
          {/* <Calendar onChange={onChange} showWeekNumbers value={value} /> */}
          <Calendar
            selectRange // Enable range selection
            onChange={onChange}
            value={value}
          />
          </main>
      </div>
    </div>
  )
}
