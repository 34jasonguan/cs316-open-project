import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  MapPin,
  Calendar,
  Clock,
  ExternalLink,
  AlertCircle,
  User,
  LayoutDashboard,
  MessageSquareWarning,
  Dices,
  GraduationCap,
  ChevronDown,
  Menu,
  Search
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("general")
  const [openSubMenu, setOpenSubMenu] = useState("")

  const [taskInput, setTaskInput] = useState('');
  const [output, setOutput] = useState('');
  const [userID, setUserID] = useState('');
  const [openSubbar, setOpenSubbar] = useState('');
  const [hasStaffAccess, setHasStaffAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, []);

  const toggleSubbar = (name) => {
        setOpenSubbar(prev => (prev === name ? '' : name));
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

  const upcomingEvents = [
    {
      name: "Floor Community Meeting",
      location: "Trinity Common Room",
      time: "Mon 7:00 pm - 8:00 pm",
      dates: "Mar 15, 2024",
      type: "Required",
    },
    {
      name: "RA Training Session",
      location: "Student Center 201",
      time: "Wed 3:00 pm - 5:00 pm",
      dates: "Mar 17, 2024",
      type: "Required",
    },
    {
      name: "Wellness Workshop",
      location: "Bell Tower Lounge",
      time: "Fri 4:00 pm - 5:30 pm",
      dates: "Mar 19, 2024",
      type: "Optional",
    },
  ]

  const handleLogout = () => {
    setUserID('');
    localStorage.removeItem('userID');
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="hidden w-64 flex-col bg-[#00247D] text-white md:flex">
          <div className="p-4 border-b border-white/10">
            <h1 className="text-xl font-bold">Team RAvolution</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            <a href="/search" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
              <Search className="h-5 w-5" />
              <span>Search User</span>
            </a>
            <a href="/schedule" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
              <Calendar className="h-5 w-5" />
              <span>Schedule</span>
            </a>
            <div className="space-y-2">
              <div
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
                onClick={() => toggleSubbar('reportInfo')}
              >
                <MessageSquareWarning className="h-5 w-5" />
                <span>Report</span>
                <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${openSubbar === 'reportInfo' ? 'rotate-180' : ''}`} />
              </div>
              {openSubbar === 'reportInfo' && (
                <div className="ml-8 space-y-1">
                  <a href="\report" className="block px-3 py-2 rounded-lg hover:bg-white/10">Submit Report</a>
                  <a href="\report_history" className="block px-3 py-2 rounded-lg hover:bg-white/10">Report History</a>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
                onClick={() => toggleSubbar('activityInfo')}
              >
                <Dices className="h-5 w-5" />
                <span>Activity</span>
                <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${openSubbar === 'activityInfo' ? 'rotate-180' : ''}`} />
              </div>
              {openSubbar === 'activityInfo' && (
                <div className="ml-8 space-y-1">
                  <a href="/proposal" className="block px-3 py-2 rounded-lg hover:bg-white/10">Proposal Form</a>
                  <a href="/activity_history" className="block px-3 py-2 rounded-lg hover:bg-white/10">Activity History</a>
                </div>
              )}
            </div>
            
          </nav>
        </div>

      {/* Main Content */}
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
          {userID && (<div className="mb-6"><h2 className="text-3xl font-light text-gray-800">Hello {userID}!</h2></div>)}

          <Tabs defaultValue="general" className="space-y-6">
            <div className="flex items-center justify-between">
            </div>

            <TabsContent value="general" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
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

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{event.name}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              event.type === 'Required' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {event.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {event.dates}
                          </div>
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