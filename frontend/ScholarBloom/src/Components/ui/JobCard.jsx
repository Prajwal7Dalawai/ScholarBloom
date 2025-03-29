import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./ScholarshipCard.css"; // Import CSS file

export default function JobCard({ job }) {
  return (
    <div className="scholarship-card">
      <img src={job.image} alt={job.university} className="job-image" />
      <div className="content">
        <div className="flex justify-between items-center mb-2">
          <h2 className="job-title">{job.title}</h2>
          <span className="info">📅 Posted 2 days ago</span>
        </div>
        <p className="info"><strong>University:</strong> {job.university}</p>
        <p className="info"><strong>Requirements:</strong> {job.requirements}</p>
        <p className="info"><strong>Scholarship:</strong> {job.scholarship}</p>
        
        {/* Use Link for smooth navigation */}
        <Link to={`/jobApplicationForm/${job.id}`} className="apply-btn">
          Apply Now
        </Link>
      </div>
    </div>
  );
}
