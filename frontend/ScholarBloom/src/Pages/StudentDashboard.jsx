import React from 'react';
import './StudentDashboard.css';
import Person from '../assets/person.png';

function StudentDashboard() {
  const user = {
    name: 'Alice Johnson',
    studentId: '20231001',
    email: 'alice.johnson@example.com',
    course: 'Computer Science',
    profilePicture: Person,
  };

  const educoins = 150;

  const appliedScholarships = [
    { name: 'Tech Innovators Scholarship', university: 'MIT', applicationDate: '2024-03-10', status: 'Under Review' },
    { name: 'Women in STEM Grant', university: 'Caltech', applicationDate: '2024-02-15', status: 'Rejected' },
  ];

  const appliedJobs = [
    { title: 'Software Engineer Intern', company: 'Google', applicationDate: '2024-03-05', status: 'Pending' },
    { title: 'Data Scientist', company: 'Microsoft', applicationDate: '2024-02-20', status: 'Rejected' },
    { title: 'AI Researcher', company: 'OpenAI', applicationDate: '2024-02-28', status: 'Under Review' },
  ];

  const enrolledCourses = [
    { name: 'Introduction to Artificial Intelligence', instructor: 'Dr. Smith', startDate: '2024-01-15' },
    { name: 'Data Structures and Algorithms', instructor: 'Prof. Johnson', startDate: '2024-02-01' },
  ];

  return (
    <div className="fullBody">
      <div className="dashboard-container-dark container-fluid">
        <div className="row">
          
          {/* Left Section */}
          <div className="left-section-dark col-md-4">
            <div className="user-card-dark card mb-4">
              <div className="user-profile-dark card-body text-center">
                <img src={user.profilePicture} alt="User Profile" className="profile-picture-dark rounded-circle mb-3" />
                <h2 className="user-name-dark card-title">{user.name}</h2>
              </div>
              <div className="user-details-dark card-body">
                <p><span className="detail-label-dark">Student ID:</span> {user.studentId}</p>
                <p><span className="detail-label-dark">Email:</span> {user.email}</p>
                <p><span className="detail-label-dark">Course:</span> {user.course}</p>
              </div>
            </div>

            <div className="educoins-card-dark card">
              <div className="card-body text-center">
                <h2 className="card-title-dark">EduCoins</h2>
                <div className="educoins-display-dark">
                  <span className="educoins-icon-dark">💰</span>
                  <span className="educoins-value-dark">{educoins}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section-dark col-md-8">

            {/* Applied Scholarships */}
            <h2 className="section-title-dark mt-4 mb-3">Applied Scholarships</h2>
            <div className="applied-scholarships-dark card p-3">
              {appliedScholarships.map((scholarship, index) => (
                <div key={index} className="applied-scholarship-item-dark mb-3">
                  <h3 className="applied-scholarship-name-dark">{scholarship.name}</h3>
                  <p><span className="applied-scholarship-label-dark">University:</span> {scholarship.university}</p>
                  <p><span className="applied-scholarship-label-dark">Applied Date:</span> {scholarship.applicationDate}</p>
                  <p><span className="applied-scholarship-label-dark">Status:</span> {scholarship.status}</p>
                </div>
              ))}
            </div>

            {/* Jobs Applied - Grid Layout */}
            <h2 className="section-title-dark mt-4 mb-3">Jobs Applied</h2>
            <div className="jobs-applied-dark card p-3">
              <div className="row">
                {appliedJobs.map((job, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <div className="job-card-dark p-3">
                      <h4 className="job-title-dark">{job.title}</h4>
                      <p><span className="job-label-dark">Company:</span> {job.company}</p>
                      <p><span className="job-label-dark">Applied Date:</span> {job.applicationDate}</p>
                      <p>
  <span className={`status-badge status-${job.status.toLowerCase()}`}>{job.status}</span>
</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrolled Courses */}
            <h2 className="section-title-dark mt-4 mb-3">Enrolled Courses</h2>
            <div className="enrolled-courses-dark card p-3">
              {enrolledCourses.map((course, index) => (
                <div key={index} className="enrolled-course-item-dark mb-3">
                  <h3 className="enrolled-course-name-dark">{course.name}</h3>
                  <p><span className="enrolled-course-label-dark">Instructor:</span> {course.instructor}</p>
                  <p><span className="enrolled-course-label-dark">Start Date:</span> {course.startDate}</p>
                </div>
              ))}
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
