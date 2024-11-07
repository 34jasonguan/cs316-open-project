import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './style';

const SafetyReportForm = () => {
  const [reportType, setReportType] = useState('');
  const [urgency, setUrgency] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [safetyIssueType, setSafetyIssueType] = useState(''); 
  const [otherIssue, setOtherIssue] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const maxDescriptionLength = 200;

  const handleSubmit = (e) => {
    e.preventDefault();
    const reportData = {
      reportType,
      urgency,
      description,
      isAnonymous, 
      safetyIssueType: safetyIssueType === 'Other' ? otherIssue : safetyIssueType,
      attachmentName: attachment ? attachment.name : null
    };
    console.log(reportData);
    setIsSubmitted(true); 
    setTimeout(() => {
      setIsSubmitted(false);
    router.push('/');
    }, 2000); 
  };

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const renderTemplateFields = () => {
    switch (reportType) {
      case 'noise':
        return (
          <>
            <label style={styles.label}>
              Location:
              <input type="text" placeholder="Enter location of noise" style={styles.textArea} />
            </label>
          </>
        );
      case 'safety':
        return (
          <>
            <label style={styles.label}>
              Safety Issue Type:
              <select
                value={safetyIssueType}
                onChange={(e) => setSafetyIssueType(e.target.value)}
                style={styles.select}>
                <option value="">Select an issue</option>
                <option value="slip">Slip/Fall</option>
                <option value="fire">Fire Hazard</option>
                <option value="suspicious">Suspicious Activity</option>
                <option value="smoke">Smoke Detected</option>
                <option value="Other">Other (please specify)</option>
              </select>
            </label>
            <br />
            {safetyIssueType === 'Other' && (
              <label style={styles.label}>
                Please specify:
                <input
                  type="text"
                  value={otherIssue}
                  onChange={(e) => setOtherIssue(e.target.value)}
                  placeholder="Describe the issue"
                  style={styles.textArea}
                />
              </label>
            )}
            <br />
            <label style={styles.label}>
              Location:
              <input type="text" placeholder="Enter location" style={styles.textArea} />
            </label>
          </>
        );
      case 'maintenance':
        return (
          <>
            <label style={styles.label}>
              Equipment/Facility:
              <input type="text" placeholder="Enter equipment needing repair" style={styles.textArea} />
            </label>
            <br />
            <label style={styles.label}>
              Location:
              <textarea placeholder="Enter Location" style={styles.textArea} />
            </label>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.content}>
        <h2 style={styles.heading}>Submit a Safety Report</h2>
        
        <label style={styles.label}>
          Submit Anonymously:
          <input 
            type="checkbox" 
            checked={isAnonymous} 
            onChange={(e) => setIsAnonymous(e.target.checked)} 
            style={{ marginLeft: '10px' }} 
          />
        </label>
        <br />

        <label style={styles.label}>
          Report Type:
          <select value={reportType} onChange={(e) => setReportType(e.target.value)} style={styles.select}>
            <option value="">Select a type</option>
            <option value="noise">Noise Complaint</option>
            <option value="safety">Safety Issue</option>
            <option value="maintenance">Maintenance Request</option>
          </select>
        </label>
        <br />
        {renderTemplateFields()}
        <br />

        <label style={styles.label}>
          Urgency Level:
          <select value={urgency} onChange={(e) => setUrgency(e.target.value)} style={styles.select}>
            <option value="">Select urgency</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <br />

        <label style={styles.label}>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue here"
            maxLength={maxDescriptionLength}
            style={styles.textArea}
          />
        </label>
        <p style={{ fontSize: '12px', color: '#555' }}>
          {description.length}/{maxDescriptionLength} characters
        </p>
        <br />

        <label style={styles.label}>
          Attachment (optional):
          <input type="file" onChange={handleFileChange} style={styles.fileInput} />
        </label>
        <br />

        <button type="submit" style={styles.button}>Submit Report</button>
      </form>

      {isSubmitted && (
        <div style={{ ...styles.modal, textAlign: 'center' }}>
          <p>Your report has been submitted successfully!</p>
        </div>
      )}
    </div>
  );
};

export default SafetyReportForm;
