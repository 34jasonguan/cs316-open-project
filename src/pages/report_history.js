import React, { useEffect, useState } from 'react';
import styles from './style';

const ReportHistory = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('admin'); // default userID admin

  // mock report for testing
  const mockReports = {
    admin: [
      { id: 1, type: 'Safety Issue', urgency: 'High', description: 'Fire hazard near Belltower', timestamp: '2024-10-21 14:30:00', status: 'Resolved' },
      { id: 2, type: 'Noise Complaint', urgency: 'Low', description: 'Loud music from East House, Room 204', timestamp: '2024-10-20 22:30:00', status: 'Pending' },
    ],
    user123: [
      { id: 3, type: 'Maintenance Request', urgency: 'Medium', description: 'Water leakage in restroom', timestamp: '2024-10-22 11:15:00', status: 'In Progress' },
      { id: 4, type: 'Noise Complaint', urgency: 'Medium', description: 'Construction noise during quiet hours', timestamp: '2024-10-22 14:00:00', status: 'Pending' },
    ]
  };

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      setReports(mockReports[userId] || []);
      setLoading(false);
    }, 1000); 
  }, [userId]);

  // switch userID
  const handleUserChange = (newUserId) => {
    setUserId(newUserId);
  };

  if (loading) return <p>Loading report history...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Report History for {userId}</h2>
      
      <button onClick={() => handleUserChange('admin')} style={styles.button}>Switch to Admin</button>
      <button onClick={() => handleUserChange('user123')} style={styles.button}>Switch to User123</button>
      
      {reports.length === 0 ? (
        <p style={styles.noReports}>No reports found</p>
      ) : (
        <ul style={styles.reportList}>
          {reports.map((report) => (
            <li key={report.id} style={styles.reportItem}>
              <h3>Report Type: {report.type}</h3>
              <p>Urgency: {report.urgency}</p>
              <p>Description: {report.description}</p>
              <p>Submitted on: {new Date(report.timestamp).toLocaleString()}</p>
              <p>Status: {report.status || 'Pending'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportHistory;
