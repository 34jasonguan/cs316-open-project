"use client"

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, CalendarIcon, MessageSquareWarning, ChevronDown, Menu, Settings, Search, Building } from 'lucide-react';
import { useRouter } from 'next/router';

const ActivityHistory = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchBuildingName, setSearchBuildingName] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [openSubbar, setOpenSubbar] = useState('');
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

  const toggleSubbar = (name) => {
    setOpenSubbar((prev) => (prev === name ? '' : name));
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
      <div className="hidden w-64 flex-col bg-[#00247D] text-white md:flex">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-bold">ResiDevils</h1>
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
              <ChevronDown
                className={`h-4 w-4 ml-auto transition-transform ${
                  openSubbar === 'reportInfo' ? 'rotate-180' : ''
                }`}
              />
            </div>
            {openSubbar === 'reportInfo' && (
              <div className="ml-8 space-y-1">
                <a href="/report" className="block px-3 py-2 rounded-lg hover:bg-white/10">
                  Submit Report
                </a>
                <a href="/report_history" className="block px-3 py-2 rounded-lg hover:bg-white/10">
                  Report History
                </a>
              </div>
            )}
          </div>
          <a href="/activity_history" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-white/10">
            <Building className="h-5 w-5" />
            <span>Activity History</span>
          </a>
        </nav>
      </div>

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