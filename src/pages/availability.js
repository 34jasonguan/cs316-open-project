import { useState } from 'react';
import { useRouter } from 'next/router';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function AvailabilityCalendar() {
  const [selectedDates, setSelectedDates] = useState([]);
  const router = useRouter();

  const handleDateClick = (date) => {
    const newDates = [...selectedDates];
    const index = newDates.findIndex(
      (d) => d.toDateString() === date.toDateString()
    );

    // Toggle date selection: If date is already selected, remove it; otherwise, add it
    if (index !== -1) {
      newDates.splice(index, 1); // Deselect the date
    } else {
      newDates.push(date); // Select the date
    }
    setSelectedDates(newDates);
  };

  const handleSubmit = () => {
    // For demonstration, log the selected dates (or send them to the server here)
    console.log("Selected Dates:", selectedDates);

    // Redirect back to the index page after submission
    router.push('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* Container for the Calendar and Selected Dates */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Right-aligned Calendar */}
        <div style={{ marginRight: '50px' }}>
          <h1>Select Your Availability</h1>
          <Calendar
            onClickDay={handleDateClick}
            tileClassName={({ date }) =>
              selectedDates.find(
                (d) => d.toDateString() === date.toDateString()
              )
                ? 'highlight'
                : null
            }
          />
        </div>

        {/* Column for Selected Dates */}
        <div style={{ border: '1px solid #ddd', padding: '10px', minWidth: '200px' }}>
          <h3>Selected Dates</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {selectedDates.length === 0 ? (
              <li>No dates selected</li>
            ) : (
              selectedDates.map((date, index) => (
                <li key={index}>{date.toDateString()}</li>
              ))
            )}
          </ul>

          <button 
            onClick={handleSubmit} 
            style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}