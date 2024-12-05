// pages/schedule.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Menu } from 'lucide-react';
import NavBar from '@/components/NavBar';
import EventList from '@/components/EventList';
import AvailabilityForm from '@/components/AvailabilityForm';
import AvailabilityHistory from '@/components/AvailabilityHistory';

export default function SchedulePage() {
  const [userID, setUserID] = useState('');
  const [hasStaffAccess, setHasStaffAccess] = useState(false);
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setUserID(storedUserID);
      checkStaffAccess(storedUserID);
    } else {
      router.push('/');
    }

    // Fetch events from the API
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
      console.log
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const checkStaffAccess = async (userID) => {
    // TODO: Implement staff access
    setHasStaffAccess(false);
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
            <h1 className="text-xl font-semibold">Schedule</h1>
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
          <Tabs defaultValue="submit-availability" className="space-y-6">
            <TabsList>
              <TabsTrigger value="submit-availability">Submit Availability</TabsTrigger>
              <TabsTrigger value="availability-history">Availability History</TabsTrigger>
            </TabsList>
            <TabsContent value="submit-availability" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <AvailabilityForm events={events} userID={userID} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="availability-history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Availability History</CardTitle>
                </CardHeader>
                <CardContent>
                  <AvailabilityHistory events={events} userID={userID} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
