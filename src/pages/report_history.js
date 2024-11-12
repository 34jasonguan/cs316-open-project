import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  MessageSquareWarning,
  ChevronDown,
  Menu,
  Settings,
  Search, 
  Dices
} from "lucide-react";
import { useRouter } from 'next/router';

const ReportHistory = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchUserId, setSearchUserId] = useState('');
  const [userId, setUserId] = useState(''); // Start with empty userId
  const [openSubbar, setOpenSubbar] = useState('');
  const router = useRouter();

  // Mock report data for testing
  const mockReports = {
    admin: [
      { id: 1, type: 'Safety Issue', urgency: 'High', description: 'Fire hazard near Belltower', timestamp: '2024-10-21 14:30:00', status: 'Resolved' },
      { id: 2, type: 'Noise Complaint', urgency: 'Low', description: 'Loud music from East House, Room 204', timestamp: '2024-10-20 22:30:00', status: 'Pending' },
    ],
    user123: [
      { id: 3, type: 'Maintenance Request', urgency: 'Medium', description: 'Water leakage in restroom', timestamp: '2024-10-22 11:15:00', status: 'In Progress' },
      { id: 4, type: 'Noise Complaint', urgency: 'Medium', description: 'Construction noise during quiet hours', timestamp: '2024-10-22 14:00:00', status: 'Pending' },
    ],
    user456: [
      { id: 5, type: 'Safety Issue', urgency: 'High', description: 'Broken window in West Hall', timestamp: '2024-10-23 09:45:00', status: 'Resolved' },
    ],
  };

  useEffect(() => {
    if (userId) {
      fetchReports(userId);
    } else {
      // If no userId, clear reports
      setReports([]);
    }
  }, [userId]);

  const fetchReports = (userId) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setReports(mockReports[userId] || []);
      setLoading(false);
    }, 500);
  };

  const toggleSubbar = (name) => {
    setOpenSubbar((prev) => (prev === name ? '' : name));
  };

  const handleSearchChange = (e) => {
    setSearchUserId(e.target.value);
  };

  const handleSearch = () => {
    setUserId(searchUserId.trim());
  };

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
            <h1 className="text-xl font-semibold">Report History</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-light text-gray-800">Search Report History</h2>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-4 mb-6">
            <Input
              placeholder="Enter User ID to search reports"
              value={searchUserId}
              onChange={handleSearchChange}
              className="w-full md:w-1/3"
            />
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>

          {loading ? (
            <p className="text-gray-600">Loading report history...</p>
          ) : reports.length === 0 && userId ? (
            <p className="text-gray-600">No reports found for user "{userId}"</p>
          ) : reports.length === 0 && !userId ? (
            <p className="text-gray-600">Please enter a User ID to search for reports.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {reports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle>Report ID: {report.id}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Type:</strong> {report.type}</p>
                    <p><strong>Urgency:</strong> {report.urgency}</p>
                    <p><strong>Description:</strong> {report.description}</p>
                    <p><strong>Submitted on:</strong> {new Date(report.timestamp).toLocaleString()}</p>
                    <p><strong>Status:</strong> {report.status || 'Pending'}</p>
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

export default ReportHistory;
