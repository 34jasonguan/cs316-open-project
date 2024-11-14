import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
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

const SafetyReportForm = () => {
  const [reportType, setReportType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [location, setLocation] = useState(''); 
  const [equipment, setEquipment] = useState(''); 
  const [safetyIssueType, setSafetyIssueType] = useState(''); 
  const [otherIssue, setOtherIssue] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openSubbar, setOpenSubbar] = useState('');
  const router = useRouter();
  const maxDescriptionLength = 200;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const reportData = {
      type: reportType,
      urgency,
      description,
      isAnonymous,
      submitted_by: isAnonymous ? null : 'admin', 
      location, 
      issueType: safetyIssueType === 'Other' ? otherIssue : safetyIssueType,
      equipment: reportType === 'Maintenance Request' ? equipment : null,
    };
  
    try {
      const response = await fetch('/api/insertReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });
  
      if (response.ok) {
        console.log('Report submitted successfully');
        setIsSubmitted(true); 
        setTimeout(() => {
          setIsSubmitted(false);
          router.push('/');
        }, 2000);
      } else {
        console.error('Failed to submit report');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };  

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const renderTemplateFields = () => {
    switch (reportType) {
      case 'Noise Complaint':
        return (
          <div>
            <label className="block text-gray-700">Location:</label>
            <input
              type="text"
              placeholder="Enter location of noise"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        );
      case 'Safety Issue':
        return (
          <>
            <div>
              <label className="block text-gray-700">Safety Issue Type:</label>
              <select
                value={safetyIssueType}
                onChange={(e) => setSafetyIssueType(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select an issue</option>
                <option value="slip">Slip/Fall</option>
                <option value="fire">Fire Hazard</option>
                <option value="suspicious">Suspicious Activity</option>
                <option value="smoke">Smoke Detected</option>
                <option value="Other">Other (please specify)</option>
              </select>
            </div>
            {safetyIssueType === 'Other' && (
              <div>
                <label className="block text-gray-700">Please specify:</label>
                <input
                  type="text"
                  value={otherIssue}
                  onChange={(e) => setOtherIssue(e.target.value)}
                  placeholder="Describe the issue"
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700">Location:</label>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
              />
            </div>
          </>
        );
      case 'Maintenance Request':
        return (
          <>
            <div>
              <label className="block text-gray-700">Equipment/Facility:</label>
              <input
                type="text"
                placeholder="Enter equipment needing repair"
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-gray-700">Location:</label>
              <textarea
                placeholder="Enter Location"
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const toggleSubbar = (name) => {
    setOpenSubbar((prev) => (prev === name ? '' : name));
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
                <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${openSubbar === 'activityInfo' ? 'rotate-180' : ''}`} />
              </div>
              {openSubbar === 'activityInfo' && (
                <div className="ml-8 space-y-1">
                  <a href="/proposal" className="block px-3 py-2 rounded-lg hover:bg-white/10">Proposal Form</a>
                  <a href="/activity_proposal" className="block px-3 py-2 rounded-lg hover:bg-white/10">Activity History</a>
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
            <h1 className="text-xl font-semibold">Safety Report</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-light text-gray-800">Submit a Safety Report</h2>
          </div>

          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle>Safety Report Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center">
                  <label className="block text-gray-700 mr-2">Submit Anonymously:</label>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Report Type:</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    <option value="">Select a type</option>
                    <option value="Noise Complaint">Noise Complaint</option>
                    <option value="Safety Issue">Safety Issue</option>
                    <option value="Maintenance Request">Maintenance Request</option>
                  </select>
                </div>

                {renderTemplateFields()}

                <div>
                  <label className="block text-gray-700">Urgency Level:</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    <option value="">Select urgency</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700">Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue here"
                    maxLength={200}
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  <p className="text-sm text-gray-500">
                    {description.length}/200 characters
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700">Attachment (optional):</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full mt-1"
                  />
                </div>

                <Button type="submit" className="w-full mt-4">
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>

          {isSubmitted && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-md text-center">
                <p>Your report has been submitted successfully!</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SafetyReportForm;
