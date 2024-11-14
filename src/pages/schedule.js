import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, LayoutDashboard, Calendar as CalendarIcon, MessageSquareWarning, Dices, ChevronDown, Menu, Search } from 'lucide-react'

// Mock data for tasks and their available slots
const tasksData = [
  {
    id: 1,
    name: "RA On-Call Hours",
    slots: [
      { date: "2023-11-15", time: "19:00-07:00" },
      { date: "2023-11-16", time: "19:00-07:00" },
      { date: "2023-11-17", time: "19:00-07:00" },
    ]
  },
  {
    id: 2,
    name: "Floor Rounds",
    slots: [
      { date: "2023-11-15", time: "21:00-22:00" },
      { date: "2023-11-16", time: "21:00-22:00" },
      { date: "2023-11-17", time: "21:00-22:00" },
    ]
  },
  {
    id: 3,
    name: "Resident Check-in",
    slots: [
      { date: "2023-11-18", time: "14:00-16:00" },
      { date: "2023-11-19", time: "14:00-16:00" },
    ]
  },
]

const mockCurrentAvailability = {
  "RA On-Call Hours": [
  ],
  "Floor Rounds": [
  ],
  "Resident Check-in": [],
}

export default function Schedule() {
  const [selectedTask, setSelectedTask] = useState("")
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlots, setSelectedSlots] = useState([])
  const [openSubbar, setOpenSubbar] = useState('')
  const [currentAvailability, setCurrentAvailability] = useState(mockCurrentAvailability)

  const toggleSubbar = (name) => {
    setOpenSubbar(prev => (prev === name ? '' : name))
  }

  useEffect(() => {
    if (selectedTask) {
      const task = tasksData.find(t => t.name === selectedTask)
      setAvailableSlots(task ? task.slots : [])
      setSelectedSlots([])
    } else {
      setAvailableSlots([])
      setSelectedSlots([])
    }
  }, [selectedTask])

  const handleSlotToggle = (slot) => {
    setSelectedSlots(prev => 
      prev.some(s => s.date === slot.date && s.time === slot.time)
        ? prev.filter(s => s.date !== slot.date || s.time !== slot.time)
        : [...prev, slot]
    )
  }

  const handleSubmit = async () => {
    console.log({
      task: selectedTask,
      selectedSlots: selectedSlots,
    })
    
    setCurrentAvailability(prev => ({
      ...prev,
      [selectedTask]: selectedSlots
    }))

    setSelectedTask("")
    setSelectedSlots([])
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col bg-[#00247D] text-white md:flex">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-bold">Team RAvolution</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="/dashboard" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
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
                <a href="/report" className="block px-3 py-2 rounded-lg hover:bg-white/10">Submit Report</a>
                <a href="/report_history" className="block px-3 py-2 rounded-lg hover:bg-white/10">Report History</a>
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

          <Tabs defaultValue="submit" className="space-y-4">
            <TabsList>
              <TabsTrigger value="submit">Submit Availability</TabsTrigger>
              <TabsTrigger value="view">View Current Availability</TabsTrigger>
            </TabsList>
            <TabsContent value="submit" className="space-y-4">
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
                      {tasksData.map((task) => (
                        <SelectItem key={task.id} value={task.name}>
                          {task.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {selectedTask && (
                <Card>
                  <CardHeader>
                    <CardTitle>Available Time Slots</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {availableSlots.map((slot, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox
                            id={`slot-${index}`}
                            checked={selectedSlots.some(s => s.date === slot.date && s.time === slot.time)}
                            onCheckedChange={() => handleSlotToggle(slot)}
                          />
                          <Label htmlFor={`slot-${index}`}>
                            {slot.date} - {slot.time}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button 
                onClick={handleSubmit}
                className="w-full bg-[#00247D] hover:bg-[#001e66] text-white"
                disabled={selectedSlots.length === 0}
              >
                Save Availability
              </Button>
            </TabsContent>
            <TabsContent value="view" className="space-y-4">
              {Object.entries(currentAvailability).map(([task, slots]) => (
                <Card key={task}>
                  <CardHeader>
                    <CardTitle>{task}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {slots.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {slots.map((slot, index) => (
                          <li key={index}>{slot.date} - {slot.time}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No availability submitted</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}