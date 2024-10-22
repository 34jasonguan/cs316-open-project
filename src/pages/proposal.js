import React, { useState } from 'react';
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

export default ActivityProposalForm;