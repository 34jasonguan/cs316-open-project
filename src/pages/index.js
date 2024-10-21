// pages/index.js

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from './Context';
import styles from './style'

const Staff = {
    "u1": true,
    "u2": false,
    "u3": true,
};

const netIDToFirstNameMap = {
  "admin": "admin",
  "kj240": "Kim",
  "rt341": "Ryan",
  "mm442": "Mia",
  "pa543": "Peter",
  "hl644": "Hana"
};

const taskDescriptions = {
  'Task 1': 'Given a RC id, find all of his/her RAs',
  'Task 2': 'Given a RA id, find all of his/her residents',
  'Task 3': 'Given a dorm location, find all activity taking at that place',
  'Task 4': 'Given a RA id, find his/her availability',
  'Task 5': 'Given a resident name, find his/her report history',
  'Task 6': 'Given a resident username, check whether the inputed password matches the one in record'
};

const HomePage = () => {
    const [selectedTask, setSelectedTask] = useState('Task 1');
    const [taskInput, setTaskInput] = useState('');
    const [output, setOutput] = useState('');

    const { username } = useUser(); 

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
      setOutput(generatedOutput);
    };


    const handleLogout = () => {
        setUsername('');
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                {username === '' ? (
                    <Link href="/login" style={styles.loginLink}>Login</Link>
                ) : (
                    <div>
                        <span style={styles.username}>Hello, {netIDToFirstNameMap[username]}</span>
                        <div style={styles.navLinks}>
                            <Link href="/availability" style={styles.link}>Select Availability</Link>
                            <Link href="/safety_report" style={styles.link}>Submit Report</Link>
                        </div>
                    </div>
                )}
            </div>

            <div style={styles.content}>
                <h1 style={styles.heading}>Development Page for CS 316 Open Project</h1>

                <label htmlFor="task-select" style={styles.label}>Choose a Task:</label>
                <select id="task-select" value={selectedTask} onChange={handleTaskChange} style={styles.select}>
                    {Object.keys(taskDescriptions).map((task, index) => (
                        <option key={index} value={task}>{task}</option>
                    ))}
                </select>

                <div style={styles.mainArea}>
                    <div style={styles.taskDescription}>
                        <h3 style={styles.subheading}>Task Description</h3>
                        <p>{taskDescriptions[selectedTask]}</p>
                    </div>
                    
                    <div style={styles.taskInput}>
                        <h3 style={styles.subheading}>Task Input</h3>
                        <textarea
                            rows="6"
                            cols="50"
                            placeholder="Enter task-related input here"
                            value={taskInput}
                            onChange={handleInputChange}
                            style={styles.textArea}
                        ></textarea>
                    </div>
                </div>
                
                <button style={styles.button} onClick={handleGenerateOutput}>Generate Output</button>

                <div style={styles.outputArea}>
                    <h3 style={styles.subheading}>Output</h3>
                    <pre style={styles.output}>{output}</pre>
                </div>
            </div>
        </div>
    );
};

export default HomePage;