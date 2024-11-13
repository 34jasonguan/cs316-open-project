import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, LayoutDashboard, Calendar as CalendarIcon, MessageSquareWarning, Dices, ChevronDown, Menu, Search } from 'lucide-react'

// Assuming you have a function to get the current user's netID
import { getCurrentUserNetID } from '/lib/auth'

export default function Schedule() {
  const [selectedTask, setSelectedTask] = useState("")
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlots, setSelectedSlots] = useState([])
  const [openSubbar, setOpenSubbar] = useState('')
  const [currentAvailability, setCurrentAvailability] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTasks()
    fetchCurrentAvailability()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    }
  }

  const fetchCurrentAvailability = async () => {
    try {
      const netid = await getCurrentUserNetID()
      const response = await fetch(`/api/availability/${netid}`)
      const data = await response.json()
      setCurrentAvailability(data)
    } catch (error) {
      console.error('Failed to fetch current availability:', error)
    }
  }

  const toggleSubbar = (name) => {
    setOpenSubbar(prev => (prev === name ? '' : name))
  }

  useEffect(() => {
    if (selectedTask) {
      const task = tasks.find(t => t.id === parseInt(selectedTask))
      setAvailableSlots(task ? task.slots : [])
      setSelectedSlots([])
    } else {
      setAvailableSlots([])
      setSelectedSlots([])
    }
  }, [selectedTask, tasks])

  const handleSlotToggle = (slot) => {
    setSelectedSlots(prev => 
      prev.some(s => s.date === slot.date && s.startTime === slot.startTime)
        ? prev.filter(s => s.date !== slot.date || s.startTime !== slot.startTime)
        : [...prev, slot]
    )
  }

  const handleSubmit = async () => {
    try {
      const netid = await getCurrentUserNetID()
      for (const slot of selectedSlots) {
        await fetch('/api/availability/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            netid,
            taskId: parseInt(selectedTask),
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime
          })
        })
      }
      fetchCurrentAvailability()
      setSelectedTask("")
      setSelectedSlots([])
    } catch (error) {
      console.error('Failed to submit availability:', error)
    }
  }

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
                      {tasks.map((task) => (
                        <SelectItem key={task.id} value={task.id.toString()}>
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
                            checked={selectedSlots.some(s => s.date === slot.date && s.startTime === slot.startTime)}
                            onCheckedChange={() => handleSlotToggle(slot)}
                          />
                          <Label htmlFor={`slot-${index}`}>
                            {new Date(slot.date).toLocaleDateString()} - {new Date(slot.startTime).toLocaleTimeString()} to {new Date(slot.endTime).toLocaleTimeString()}
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
              {currentAvailability.length > 0 ? (
                currentAvailability.map((availability) => (
                  <Card key={availability.id}>
                    <CardHeader>
                      <CardTitle>{availability.task.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{new Date(availability.date).toLocaleDateString()} - {new Date(availability.startTime).toLocaleTimeString()} to {new Date(availability.endTime).toLocaleTimeString()}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No availability submitted</p>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}