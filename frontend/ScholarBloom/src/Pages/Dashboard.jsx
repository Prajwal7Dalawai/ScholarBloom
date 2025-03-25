import React from 'react';
import './StudentDashboard.css';

function Dashboard() {
  const user = {
    name: 'Alice Johnson',
    studentId: '20231001',
    email: 'alice.johnson@example.com',
    course: 'Computer Science',
    profilePicture: 'https://via.placeholder.com/150',
  };

  const educoins = 150;

  const scholarships = [
    {
      name: 'Merit Scholarship',
      amount: '$1000',
      status: 'Awarded',
      icon: '🏆',
    },
    {
      name: 'Need-Based Scholarship',
      amount: '$500',
      status: 'Pending',
      icon: '⏳',
    },
    {
      name: 'Departmental Scholarship',
      amount: '$750',
      status: 'Applied',
      icon: '📝',
    },
  ];

  return (
    <div className="dashboard-container-dark">
      <div className="left-section-dark">
        <div className="user-card-dark">
          <div className="user-profile-dark">
            <img src={user.profilePicture} alt="User Profile" className="profile-picture-dark" />
            <h2 className="user-name-dark">{user.name}</h2>
          </div>
          <div className="user-details-dark">
            <p><span className="detail-label-dark">Student ID:</span> {user.studentId}</p>
            <p><span className="detail-label-dark">Email:</span> {user.email}</p>
            <p><span className="detail-label-dark">Course:</span> {user.course}</p>
          </div>
        </div>
        <div className="educoins-card-dark">
          <h2 className="card-title-dark">EduCoins</h2>
          <div className="educoins-display-dark">
            <span className="educoins-icon-dark">💰</span>
            <span className="educoins-value-dark">{educoins}</span>
          </div>
        </div>
      </div>
      <div className="right-section-dark">
        <h2 className="section-title-dark">Scholarship Details</h2>
        <div className="scholarships-list-dark">
          {scholarships.map((scholarship, index) => (
            <div key={index} className="scholarship-item-dark">
              <div className="scholarship-header-dark">
                <span className="scholarship-icon-dark">{scholarship.icon}</span>
                <h3 className="scholarship-name-dark">{scholarship.name}</h3>
              </div>
              <p><span className="detail-label-dark">Amount:</span> {scholarship.amount}</p>
              <p><span className="detail-label-dark">Status:</span> {scholarship.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;