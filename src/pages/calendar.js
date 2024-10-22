import { useState } from 'react';
import { useRouter } from 'next/router';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './style.js'

const HomePage = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const netID = 'admin';
  const router = useRouter();

  const handleDateClick = (date) => {
    if (selectedDates.find(d => d.toDateString() === date.toDateString())) {
      setSelectedDates(selectedDates.filter(d => d.toDateString() !== date.toDateString()));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleSubmit = async () => {
    console.log("Selected Dates:", selectedDates);
    const formattedDates = selectedDates.map((date) =>
      date.toISOString().split('T')[0]
    );

    const response = await fetch('/api/addAvailability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ netID, dates: formattedDates }),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
    } else {
      alert('Failed to submit dates: ' + result.error);
    }
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
};

export default HomePage;