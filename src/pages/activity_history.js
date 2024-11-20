"use client"

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, CalendarIcon, MessageSquareWarning, ChevronDown, Menu, Settings, Search, Building } from 'lucide-react';
import { useRouter } from 'next/router';
import NavBar from "@/components/Navbar"

const ActivityHistory = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchBuildingName, setSearchBuildingName] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (buildingName) {
      fetchActivities(buildingName);
    } else {
      setActivities([]);
    }
  }, [buildingName]);

  const fetchActivities = async (buildingName) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/getActivities?buildingName=${encodeURIComponent(buildingName)}`);
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      } else {
        console.error('Failed to fetch activities');
        setActivities([]);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchBuildingName(e.target.value);
  };

  const handleSearch = () => {
    setBuildingName(searchBuildingName.trim());
  };

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
            <h1 className="text-xl font-semibold">Activity History</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-light text-gray-800">Search Activity History</h2>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-4 mb-6">
            <Input
              placeholder="Enter Building Name to search activities"
              value={searchBuildingName}
              onChange={handleSearchChange}
              className="w-full md:w-1/3"
            />
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>

          {loading ? (
            <p className="text-gray-600">Loading activity history...</p>
          ) : activities.length === 0 && buildingName ? (
            <p className="text-gray-600">No activities found for building "{buildingName}"</p>
          ) : activities.length === 0 && !buildingName ? (
            <p className="text-gray-600">Please enter a Building Name to search for activities.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {activities.map((activity, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{activity.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Date:</strong> {activity.date}</p>
                    <p><strong>Time:</strong> {activity.time}</p>
                    <p><strong>Room Number:</strong> {activity.room_number}</p>
                    <p><strong>Building:</strong> {buildingName}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ActivityHistory;