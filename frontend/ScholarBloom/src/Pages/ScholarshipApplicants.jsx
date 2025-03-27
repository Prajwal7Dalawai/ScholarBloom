import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./StudentDashboard.css"; // Reusing the same CSS
import DefaultProfile from "../assets/defaultImage.png"; // Default profile image

function ScholarshipApplicants() {
  const { id } = useParams();

  // Sample data for applicants
  const applicantsData = {
    1: [
      { name: "Alice Johnson", studentId: "20231001", email: "alice@example.com", status: "Under Review", profilePic: DefaultProfile },
      { name: "Michael Smith", studentId: "20231002", email: "michael@example.com", status: "Approved", profilePic: DefaultProfile },
      { name: "Emily Davis", studentId: "20231003", email: "emily@example.com", status: "Rejected", profilePic: DefaultProfile },
    ],
    2: [
      { name: "Sara Lee", studentId: "20231004", email: "sara@example.com", status: "Approved", profilePic: DefaultProfile },
      { name: "David Wilson", studentId: "20231005", email: "david@example.com", status: "Pending", profilePic: DefaultProfile },
    ],
  };

  const applicants = applicantsData[id] || [];
  const [filter, setFilter] = useState("All");

  // Filter applicants by status
  const filteredApplicants = filter === "All" ? applicants : applicants.filter(applicant => applicant.status === filter);

  return (
    <div className="dashboard-container-dark container-fluid">
      <div className="card p-4">
        <h2 className="text-white">Scholarship Applicants</h2>

        {/* Filter Options */}
        <div className="filter-container text-light mt-3 mb-4">
          <label>Filter by Status: </label>
          <select className="form-select input-dark" onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Approved">Approved</option>
            <option value="Under Review">Under Review</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Applicants List */}
        {filteredApplicants.length === 0 ? (
          <p className="text-light">No applicants found.</p>
        ) : (
          <div className="applicants-list">
            {filteredApplicants.map((applicant, index) => (
              <div key={index} className="applicant-card card p-2 mb-2">
                <div className="applicant-info d-flex align-items-center">
                  <img src={applicant.profilePic} alt="Student" className="applicant-profile-img rounded-circle me-2" />
                  <div>
                    <h6 className="text-white mb-1">{applicant.name}</h6>
                    <p className="text-light mb-0 small"><strong>ID:</strong> {applicant.studentId}</p>
                    <p className="text-light mb-0 small"><strong>Status:</strong> <span className={`status-badge status-${applicant.status.toLowerCase()}`}>{applicant.status}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ScholarshipApplicants;
