import React from "react";
import "./ScholarshipCard.css"; // Import CSS file

export default function JobCard({ job }) {
  return (
    <div className="scholarship-card">
      <img src={job.image} alt={job.university} />
      <div className="content">
        <div className="flex justify-between items-center mb-2">
          <h2>{job.title}</h2>
          <span className="info">Posted 2 days ago</span>
        </div>
        <p className="info">University: {job.university}</p>
        <p className="info">Requirements: {job.requirements}</p>
        <p className="info">Coins: {job.scholarship}</p>
        <a href="#" className="apply-btn">Apply Now</a>
      </div>
    </div>
  );
}
