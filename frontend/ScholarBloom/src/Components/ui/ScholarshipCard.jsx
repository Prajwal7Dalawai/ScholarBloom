import React from "react";
import "./ScholarshipCard.css"; // Import CSS file

export default function ScholarshipCard({ scholarship }) {
  return (
    <div className="scholarship-card">
      <img src={scholarship.image} alt={scholarship.name} />
      <div className="content">
        <div className="flex justify-between items-center mb-2">
          <h2>{scholarship.name}</h2>
          <span className="info">Posted 2 days ago</span>
        </div>
        <p className="info">Last date to apply: {scholarship.lastDate}</p>
        <p className="info">Minimum CGPA required: {scholarship.minCGPA}</p>
        <a href="#" className="apply-btn">Apply Now</a>
      </div>
    </div>
  );
}
