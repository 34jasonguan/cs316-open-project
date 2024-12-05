import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AvailabilityHistory({ userID }) {
  const [events, setEvents] = useState([]);
  const [availabilities, setAvailabilities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventsAndAvailability = async () => {
      try {
        const response = await fetch('/api/getEvents');
        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.statusText}`);
        }
        const eventsData = await response.json();
        setEvents(eventsData);
        console.log(eventsData);

        const availabilityResponse = await fetch(
          `/api/getAvailabilityHistory?userID=${encodeURIComponent(userID)}`
        );
        if (!availabilityResponse.ok) {
          throw new Error(`Error fetching availability: ${availabilityResponse.statusText}`);
        }
        const availabilityData = await availabilityResponse.json();
        const availabilityMap = {};
        Object.entries(availabilityData.history).forEach(([eventName, dates]) => {
          dates.forEach((dateInfo) => {
            const dateKey = `${eventName}-${dateInfo.date}`;
            availabilityMap[dateKey] = dateInfo.isAvailable;
          });
        });

        setAvailabilities(availabilityMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsAndAvailability();
  }, [userID]);

  if (loading) {
    return <p>Loading availability history...</p>;
  }

  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  // Group events by name
  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.name]) {
      acc[event.name] = [];
    }
    acc[event.name].push(event);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(groupedEvents).map(([eventName, eventList]) => {
        const sortedEventList = eventList.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        return (
          <Card key={eventName}>
            <CardHeader>
              <CardTitle>{eventName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {sortedEventList.map((event) => {
                  const eventDateUTC = new Date(event.date);

                  const dateStr = eventDateUTC.toISOString().split('T')[0];
                  const dateKey = `${event.name}-${dateStr}`;
                  const isAvailable = availabilities[dateKey];

                  let bgColor = 'bg-red-100';
                  let statusText = 'No Response';

                  if (isAvailable === true) {
                    bgColor = 'bg-green-100';
                    statusText = 'Available';
                  } else if (isAvailable === false) {
                    bgColor = 'bg-red-100';
                    statusText = 'Unavailable';
                  }

                  return (
                    <div key={event.id} className={`p-2 rounded ${bgColor}`}>
                      <p className="font-medium">
                        {eventDateUTC.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          timeZone: 'UTC',
                        })}
                      </p>
                      <p>{statusText}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
