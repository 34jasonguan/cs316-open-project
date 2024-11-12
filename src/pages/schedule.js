import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  LayoutDashboard,
  Calendar as CalendarIcon,
  BookOpen,
  GraduationCap,
  MessageSquareWarning, 
  Dices, 
  FileText,
  DollarSign,
  Info,
  ChevronDown,
  Menu,
  Search
} from "lucide-react"

export default function Schedule() {
  const [date, setDate] = useState(new Date())
  const [selectedTask, setSelectedTask] = useState("")
  const [openSubMenu, setOpenSubMenu] = useState("")
  const [openSubbar, setOpenSubbar] = useState('');

  const toggleSubbar = (name) => {
    setOpenSubbar(prev => (prev === name ? '' : name));
  };

  const tasks = [
    "Floor Rounds",
    "Resident Check-in",
    "Community Event",
    "RA Meeting",
    "Office Hours"
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col bg-[#00247D] text-white md:flex">
          <div className="p-4 border-b border-white/10">
            <h1 className="text-xl font-bold">Team RAvolution</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <a href="/" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            <a href="/search" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
              <Search className="h-5 w-5" />
              <span>Search User</span>
            </a>
            <a href="/schedule" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
              <CalendarIcon className="h-5 w-5" />
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
                  <a href="#" className="block px-3 py-2 rounded-lg hover:bg-white/10">Activity History</a>
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
            <h1 className="text-xl font-semibold">Schedule</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-light text-gray-800">Manage Your Availability</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Task</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setSelectedTask} value={selectedTask}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a task" />
                  </SelectTrigger>
                  <SelectContent>
                    {tasks.map((task) => (
                      <SelectItem key={task} value={task}>
                        {task}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Button className="w-full">
              Save Availability
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}