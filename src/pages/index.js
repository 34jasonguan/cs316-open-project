// pages/index.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './style'

const taskDescriptions = {
  'Task 1': 'Given a RC id, find all of his/her RAs (e.g. pa543)',
  'Task 2': 'Given a RA id, find all of his/her residents (e.g. kj240)',
  'Task 3': 'Given a dorm location, find all activity taking at that place (e.g. Belltower)',
  'Task 4': 'Given a RA id, find his/her availability',
  // 'Task 5': 'Given a resident name, find his/her report history'
};

const HomePage = () => {
    const [selectedTask, setSelectedTask] = useState('Task 1');
    const [taskInput, setTaskInput] = useState('');
    const [output, setOutput] = useState('');
    const [userID, setUserID] = useState('');

    useEffect(() => {
      const storedUserID = localStorage.getItem('userID');
      if (storedUserID) {
        setUserID(storedUserID);
      }
    }, []);

    const handleTaskChange = (event) => {
        setSelectedTask(event.target.value);
        setOutput('');
    };

    const handleInputChange = (event) => {
        setTaskInput(event.target.value);
    };

    const handleGenerateOutput = async () => {
      let generatedOutput = ':)';

      if (selectedTask === 'Task 1') {
        try {
          const rcNetID = taskInput;

          const response = await fetch(`/api/getRAs?rcNetID=${rcNetID}`);
          
          if (response.ok) {
            const RAs = await response.json();
            
            if (RAs.length > 0) {
              generatedOutput = RAs
                .map(RA => `${RA.raFirstName} ${RA.raLastName} (${RA.raNetID})`)
                .join('\n');
            } else {
              generatedOutput = 'No RA found for this RC.';
            }
          } else {
            const errorData = await response.json();
            generatedOutput = errorData.message || 'An error occurred';
          }
        } catch (error) {
          console.error('Error fetching RA:', error);
          generatedOutput = 'Failed to fetch RA.';
        }
      }

      if (selectedTask === 'Task 2') {
        try {
          const raNetID = taskInput;
          const response = await fetch(`/api/getResidents?raNetID=${raNetID}`);
          
          if (response.ok) {
            const residents = await response.json();

            if (residents.length > 0) {
              generatedOutput = residents
                .map(resident => `${resident.studentFirstName} ${resident.studentLastName} (${resident.studentNetID})`)
                .join('\n');
            } else {
              generatedOutput = 'No resident found for this RA.';
            }
          } else {
            const errorData = await response.json();
            generatedOutput = errorData.message || 'An error occurred';
          }
        } catch (error) {
          console.error('Error fetching residents:', error);
          generatedOutput = 'Failed to fetch resident.';
        }
      }

      if (selectedTask === 'Task 3') {
        try {
          const buildingName = taskInput;
          const response = await fetch(`/api/getActivities?buildingName=${buildingName}`);
          
          if (response.ok) {
            const activities = await response.json();

            if (activities.length > 0) {
              generatedOutput = activities
                .map(activity => `${activity.name} takes place at ${activity.time} ${activity.date} in room ${activity.room_number} `)
                .join('\n');
            } else {
              generatedOutput = 'No acitivty found for this building.';
            }
          } else {
            const errorData = await response.json();
            generatedOutput = errorData.message || 'An error occurred';
          }
        } catch (error) {
          console.error('Error fetching activites:', error);
          generatedOutput = 'Failed to fetch activity.';
        }
      }

      if (selectedTask === 'Task 4') {
        try {
          const netID = taskInput;
          const response = await fetch(`/api/getAvailability?netID=${netID}`);
          
          if (response.ok) {
            const availability = await response.json();

            if (availability.length > 0) {
              generatedOutput = availability
                .map(date => `${date.available_date} `)
                .join('\n');
            } else {
              generatedOutput = 'No available date.';
            }
          } else {
            const errorData = await response.json();
            generatedOutput = errorData.message || 'An error occurred';
          }
        } catch (error) {
          console.error('Error fetching availability:', error);
          generatedOutput = 'Failed to fetch availability.';
        }
      }
      setOutput(generatedOutput);
    };

    const handleLogout = () => {
        setUserID('');
        localStorage.removeItem('userID');
    };

    return (
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 p-6 bg-white shadow-lg flex-shrink-0">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          {userID ? (
            <>
              <Link href="/calendar" className="flex items-center mb-2 text-gray-700 hover:text-blue-600">
                <svg className="h-8 w-8 text-black-500 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Availability
              </Link>
              <Link href="/report" className="flex items-center mb-2 text-gray-700 hover:text-blue-600">
                <svg className="h-8 w-8 text-black-500 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              Report
              </Link>
              <Link href="/proposal" className="flex items-center mb-2 text-gray-700 hover:text-blue-600">
              <svg className="h-8 w-8 text-black-500 mr-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M3 12h1M12 3v1M20 12h1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7" />
                <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
                <line x1="9.7" y1="17" x2="14.3" y2="17" />
              </svg>
              Activity
              </Link>
            </>
          ) : (
            <p className="text-gray-500">Login required for additional features</p>
          )}
        </aside>
  
        {/* Main Content Area */}
        <div className="flex-grow flex flex-col">
          <header className="w-full flex justify-end p-4 bg-white text-white shadow-md">
            {userID ? (
              <div className="flex items-center space-x-4">
                <span>
                <a class="text-black">Hello, {userID}</a></span>
                <button onClick={handleLogout} className="text-red-400 hover:underline">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link href="/login" className="hover:underline text-black">Login</Link>
                <Link href="/register" className="hover:underline text-black">Register</Link>
              </div>
            )}
          </header>
  
          <main className="flex flex-col items-center w-full max-w-4xl p-6 bg-white shadow-md rounded-lg mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Development Page for CS 316 Open Project</h1>
  
            <label htmlFor="task-select" className="block text-gray-700 mb-2 font-semibold">Choose a Task:</label>
            <select
              id="task-select"
              value={selectedTask}
              onChange={handleTaskChange}
              className="w-full p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(taskDescriptions).map((task, index) => (
                <option key={index} value={task}>{task}</option>
              ))}
            </select>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Task Description</h3>
                <p className="mb-4">{taskDescriptions[selectedTask]}</p>
                <button
                  onClick={handleGenerateOutput}
                  className="px-4 py-2 bg-stone-800 text-white rounded-lg hover:bg-blue-700"
                >
                  Generate Output
                </button>
              </div>
  
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Task Input</h3>
                <textarea
                  rows="5"
                  placeholder="Enter task-related input here"
                  value={taskInput}
                  onChange={handleInputChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
  
            <div className="mt-6 w-full">
              <h3 className="text-lg font-semibold text-gray-700">Output</h3>
              <pre className="w-full p-4 bg-gray-100 rounded-lg border border-gray-300 overflow-x-auto whitespace-pre-wrap">{output}</pre>
            </div>
          </main>
        </div>
      </div>
    );
  };
  
  export default HomePage;