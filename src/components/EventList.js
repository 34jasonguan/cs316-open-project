import { useState, useEffect } from "react"

export default function EventList({ eventName, dates, hasStaffAccess }) {
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    // This would typically be an API call to fetch availabilities
    const mockAvailabilities = dates.map(() => 
      Array(10).fill(0).map(() => Math.random() > 0.5 ? 'Available' : 'Unavailable')
    );
    setAvailabilities(mockAvailabilities);
  }, [dates]);

  return (
    <div className="space-y-4">
      {dates.map((date, dateIndex) => (
        <div key={dateIndex} className="border p-4 rounded-md">
          <h3 className="font-semibold mb-2">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
          {hasStaffAccess ? (
            <div className="grid grid-cols-5 gap-2">
              {availabilities[dateIndex]?.map((availability, raIndex) => (
                <div key={raIndex} className={`p-2 rounded ${availability === 'Available' ? 'bg-green-100' : 'bg-red-100'}`}>
                  RA {raIndex + 1}: {availability}
                </div>
              ))}
            </div>
          ) : (
            <p>Availability information is visible in the Availability History tab.</p>
          )}
        </div>
      ))}
    </div>
  )
}

