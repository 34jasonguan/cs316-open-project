// pages/index.js

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from './Context'; // Adjust the path as needed

const Staff = {
    "u1": true,
    "u2": false,
    "u3": true,
}

const taskDescriptions = {
  'Task 1': 'Given a RC id, find all of his/her RAs',
  'Task 2': 'Given a RA id, find all of his/her residents',
  'Task 3': 'Given a dorm location, find all activity taking at that place',
  'Task 4': 'Given a RA id, find his/her availability',
  'Task 5': 'Given a resident name, find his/her report history',
  'Task 6': 'Given a resident username, check whether the inputed password matches the one in record'
};

const HomePage = () => {
    // State to hold the selected task and input/output values
    const [selectedTask, setSelectedTask] = useState('Task 1');
    const [taskInput, setTaskInput] = useState('');
    const [output, setOutput] = useState('');
    
    // Username indicating login status and access level
    const { username } = useUser(); // Access username from context

    // Array of task descriptions
    const taskDescriptions = {
        'Task 1': 'Given a RC id, find all of his/her RAs',
        'Task 2': 'Given a RA id, find all of his/her residents',
        'Task 3': 'Given a dorm location, find all activity taking at that place',
        'Task 4': 'Given a RA id, find his/her availability',
        'Task 5': 'Given a resident name, find his/her report history',
        'Task 6': 'Given a resident username, check whether the inputed password matches the one in record'
    };

    // Handle task selection
    const handleTaskChange = (event) => {
        setSelectedTask(event.target.value);
        setOutput('');
    };

    // Handle task input change
    const handleInputChange = (event) => {
        setTaskInput(event.target.value);
    };

    // Handle button click to generate output based on selected task and input
    const handleGenerateOutput = async () => {
      let generatedOutput = ':)';

      if (selectedTask === 'Task 1') {
        try {
          const rcNetID = taskInput;  // Assuming taskInput contains the RA ID input by the user
          
          // Fetch residents by RA ID using the API route
          const response = await fetch(`/api/getRAs?raNetID=${rcNetID}`);
          
          if (response.ok) {
            const RAs = await response.json();
            
            // Format the output to display the list of residents
            if (residents.length > 0) {
              generatedOutput = residents
                .map(resident => `${resident.studentFirstName} ${resident.studentLastName} (${resident.studentNetID})`)
                .join('\n');
            } else {
              generatedOutput = 'No RA found for this RC.';
            }
          } else {
            const errorData = await response.json();
            generatedOutput = errorData.message || 'An error occurred';
          }
        } catch (error) {
          console.error('Error fetching residents:', error);
          generatedOutput = 'Failed to fetch RA.';
        }
      }

      if (selectedTask === 'Task 2') {
        try {
          const raNetID = taskInput;  // Assuming taskInput contains the RA ID input by the user
          
          // Fetch residents by RA ID using the API route
          const response = await fetch(`/api/getResidents?raNetID=${raNetID}`);
          
          if (response.ok) {
            const residents = await response.json();
            
            // Format the output to display the list of residents
            if (residents.length > 0) {
              generatedOutput = residents
                .map(resident => `${resident.studentFirstName} ${resident.studentLastName} (${resident.studentNetID})`)
                .join('\n');
            } else {
              generatedOutput = 'No residents found for this RA.';
            }
          } else {
            const errorData = await response.json();
            generatedOutput = errorData.message || 'An error occurred';
          }
        } catch (error) {
          console.error('Error fetching residents:', error);
          generatedOutput = 'Failed to fetch residents.';
        }
      }

      if (selectedTask === 'Task 6') {
        generatedOutput = Staff[taskInput] ? 'Staff' : 'Resident';
    }
      setOutput(generatedOutput);
    };

    const handleLogout = () => {
        setUsername('');
    };

    return (
        <div>
            <div style={{ padding: '20px', textAlign: 'right' }}>
                    {username === '' ? (
                        <Link href="/login" style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                            Login
                        </Link>
                    ) : (
                        <div>
                            <label>Hello, {username}</label>
                            {/* Conditionally display the availability selection link if logged in */}
                            <div style={{ marginTop: '10px' }}>
                                <Link href="/availability" style={{ cursor: 'pointer', color: 'green', textDecoration: 'underline' }}>
                                    Select Availability
                                </Link>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <Link href="/safety_report" style={{ cursor: 'pointer', color: 'green', textDecoration: 'underline' }}>
                                    Submit Report
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Development Page for CS 316 Open Project</h1>

                {/* Task Selection Dropdown */}
                <label htmlFor="task-select">Choose a Task:</label>
                <select id="task-select" value={selectedTask} onChange={handleTaskChange} style={{ marginLeft: '10px' }}>
                    {Object.keys(taskDescriptions).map((task, index) => (
                        <option key={index} value={task}>{task}</option>
                    ))}
                </select>

                {/* Main Content Area with Two Windows */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    {/* Left Window: Task Description */}
                    <div style={{ flex: '1', padding: '10px', border: '1px solid #ddd', marginRight: '10px', height: '200px', overflowY: 'auto' }}>
                        <h3>Task Description</h3>
                        <p>{taskDescriptions[selectedTask]}</p>
                    </div>
                    
                    {/* Right Window: Task Input */}
                    <div style={{ flex: '1', padding: '10px', border: '1px solid #ddd', marginLeft: '10px', height: '200px' }}>
                        <h3>Task Input</h3>
                        <textarea
                            rows="6"
                            cols="50"
                            placeholder="Enter task-related input here"
                            value={taskInput}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>
                
                {/* Button to Generate Output */}
                <button 
                    style={{ marginTop: '20px' }}
                    onClick={handleGenerateOutput}
                >
                    Generate Output
                </button>

                {/* Bottom Window: Output */}
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd', height: '150px', overflowY: 'auto' }}>
                    <h3>Output</h3>
                    <pre>{output}</pre>
                </div>
            </div>
        </div>
    );
};

export default HomePage;