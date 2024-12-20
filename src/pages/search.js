// pages/index.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChevronDown,
  LayoutDashboard,
  Calendar,
  Search,
  MessageSquareWarning, 
  Dices, 
  GraduationCap,
  ClipboardList,
  FileText,
  DollarSign,
  Users,
  User,
  Menu,
  MoreVertical,
  Settings,
} from "lucide-react"

const taskDescriptions = {
  'Task 1': 'Given a RC id, find all of his/her RAs (e.g. pa543)',
  'Task 2': 'Given a RA id, find all of his/her residents (e.g. kj240)',
  'Task 3': 'Given a dorm location, find all activity taking at that place (e.g. Belltower)',
  'Task 4': 'Given a RA id, find his/her availability',
};

const HomePage = () => {
    const [taskInput, setTaskInput] = useState('');
    const [output, setOutput] = useState('');
    const [userID, setUserID] = useState('');
    const [openSubbar, setOpenSubbar] = useState('');
    const [hasStaffAccess, setHasStaffAccess] = useState(false);

    useEffect(() => {
      const storedUserID = localStorage.getItem('userID');
      const storedHasStaffAcess = (localStorage.getItem('hasStaffAccess') === 'true');
      if (storedUserID) {
        setUserID(storedUserID);
        setHasStaffAccess(storedHasStaffAcess);
      }
    }, []);

    const toggleSubbar = (name) => {
      setOpenSubbar(prev => (prev === name ? '' : name));
    };

    const handleTaskChange = (event) => {
        setSelectedTask(event.target.value);
        setOutput('');
    };

    const handleInputChange = (event) => {
        setTaskInput(event.target.value);
    };

    const handleGenerateOutput = async () => {
        try {
          const response = await fetch(`/api/getUsersByClassNetID?inputValue=${taskInput}`);
          
          if (response.ok) {
            const residents = await response.json();
            setOutput(residents);
          } else {
            const errorData = await response.json();
            setOutput([{ studentFirstName: 'Error', studentLastName: errorData.message || 'An error occurred' }]);
          }
        } catch (error) {
          console.error('Error fetching residents:', error);
          setOutput([{ studentFirstName: 'Error', studentLastName: 'Failed to fetch residents' }]);
        }
      };

    const handleLogout = () => {
        setUserID('');
        localStorage.removeItem('userID');
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
              <Calendar className="h-5 w-5" />
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
    <div className="flex-1 flex flex-col">
        <header className="w-full flex items-center border-b p-4 bg-white shadow-md">
        <h1 className="text-xl font-semibold">User Search</h1>
        <div className="ml-auto flex items-center space-x-4">
        {userID ? (
        <div className="flex items-center space-x-4">
            <span>Hello, {userID}!</span>
            <Button onClick={handleLogout} variant="ghost" className="text-red-400">Logout</Button>
        </div>
        ) : (
        <div className="flex space-x-4">
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="hover:underline">Register</Link>
        </div>
        )}
        </div>
        </header>

        <main className="p-6 space-y-6">
          <div className="flex flex-wrap items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-96">
                <Input 
                    placeholder="Search a person in the residential system by NetID" 
                    type="search" 
                    onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button onClick={handleGenerateOutput}>Search</Button>
              </div>             
            </div>

            {/* Residents Table */}
            <div className="rounded-md border overflow-y-auto max-h-96">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px] text-sm font-semibold text-gray-600 uppercase"></TableHead>
                    <TableHead className="text-sm font-semibold text-gray-600 uppercase">First Name</TableHead>
                    <TableHead className="text-sm font-semibold text-gray-600 uppercase">Last Name</TableHead>
                    <TableHead className="text-sm font-semibold text-gray-600 uppercase">Netid</TableHead>
                    <TableHead className="text-sm font-semibold text-gray-600 uppercase">Position</TableHead>
                    <TableHead className="text-sm font-semibold text-gray-600 uppercase">Contact</TableHead>
                    <TableHead className="text-sm font-semibold text-gray-600 uppercase">Email</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {output.length > 0 ? (
                    output.map((resident, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <div className="flex items-center justify-center">
                                <svg
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="#00247D"
                                xmlns="http://www.w3.org/2000/svg"
                                className="rounded-full"
                                >
                                <path d="M12 2C10.3431 2 9 3.34315 9 5C9 6.65685 10.3431 8 12 8C13.6569 8 15 6.65685 15 5C15 3.34315 13.6569 2 12 2ZM12 10C9.23858 10 7 12.2386 7 15V20H17V15C17 12.2386 14.7614 10 12 10Z" />
                                </svg>
                            </div>
                        </TableCell>
                        <TableCell>{resident.firstname || "N/A"}</TableCell>
                        <TableCell>{resident.lastname || "N/A"}</TableCell>
                        <TableCell>{resident.netID || "N/A"}</TableCell>
                        <TableCell>{resident.class || "N/A"}</TableCell>
                        <TableCell>{(hasStaffAccess) ? (resident.phone || "N/A") : ("-")}</TableCell>
                        <TableCell>{(hasStaffAccess) ? (resident.email || "N/A") : ("-")}</TableCell>
                        <TableCell>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan="6" className="text-center text-gray-500">No residents found</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </div>
          </main>
        </div>
      </div>
    );
  };

export default HomePage;
