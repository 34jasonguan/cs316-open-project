import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import NavBar from '@/components/NavBar';

const SearchAvailabilityPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [output, setOutput] = useState([]);
  const [selectedRows, setSelectedRows] = useState({}); // Keep track of selection for each row
  const [loading, setLoading] = useState(false);

  const handleRowClick = async (student) => {
    setSelectedStudent(student); 
    try {
      const response = await fetch(`/api/getProfileData?netid=${student.netid}&userClass=${student.class}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        console.error('Error fetching profile data:', response.statusText);
        setProfileData(null);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setProfileData(null);
    }
  };

    const handleCloseProfile = () => {
        setSelectedStudent(null);
        setProfileData(null); 
    };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/getEvents');
        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.statusText}`);
        }
        const data = await response.json();

        const uniqueEvents = Array.from(
          new Map(data.map((event) => [event.name, event])).values()
        );

        setEvents(uniqueEvents);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
  };

  const handleSearch = async () => {
    if (!selectedEvent) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/getAvailabilityHistoryByEvent?eventName=${encodeURIComponent(selectedEvent)}`);
      if (!response.ok) {
        throw new Error(`Error fetching availability: ${response.statusText}`);
      }
      const availabilityResults = await response.json();

      const resultsWithFirstNames = await Promise.all(
        availabilityResults.map(async (availability) => {
          if (!availability.user) {
            return { ...availability, user: 'N/A' };
          }

          try {
            const userResponse = await fetch(`/api/getUsersByClassNetID?filter=netid&inputValue=${availability.user}`);
            if (userResponse.ok) {
              const userData = await userResponse.json();
              return { ...availability, user: userData[0]?.firstname || 'N/A' };
            } else {
              return { ...availability, user: 'N/A' };
            }
          } catch (error) {
            console.error(`Error fetching user first name for ${availability.user}:`, error);
            return { ...availability, user: 'N/A' };
          }
        })
      );

      setOutput(resultsWithFirstNames);
      setSelectedRows({}); // Reset selection when new data is loaded
    } catch (error) {
      console.error('Error searching availability:', error);
      setOutput([{ event: 'Error', date: 'Failed to fetch availability', user: 'N/A' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (index) => {
    setSelectedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleGenerateSchedule = () => {
    const selectedUsers = output
      .filter((_, index) => selectedRows[index])
      .map((availability) => availability.user);

    console.log('Selected Users:', selectedUsers);
    alert(`Schedule generated for: ${selectedUsers.join(', ')}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <NavBar />

      <div className="flex-1 flex flex-col">
        <header className="w-full flex items-center border-b p-4 bg-white shadow-md">
          <h1 className="text-xl font-semibold">Search Availability</h1>
        </header>

        <main className="p-6 space-y-6">
          <div className="flex flex-wrap items-center space-y-4 md:space-y-0 md:space-x-4">
            <select
              className="block w-full md:w-96 bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={selectedEvent}
              onChange={handleEventChange}
            >
              <option value="" disabled>
                Select an Event
              </option>
              {events.map((event) => (
                <option key={event.id} value={event.name}>
                  {event.name}
                </option>
              ))}
            </select>

            <Button onClick={handleSearch} disabled={loading || !selectedEvent}>
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>

          <div className="rounded-md border overflow-y-auto max-h-96">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-sm font-semibold text-gray-600 uppercase">Select</TableHead>
                  <TableHead className="text-sm font-semibold text-gray-600 uppercase">First Name</TableHead>
                  <TableHead className="text-sm font-semibold text-gray-600 uppercase">Event</TableHead>
                  <TableHead className="text-sm font-semibold text-gray-600 uppercase">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {output.length > 0 ? (
                  output.map((availability, index) => (
                    <TableRow 
                        key={index}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={!!selectedRows[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </TableCell>
                      <TableCell>{availability.user || 'N/A'}</TableCell>
                      <TableCell>{availability.event || 'N/A'}</TableCell>
                      <TableCell>{availability.date || 'N/A'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="4" className="text-center text-gray-500">
                      No availability records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleGenerateSchedule}
              disabled={!Object.values(selectedRows).some(Boolean)}
              className="mt-4"
            >
              Generate Schedule
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchAvailabilityPage;
