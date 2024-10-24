// pages/index.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './style'
import prisma from '../../lib/prisma';

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
                const rcnetid = taskInput.trim();
                console.log("Fetching RAs for RC NetID:", rcnetid); // Debugging line
            
                const response = await fetch(`/api/getRAs?rcnetid=${encodeURIComponent(rcnetid)}`);
            
                if (response.ok) {
                    const RAs = await response.json();
                    
                    if (RAs.length > 0) {
                    generatedOutput = RAs
                        .map(RA => `${RA.rafirstname} ${RA.ralastname} (${RA.ranetid})`)
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
              const ranetid = taskInput.trim();
              console.log("Fetching Residents for RA NetID:", ranetid); // Debugging line
          
              const response = await fetch(`/api/getResidents?ranetid=${encodeURIComponent(ranetid)}`);
          
              if (response.ok) {
                  const residents = await response.json();
                  
                  if (residents.length > 0) {
                  generatedOutput = residents
                      .map(resident => `${resident.studentfirstname} ${resident.studentlastname} (${resident.studentnetid})`)
                      .join('\n');
                  } else {
                  generatedOutput = 'No Residents found for this RA.';
                  }
              } else {
                  const errorData = await response.json();
                  generatedOutput = errorData.message || 'An error occurred';
              }
              } catch (error) {
              console.error('Error fetching Residents:', error);
              generatedOutput = 'Failed to fetch Residents.';
              }
      }
      
        if (selectedTask === 'Task 3') {
          try {
            const buildingName = taskInput;
      
            // Prisma query to fetch activities for the given building name
            const activities = await prisma.activity.findMany({
              where: { buildingName },
              select: {
                name: true,
                time: true,
                date: true,
                room_number: true,
              }
            });
      
            if (activities.length > 0) {
              generatedOutput = activities
                .map(activity => `${activity.name} takes place at ${activity.time} ${activity.date} in room ${activity.room_number}`)
                .join('\n');
            } else {
              generatedOutput = 'No activity found for this building.';
            }
          } catch (error) {
            console.error('Error fetching activities:', error);
            generatedOutput = 'Failed to fetch activities.';
          }
        }
        setOutput(generatedOutput);

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
      <div style={styles.pageContainer}>
        <header style={styles.header}>
          <div style={styles.headerRight}>
            {userID === '' ? (
               <div>
               <Link href="/login" style={styles.loginLink}>Login</Link>
               &ensp;
               <Link href="/register" style={styles.registerLink}>Register</Link>
               </div>
            ) : (
              <div
              style={styles.userID}>Hello, {userID}
               &ensp;
               <h2 onClick={handleLogout} style = {styles.logout}>Logout</h2>
              </div>
            )}
          </div>
        </header>
  
        <aside style={styles.sidebar}>
          <h2 style={styles.sidebarHeading}>Menu</h2>
          {userID ? (
            <>
              <a href="/calendar" className="iconTextLink" style={styles.iconTextLink}>
                <img src="/icons/availability.png" alt="Availability Icon" style={styles.icon} />
                <span style={styles.text}>Availability</span>
              </a>
              <a href="/report" className="iconTextLink" style={styles.iconTextLink}>
                <img src="/icons/report.png" alt="Report Icon" style={styles.icon} />
                <span style={styles.text}>Report</span>
              </a>
              <a href="/proposal" className="iconTextLink" style={styles.iconTextLink}>
                <img src="/icons/proposal.png" alt="Proposal Icon" style={styles.icon} />
                <span style={styles.text}>Activity</span>
              </a>
            </>
          ) : (
            <p style={styles.text}>Login in required for additional features</p>
          )}
        </aside>
  
        <main style={styles.contentArea}>
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
              <button style={styles.button} onClick={handleGenerateOutput}>Generate Output</button>
            </div>
            <div style={styles.taskInput}>
              <h3 style={styles.subheading}>Task Input</h3>
              <textarea
                rows="5"
                cols="1000"
                placeholder="Enter task-related input here"
                value={taskInput}
                onChange={handleInputChange}
                style={styles.textArea}
              ></textarea>
            </div>
          </div>
  
          <div style={styles.outputArea}>
            <h3 style={styles.subheading}>Output</h3>
            <pre style={styles.output}>{output}</pre>
          </div>
        </main>
      </div>
    );
  };

export default HomePage;