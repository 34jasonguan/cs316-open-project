import { useState } from 'react';
import { useRouter } from 'next/router';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './style.js'


export default function AvailabilityCalendar() {
  const [selectedDates, setSelectedDates] = useState([]);
  const router = useRouter();

  const handleDateClick = (date) => {
    const newDates = [...selectedDates];
    const index = newDates.findIndex(
      (d) => d.toDateString() === date.toDateString()
    );

    // select and deselect dates
    if (index !== -1) {
      newDates.splice(index, 1); 
    } else {
      newDates.push(date);
    }
    setSelectedDates(newDates);
  };

  const handleSubmit = () => {
    console.log("Selected Dates:", selectedDates);
    router.push('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '50px' }}>
          <h1 style = {styles.heading}> Select Your Availability</h1>
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
        
        <div>
          <h1 style={styles.heading}> Selected Dates</h1>
          <div style={styles.outputArea}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {selectedDates.length === 0 ? (
              <li>No dates selected</li>
            ) : (
              selectedDates.map((date, index) => (
                <li key={index}>
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 
                  ({date.toLocaleDateString('en-US', { weekday: 'short' })})
                </li>
              ))
            )}
          </ul>

        </div>
        <button 
            onClick={handleSubmit} 
            style={styles.button}
          >
          Submit
          </button>
        </div>

        
      </div>
    </div>
  );
}