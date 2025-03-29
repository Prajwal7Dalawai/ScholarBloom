import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import JobCard from "../Components/ui/JobCard";
import harvardImage from "../assets/ScholarshipPhotos/harward.png";
import MIT from "../assets/ScholarshipPhotos/MIT.png";
import Oxford from "../assets/ScholarshipPhotos/oxford.png";
import stanford from "../assets/ScholarshipPhotos/stanford.png";
import Caltech from "../assets/ScholarshipPhotos/caltech.png";
import cambridge from "../assets/ScholarshipPhotos/cambridge.png";
import "./JobApplication.css"; // Import external CSS

const jobListings = [
  { id: 1, title: "Research Assistant", university: "University of Cambridge", requirements: "Minimum GPA 3.5, Python proficiency", scholarship: "500 EduCoins", image: cambridge },
  { id: 2, title: "Teaching Assistant", university: "California Institute of Technology (Caltech)", requirements: "Teaching experience, Java knowledge", scholarship: "700 EduCoins", image: Caltech },
  { id: 3, title: "Software Development Intern", university: "Stanford University", requirements: "Experience with React, Node.js", scholarship: "600 EduCoins", image: stanford },
  { id: 4, title: "AI Research Fellow", university: "University of Oxford", requirements: "Machine Learning experience, TensorFlow", scholarship: "800 EduCoins", image: Oxford },
  { id: 5, title: "Cybersecurity Analyst Intern", university: "STEM Excellence Scholarship", requirements: "Networking, Cybersecurity fundamentals", scholarship: "650 EduCoins", image: MIT },
  { id: 6, title: "AI Research Intern", university: "Harvard University", requirements: "Networking, Cybersecurity fundamentals", scholarship: "650 EduCoins", image: harvardImage },
];

const JobApplication = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [applications, setApplications] = useState({});

  const applyForJob = (id) => {
    navigate(`/jobApplicationForm/${id}`); // Navigate to job-specific application form
  };

  return (
    <div className="job-portal">
      <h1 className="portal-title">Job Application Portal</h1>
      <div className="job-grid">
        {jobListings.map((job) => (
          <JobCard key={job.id} job={job} applyForJob={applyForJob} applied={applications[job.id]} />
        ))}
      </div>
    </div>
  );
};

export default JobApplication;
