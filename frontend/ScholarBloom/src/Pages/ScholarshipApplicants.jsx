import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UniversityDashboard.css"; // Reusing the same CSS


function ScholarshipApplicants() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample data for applicants
  const [applicants, setApplicants] = useState([
    { id: 1, name: "Alice Johnson", studentId: "20231001", email: "alice@example.com", eduCoins: 150, status: "Under Review", profilePic: "/assets/defaultImage.png" },
    { id: 2, name: "Michael Smith", studentId: "20231002", email: "michael@example.com", eduCoins: 120, status: "Pending", profilePic:  "/assets/defaultImage.png" },
    { id: 3, name: "Emily Davis", studentId: "20231003", email: "emily@example.com", eduCoins: 200, status: "Under Review", profilePic:  "/assets/defaultImage.png" },
  ]);

  // Handle Approve/Reject Status Change
  const updateStatus = (applicantId, newStatus) => {
    const updatedApplicants = applicants.map((applicant) =>
      applicant.id === applicantId ? { ...applicant, status: newStatus } : applicant
    );
    setApplicants(updatedApplicants);
  };

  return (
    <div className="dashboard-container-dark container-fluid">
      <div className="card p-4">
        <h2 className="text-white">Scholarship Applicants</h2>

        {/* Applicants List */}
        <table className="table table-dark table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Email</th>
              <th>EduCoins</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {applicants.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-light">No applicants found.</td>
              </tr>
            ) : (
              applicants.map((applicant) => (
                <tr key={applicant.id}>
                 
                  <td>{applicant.name}</td>
                  <td>{applicant.studentId}</td>
                  <td>{applicant.email}</td>
                  <td>{applicant.eduCoins}</td>
                  <td>
                    <span className={`status-badge status-${applicant.status.toLowerCase()}`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={() => updateStatus(applicant.id, "Approved")}>
                      Approve
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => updateStatus(applicant.id, "Rejected")}>
                      Reject
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-outline-info btn-sm" onClick={() => navigate(`/applicant-profile/${applicant.id}`)}>
                      View Profile
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScholarshipApplicants;
