import React, { useState } from "react";
import "./JobApplication.css"; // Import external CSS

const jobListings = [
  {
    id: 1,
    title: "Research Assistant",
    university: "ABC University",
    requirements: "Minimum GPA 3.5, Python proficiency",
    scholarship: "500 EduCoins",
  },
  {
    id: 2,
    title: "Teaching Assistant",
    university: "XYZ University",
    requirements: "Teaching experience, Java knowledge",
    scholarship: "700 EduCoins",
  },
  {
    id: 3,
    title: "Software Development Intern",
    university: "Tech University",
    requirements: "Experience with React, Node.js",
    scholarship: "600 EduCoins",
  },
  {
    id: 4,
    title: "AI Research Fellow",
    university: "AI Institute",
    requirements: "Machine Learning experience, TensorFlow",
    scholarship: "800 EduCoins",
  },
  {
    id: 5,
    title: "Cybersecurity Analyst Intern",
    university: "CyberTech Academy",
    requirements: "Networking, Cybersecurity fundamentals",
    scholarship: "650 EduCoins",
  },
];

const JobApplication = () => {
  const [applications, setApplications] = useState({});

  const applyForJob = (id) => {
    setApplications((prev) => ({ ...prev, [id]: "Pending" }));
  };

  return (
    <div className="job-portal">
      <h1 className="portal-title">Job Application Portal</h1>
      <div className="job-grid">
        {jobListings.map((job) => (
          <div key={job.id} className="job-card">
            <h2 className="job-title">{job.title}</h2>
            <p className="job-university">{job.university}</p>
            <p className="job-details">
              <strong>Requirements:</strong> {job.requirements}
            </p>
            <p className="job-details">
              <strong>Scholarship:</strong> {job.scholarship}
            </p>
            <button
              className="job-apply-btn" // Updated class name
              onClick={() => applyForJob(job.id)}
              disabled={applications[job.id]}
            >
              {applications[job.id] ? "Applied" : "Apply Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobApplication;
