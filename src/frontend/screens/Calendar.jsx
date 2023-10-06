import React, { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css" // Gives us the default calendar styling

import "../css/calendar.css" 

export default function Sample() {

 // Initialize the state with an array of two dates: [startDate, endDate]
 const [value, setValue] = useState([new Date(), new Date()]);

 const handleDateChange = (selectedDates) => {
   setValue(selectedDates);
   // Here, you can process the dates further or store them somewhere else
   console.log("Start Date:", selectedDates[0]);
   console.log("End Date:", selectedDates[1]);
 };

 return (
   <div className="Calendar">
     <header>
       <h1>Calendar</h1>
     </header>
     <div className="Calendar__container">
       <main className="Calendar__container__content">
         <Calendar
           selectRange // Enable range selection
           onChange={handleDateChange}
           value={value}
         />
         {/* Display the selected dates for demo purposes */}
         <div>
           <p>Selected Start Date: {value[0].toLocaleDateString()}</p>
           <p>Selected End Date: {value[1].toLocaleDateString()}</p>
         </div>
       </main>
     </div>
   </div>
 );
}