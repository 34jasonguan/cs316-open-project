// pages/availability.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Menu } from 'lucide-react';
import NavBar from '@/components/NavBar';
import AvailabilityForm from '@/components/AvailabilityForm';

export default function AvailabilityPage() {
  const [userID, setUserID] = useState('');
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setUserID(storedUserID);
    } else {
      router.push('/');
    }

    fetchEvents();
  }, [router]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/getEvents');
      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.statusText}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const handleLogout = () => {
    setUserID('');
    localStorage.removeItem('userID');
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <NavBar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b bg-white p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Submit Availability</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button onClick={handleLogout} variant="ghost" className="text-red-400">
              Logout
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Card >
            <CardHeader>
              <CardTitle>Submit Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <AvailabilityForm  events={events} userID={userID} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
