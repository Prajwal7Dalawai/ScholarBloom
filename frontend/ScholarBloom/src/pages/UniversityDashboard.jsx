import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UniversityDashboard.css'; // Using the same CSS as Student Dashboard
import UniversityIcon from '../assets/harvard-university.avif'; // Default university image



function UniversityDashboard() {
  const navigate = useNavigate();

  const university = {
    name: 'Stanford University',
    universityId: 'UNI20231001',
    email: 'contact@stanford.edu',
    totalStudents: 5000,
    profilePicture: UniversityIcon,
  };

  const availableScholarships = [
    {
      id: 1,
      name: 'AI Research Grant',
      amount: '$1000',
      applicants: 120,
      status: 'Open',
    },
    {
      id: 2,
      name: 'Future Scientists Fund',
      amount: '$500',
      applicants: 75,
      status: 'Closed',
    },
  ];

  const availableJobs = [
    {
      id: 1,
      title: 'Software Engineer Intern',
      company: 'Google',
      salary: '$3000/month',
      applicants: 45,
      status: 'Open',
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'Microsoft',
      salary: '$5000/month',
      applicants: 60,
      status: 'Closed',
    },
  ];

  return (
    <div className="fullBody">
      <div className="dashboard-container-dark container-fluid">
        <div className="row">
          
          {/* Left Section */}
          <div className="left-section-dark col-md-4">
            <div className="user-card-dark card mb-4">
              <div className="user-profile-dark card-body text-center">
                <img
                  src={university.profilePicture}
                  alt="University Logo"
                  className="profile-picture-dark rounded-circle mb-3"
                />
                <h2 className="user-name-dark card-title">{university.name}</h2>
              </div>
              <div className="user-details-dark card-body">
                <p><span className="detail-label-dark">University ID:</span> {university.universityId}</p>
                <p><span className="detail-label-dark">Email:</span> {university.email}</p>
                <p><span className="detail-label-dark">Total Students:</span> {university.totalStudents}</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section-dark col-md-8">
            {/* Available Scholarships */}
            <button className='btn btn-primary'
                  onClick={() => navigate(`/hostScholarship`)}
                  >Add Scholarship</button>
            <h2 className="section-title-dark mt-4 mb-3">Available Scholarships</h2>
            <div className="applied-scholarships-dark card p-3">
              {availableScholarships.map((scholarship, index) => (
                <div key={index} className="applied-scholarship-item-dark mb-3">
                  <h3 className="applied-scholarship-name-dark">{scholarship.name}</h3>
                  <p><span className="applied-scholarship-label-dark">Amount:</span> {scholarship.amount}</p>
                  <p><span className="applied-scholarship-label-dark">Applicants:</span> {scholarship.applicants}</p>
                  <p><span className="applied-scholarship-label-dark">Status:</span> {scholarship.status}</p>

                  {/* View Applicants Button */}
                  <button 
                    className="btn btn-primary mt-2"
                    onClick={() => navigate(`/scholarship-applicants/${scholarship.id}`)}
                  >
                    View Applicants
                  </button>
                  
                </div>
              ))}
            </div>

            {/* Available Jobs */}
            <button className='btn btn-primary'
                  onClick={() => navigate(`/hostJob`)}
                  >Add Jobs</button>
            <h2 className="section-title-dark mt-4 mb-3">Jobs Available</h2>
            <div className="available-jobs-dark card p-3">
              {availableJobs.map((job, index) => (
                <div key={index} className="available-job-item-dark mb-3">
                  <h3 className="available-job-title-dark">{job.title}</h3>
                  <p><span className="available-job-label-dark">Company:</span> {job.company}</p>
                  <p><span className="available-job-label-dark">Salary:</span> {job.salary}</p>
                  <p><span className="available-job-label-dark">Applicants:</span> {job.applicants}</p>
                  <p><span className="available-job-label-dark">Status:</span> {job.status}</p>

                  {/* View Job Applicants Button */}
                  <button 
                    className="btn btn-primary mt-2"
                    onClick={() => navigate(`/job-applicants/${job.id}`)}
                  >
                    View Applicants
                  </button>
                </div>
              ))}
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}

export default UniversityDashboard;
