import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UniversityDashboard.css'; // Using the same CSS as Student Dashboard
import UniversityIcon from '../assets/harvard-university.avif'; // Default university image
import { fetchUniData } from '../controls/dataController';

function UniversityDashboard() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({ user: {} });
  
  React.useEffect(() => {
    fetchUniData().then((data) => {
      setData(data);
      console.log(data);
    });
  }, []);

  const university = {
    name: data.user.fullName,
    universityId: data.user._id,
    email: data.user.email,
    profilePicture:data.user.profilePic,
  };

  const availableScholarships = [
    {
      id: data.scholarships[0]._id,
      name: data.scholarships[0].title,
      amount: data.scholarships[0].amount,
      status: data.scholarships[0].status,
    },
    {
      id: data.scholarships[1]._id,
      name: data.scholarships[1].title,
      amount: data.scholarships[1].amount,
      status: data.scholarships[1].status,
    },
  ];

  const availableJobs = [
    {
      id: data.jobs[0]._id,
      title: data.jobs[0].jobTitle,
      status: data.jobs[0].status,
    },
    {
      id: data.jobs[0]._id,
      title: data.jobs[0].jobTitle,
      status: data.jobs[0].status,
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
                {/* <p><span className="detail-label-dark">Total Students:</span> {university.totalStudents}</p> */}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section-dark col-md-8">

            {/* Available Scholarships */}
            <h2 className="section-title-dark mt-4 mb-3">Available Scholarships</h2>
            <div className="applied-scholarships-dark card p-3">
              {availableScholarships.map((scholarship, index) => (
                <div key={index} className="applied-scholarship-item-dark mb-3">
                  <h3 className="applied-scholarship-name-dark">{scholarship.name}</h3>
                  <p><span className="applied-scholarship-label-dark">Amount:</span> {scholarship.amount}</p>
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
            <h2 className="section-title-dark mt-4 mb-3">Jobs Available</h2>
            <div className="available-jobs-dark card p-3">
              {availableJobs.map((job, index) => (
                <div key={index} className="available-job-item-dark mb-3">
                  <h3 className="available-job-title-dark">{job.title}</h3>
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
