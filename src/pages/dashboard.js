import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, MapPin, Calendar, Clock, AlertCircle, Menu } from 'lucide-react'
import NavBar from "@/components/NavBar"

export default function Dashboard() {
  const [userID, setUserID] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [dorm, setDorm] = useState('');
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    const storedUserFirstName = localStorage.getItem('userFirstName');
    if (storedUserID) {
      setUserID(storedUserID);
      fetchUserDorm(storedUserID);
      setUserFirstName(storedUserFirstName);
    } else {
      router.push('/');
    }
  }, [router]);

  const fetchUserDorm = async (userID) => {
    try {
      const response = await fetch(`/api/getUserDorm?userID=${userID}`);
      const data = await response.json();
      if (response.ok) {
        setDorm(data.dorm);
        fetchEvents(data.dorm);
      } else {
        console.error("Failed to fetch user dorm:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user dorm:", error);
    }
  };

  const fetchEvents = async (dorm) => {
    try {
      const response = await fetch(`/api/getActivities?buildingName=${dorm}`);
      const data = await response.json();
      if (response.ok) {
        setEvents(data);
      } else {
        console.error("Failed to fetch events:", data.message);
        setEvents([]);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setEvents([]);
    }
  };

  const tasks = [
    {
      name: "Submit Weekly Report",
      status: "Due Today",
      priority: "high",
      dueDate: "Mar 15, 2024",
    },
    {
      name: "Floor Meeting Notes",
      status: "In Progress",
      priority: "medium",
      dueDate: "Mar 16, 2024",
    },
    {
      name: "Update Resident Directory",
      status: "Pending",
      priority: "low",
      dueDate: "Mar 18, 2024",
    },
  ]

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
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {userID ? (
              <div>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button onClick={handleLogout} variant="ghost" className="text-red-400">Logout</Button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link href="/" className="hover:underline">Login</Link>
                <Link href="/register" className="hover:underline">Register</Link>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {userID && (
            <div className="mb-6">
              <h2 className="text-3xl font-light text-gray-800">Hello {userFirstName}!</h2>
              {dorm && <p className="text-lg text-gray-600">Dorm: {dorm}</p>}
            </div>
          )}
          <Tabs defaultValue="general" className="space-y-6">
            <TabsContent value="general" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {events.length > 0 ? (
                        events.map((event, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{event.name}</p>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {event.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                Room {event.room_number}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {event.date}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No events found for your dorm.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tasks.map((task) => (
                        <div
                          key={task.name}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{task.name}</p>
                              {task.priority === 'high' && (
                                <AlertCircle className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{task.dueDate}</p>
                          </div>
                          <span className={`text-sm ${
                            task.status === 'Due Today' ? 'text-red-500' :
                            task.status === 'In Progress' ? 'text-yellow-500' :
                            'text-muted-foreground'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

