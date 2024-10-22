import React, { useState } from 'react';
import { useRouter } from 'next/router';

const ActivityProposalForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission - In real projects, you'd send data to a backend server here
    console.log({ title, description, location, date, participants });

    // Redirect or show a success message after submission
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Activity Title:
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter activity title" 
          required 
        />
      </label>
      <br />

      <label>
        Description:
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Describe the activity here" 
          required 
        />
      </label>
      <br />

      <label>
        Location:
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          placeholder="Location for the activity" 
          required 
        />
      </label>
      <br />

      <label>
        Date & Time:
        <input 
          type="datetime-local" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
      </label>
      <br />

      <label>
        Expected Number of Participants:
        <input 
          type="number" 
          value={participants} 
          onChange={(e) => setParticipants(e.target.value)} 
          placeholder="Enter expected participants" 
          required 
        />
      </label>
      <br />

      <button type="submit">Submit Proposal</button>
    </form>
  );
};

export default ActivityProposalForm;
