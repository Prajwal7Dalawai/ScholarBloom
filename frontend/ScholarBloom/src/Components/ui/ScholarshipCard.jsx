import React from "react";
import { useNavigate } from "react-router-dom";
import "./ScholarshipCard.css"; // Import CSS file

export default function ScholarshipCard({ scholarship }) {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate(`/scholarshipApplicationForm/${scholarship.id}`); // Navigate to detailed page
  };

  return (
    <div className="scholarship-card">
      <img src={scholarship.image} alt={scholarship.name} className="scholarship-image" />
      <div className="content">
        <div className="flex justify-between items-center mb-2">
          <h2>{scholarship.name}</h2>
          <span className="info">📅 Posted 2 days ago</span>
        </div>
        <p className="info">Last date to apply: {scholarship.lastDate || "TBA"}</p>
        <p className="info">Minimum CGPA: {scholarship.minCGPA || "Not specified"}</p>
        <button onClick={handleApply} className="apply-btn" aria-label={`Apply for ${scholarship.name}`}>
          Apply Now
        </button>
      </div>
    </div>
  );
}
