import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SafetyReportForm = () => {
  const [reportType, setReportType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 
    console.log({ reportType, urgency, description });

    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Report Type:
        <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
          <option value="">Select a type</option>
          <option value="noise">Noise Complaint</option>
          <option value="safety">Safety Issue</option>
          <option value="maintenance">Maintenance Request</option>
        </select>
      </label>
      <br />
      <label>
        Urgency Level:
        <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
          <option value="">Select urgency</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <br />
      <label>
        Description:
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Describe the issue here" 
        />
      </label>
      <br />
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default SafetyReportForm;
