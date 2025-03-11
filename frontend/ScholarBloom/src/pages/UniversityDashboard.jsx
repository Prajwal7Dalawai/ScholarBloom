import React, { useState } from 'react';
import './auth.css';

const UniversityDashboard = () => {
    const [jobRole, setJobRole] = useState('');
    const [applications, setApplications] = useState([
        { id: 1, studentName: 'Alice Johnson', roleApplied: 'Research Assistant', status: 'Pending' },
        { id: 2, studentName: 'Bob Smith', roleApplied: 'Software Internship', status: 'Pending' }
    ]);

    const handlePostJobRole = (e) => {
        e.preventDefault();
        console.log('Job role posted:', jobRole);
        setJobRole('');
    };

    const handleApproveApplication = (applicationId) => {
        setApplications(applications.map(app =>
            app.id === applicationId ? { ...app, status: 'Approved' } : app
        ));
        console.log('Application approved:', applicationId);
    };

    const handleRejectApplication = (applicationId) => {
        setApplications(applications.map(app =>
            app.id === applicationId ? { ...app, status: 'Rejected' } : app
        ));
        console.log('Application rejected:', applicationId);
    };

    return (
        <div className="dashboard-container">
            <h2>University Dashboard</h2>
            
            <form onSubmit={handlePostJobRole} className="job-form">
                <div className="input-group">
                    <label>Post New Job Role:</label>
                    <input 
                        type="text" 
                        value={jobRole} 
                        onChange={(e) => setJobRole(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="post-btn">Post Job Role</button>
            </form>

            <h3>Student Applications for Scholarships</h3>
            <div className="applications-container">
                {applications.length === 0 ? (
                    <p>No applications available.</p>
                ) : (
                    applications.map((app) => (
                        <div key={app.id} className="application-card">
                            <div className="card-header">
                                <h4>{app.studentName}</h4>
                                <p><strong>Applied for:</strong> {app.roleApplied}</p>
                            </div>
                            <div className="card-body">
                                <p>Status: <span className={app.status.toLowerCase()}>{app.status}</span></p>
                            </div>
                            {app.status === 'Pending' && (
                                <div className="card-actions">
                                    <button onClick={() => handleApproveApplication(app.id)} className="approve-btn">Approve</button>
                                    <button onClick={() => handleRejectApplication(app.id)} className="reject-btn">Reject</button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UniversityDashboard;
