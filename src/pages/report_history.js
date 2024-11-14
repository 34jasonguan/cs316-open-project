// pages/report_history.js

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
  Dices,
} from "lucide-react";
import { useRouter } from 'next/router';

const ReportHistory = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchUserId, setSearchUserId] = useState('');
  const [searchReportId, setSearchReportId] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchUrgency, setSearchUrgency] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [openSubbar, setOpenSubbar] = useState('');
  const router = useRouter();

  const fetchReports = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (searchUserId.trim()) {
        params.append('userId', searchUserId.trim());
      }
      if (searchReportId.trim()) {
        params.append('reportId', searchReportId.trim());
      }
      if (searchType) {
        params.append('type', searchType);
      }
      if (searchUrgency) {
        params.append('urgency', searchUrgency);
      }
      if (inputValue.trim()) {
        params.append('inputValue', inputValue.trim());
      }

      const response = await fetch(`/api/getReports?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      } else {
        console.error('Failed to fetch reports');
        setReports([]);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSubbar = (name) => {
    setOpenSubbar((prev) => (prev === name ? '' : name));
  };

  const handleSearch = () => {
    fetchReports();
  };

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
              <ChevronDown
                className={`h-4 w-4 ml-auto transition-transform ${
                  openSubbar === 'activityInfo' ? 'rotate-180' : ''
                }`}
              />
            </div>
            {openSubbar === 'activityInfo' && (
              <div className="ml-8 space-y-1">
                <a href="/proposal" className="block px-3 py-2 rounded-lg hover:bg-white/10">
                  Proposal Form
                </a>
                <a href="/activity_history" className="block px-3 py-2 rounded-lg hover:bg-white/10">
                  Activity History
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input
              placeholder="User ID"
              value={searchUserId}
              onChange={(e) => setSearchUserId(e.target.value)}
            />
            <Input
              placeholder="Report ID"
              value={searchReportId}
              onChange={(e) => setSearchReportId(e.target.value)}
            />
            <Input
              placeholder="Keyword (Description or Location)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div>
              <label className="text-grey-700">Type:</label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-black text-black rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">All Types</option>
                <option value="Noise Complaint">Noise Complaint</option>
                <option value="Safety Issue">Safety Issue</option>
                <option value="Maintenance Request">Maintenance Request</option>
              </select>
            </div>
            <div>
              <label className="text-grey-700">Urgency:</label>
              <select
                value={searchUrgency}
                onChange={(e) => setSearchUrgency(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-black text-black rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">All Urgencies</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            
              <Button onClick={handleSearch} className="w-full md:w-auto mt-4">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            

          </div>

          {loading ? (
            <p className="text-gray-600">Loading report history...</p>
          ) : reports.length === 0 ? (
            <p className="text-gray-600">No reports found for the provided criteria.</p>
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
                    <p><strong>Location:</strong> {report.location}</p>
                    <p><strong>Submitted by:</strong> {report.is_anonymous ? 'Anonymous' : report.submitted_by}</p>
                    <p><strong>Submitted on:</strong> {new Date(report.timestamp).toLocaleString()}</p>
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
