import React, { useState } from 'react';
import { useRouter } from 'next/router';
<<<<<<< HEAD
import styles from './style'; // Assuming the same style file is used

const ActivityProposalForm = () => {
=======
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  GraduationCap,
  MessageSquareWarning, 
  ChevronDown,
  Menu,
  Settings,
  Search
} from "lucide-react";

export default function ActivityProposalForm() {
>>>>>>> dbdc715b18072ecbc4a4b06c492b20bf432a91ad
  const [programName, setProgramName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [description, setDescription] = useState('');
<<<<<<< HEAD
  const [isRecurring, setIsRecurring] = useState(false);
=======
  const [openSubbar, setOpenSubbar] = useState('');
>>>>>>> dbdc715b18072ecbc4a4b06c492b20bf432a91ad
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const proposalData = {
      programName,
      location,
      time,
      targetAudience,
      description,
<<<<<<< HEAD
=======
    };
    console.log(proposalData);
    router.push('/');
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
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b bg-white p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Activity Proposal</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-light text-gray-800">Propose an Activity for Your Dorm!</h2>
          </div>

          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle>Activity Proposal Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Program Name:</label>
                  <input
                    type="text"
                    value={programName}
                    onChange={(e) => setProgramName(e.target.value)}
                    placeholder="Enter program name"
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Location:</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location of the program"
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Time:</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Enter time of the program"
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Target Audience:</label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="Enter target audience (e.g., first-year students)"
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the program here"
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>

                <Button type="submit" className="w-full mt-4">
                  Submit Proposal
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}


/*import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './style'; // Assuming the same style file is used

const ActivityProposalForm = () => {
  const [programName, setProgramName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [description, setDescription] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const proposalData = {
      programName,
      location,
      time,
      targetAudience,
      description,
>>>>>>> dbdc715b18072ecbc4a4b06c492b20bf432a91ad
      isRecurring,
    };
    console.log(proposalData);
    router.push('/');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.content}>
        <h2 style={styles.heading}>Submit an Activity/Program Proposal</h2>

        <label style={styles.label}>
          Program Name:
          <input
            type="text"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            placeholder="Enter program name"
            style={styles.textArea}
          />
        </label>
        <br />

        <label style={styles.label}>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location of the program"
            style={styles.textArea}
          />
        </label>
        <br />

        <label style={styles.label}>
          Time:
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time of the program"
            style={styles.textArea}
          />
        </label>
        <br />

        <label style={styles.label}>
          Target Audience:
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="Enter target audience (e.g., first-year students)"
            style={styles.textArea}
          />
        </label>
        <br />

        <label style={styles.label}>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the program here"
            style={styles.textArea}
          />
        </label>
        <br />


        <button type="submit" style={styles.button}>Submit Proposal</button>
      </form>
    </div>
  );
};

<<<<<<< HEAD
export default ActivityProposalForm;
=======
export default ActivityProposalForm;
*/
>>>>>>> dbdc715b18072ecbc4a4b06c492b20bf432a91ad
