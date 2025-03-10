import React, { useState } from 'react';
import './auth.css';

const UniversityDashboard = () => {
    const [jobRole, setJobRole] = useState('');
    const [applications, setApplications] = useState([]);

    const handlePostJobRole = (e) => {
        e.preventDefault();
        // Logic to post the job role
        console.log('Job role posted:', jobRole);
        setJobRole('');
    };

    const handleApproveApplication = (applicationId) => {
        // Logic to approve application
        console.log('Application approved:', applicationId);
    };

    const handleRejectApplication = (applicationId) => {
        // Logic to reject application
        console.log('Application rejected:', applicationId);
    };

    return (
        <div className="dashboard-container">
            <h2>University Dashboard</h2>
            <form onSubmit={handlePostJobRole}>
                <div>
                    <label>Post New Job Role:</label>
                    <input 
                        type="text" 
                        value={jobRole} 
                        onChange={(e) => setJobRole(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Post Job Role</button>
            </form>

            <h3>Student Applications</h3>
            <div>
                {applications.length === 0 ? (
                    <p>No applications available.</p>
                ) : (
                    applications.map((app) => (
                        <div key={app.id}>
                            <p>{app.studentName} - {app.roleApplied}</p>
                            <button onClick={() => handleApproveApplication(app.id)}>Approve</button>
                            <button onClick={() => handleRejectApplication(app.id)}>Reject</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UniversityDashboard;
