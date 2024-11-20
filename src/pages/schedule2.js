import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, LayoutDashboard, Calendar as CalendarIcon, MessageSquareWarning, Dices, ChevronDown, Menu, Search } from 'lucide-react'
import NavBar from "@/components/Navbar"

// Assuming you have a function to get the current user's netID
import { getCurrentUserNetID } from '/lib/auth'

export default function Schedule() {
  const [selectedTask, setSelectedTask] = useState("")
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlots, setSelectedSlots] = useState([])
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
      <NavBar />

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