// pages/index.js

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from './Context'; // Adjust the path as needed

const Staff = {
    "u1": true,
    "u2": false,
    "u3": true,
}

const HomePage = () => {
    // State to hold the selected task and input/output values
    const [selectedTask, setSelectedTask] = useState('Task 1');
    const [taskInput, setTaskInput] = useState('');
    const [output, setOutput] = useState('');
    
    // Username indicating login status and access level
    const { username, setUsername } = useUser(); // Access username from context

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
        setOutput(''); // Clear output when the task changes
    };

    // Handle task input change
    const handleInputChange = (event) => {
        setTaskInput(event.target.value);
    };

    // Handle button click to generate output based on selected task and input
    const handleGenerateOutput = () => {
      let generatedOutput = ':)';

      if (selectedTask === 'Task 1') {
          generatedOutput = ':)';
      }

      if (selectedTask === 'Task 6') {
        generatedOutput = Staff[taskInput] ? 'Staff' : 'Resident';
    }
      // Set the output state to display in the output window
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
                            <button onClick={handleLogout} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                                Logout
                            </button>
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