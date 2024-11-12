import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  GraduationCap,
  Dices, 
  ChevronDown,
  Menu,
  Settings,
  Search
} from "lucide-react";
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
  const [openSubbar, setOpenSubbar] = useState('');
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
          <label style={styles.label}>
            Location:
            <input type="text" placeholder="Enter location of noise" style={styles.textArea} />
          </label>
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

  const toggleSubbar = (name) => {
    setOpenSubbar((prev) => (prev === name ? '' : name));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col bg-[#00247D] text-white md:flex">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-bold">Team RAvolution</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="/" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </a>
          <a href="/search" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
            <Search className="h-5 w-5" />
            <span>Search User</span>
          </a>
          <a href="/schedule" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10">
            <CalendarIcon className="h-5 w-5" />
            <span>Schedule</span>
          </a>
          <div className="space-y-2">
              <div
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
                onClick={() => toggleSubbar('activityInfo')}
              >
                <Dices className="h-5 w-5" />
                <span>Activity</span>
                <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${openSubbar === 'activityInfo' ? 'rotate-180' : ''}`} />
              </div>
              {openSubbar === 'activityInfo' && (
                <div className="ml-8 space-y-1">
                  <a href="/proposal" className="block px-3 py-2 rounded-lg hover:bg-white/10">Proposal Form</a>
                  <a href="#" className="block px-3 py-2 rounded-lg hover:bg-white/10">Activity History</a>
                </div>
              )}
            </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b bg-white p-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-semibold">Safety Report</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </header>

        <main className="flex-1 overflow-auto p-6">
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

            <label style={styles.label}>
              Report Type:
              <select value={reportType} onChange={(e) => setReportType(e.target.value)} style={styles.select}>
                <option value="">Select a type</option>
                <option value="noise">Noise Complaint</option>
                <option value="safety">Safety Issue</option>
                <option value="maintenance">Maintenance Request</option>
              </select>
            </label>

            {renderTemplateFields()}

            <label style={styles.label}>
              Urgency Level:
              <select value={urgency} onChange={(e) => setUrgency(e.target.value)} style={styles.select}>
                <option value="">Select urgency</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

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

            <label style={styles.label}>
              Attachment (optional):
              <input type="file" onChange={handleFileChange} style={styles.fileInput} />
            </label>

            <button type="submit" style={styles.button}>Submit Report</button>
          </form>

          {isSubmitted && (
            <div style={{ ...styles.modal, textAlign: 'center' }}>
              <p>Your report has been submitted successfully!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SafetyReportForm;


/* import React, { useState } from 'react';
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
*/