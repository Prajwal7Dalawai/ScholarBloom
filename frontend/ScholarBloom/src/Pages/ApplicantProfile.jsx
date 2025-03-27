import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./StudentDashboard.css";
import PersonImage from "../assets/person.png";

function ApplicantProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample applicant data
  const applicantData = {
    1: { name: "Alice Johnson", studentId: "20231001", email: "alice@example.com", eduCoins: 150, profilePic:  PersonImage, bio: "Tech enthusiast and AI researcher." },
    2: { name: "Michael Smith", studentId: "20231002", email: "michael@example.com", eduCoins: 120, profilePic:  PersonImage, bio: "Aspiring software engineer with a passion for web development." },
    3: { name: "Emily Davis", studentId: "20231003", email: "emily@example.com", eduCoins: 200, profilePic:  PersonImage, bio: "Lifelong learner specializing in data science." },
  };

  const applicant = applicantData[id];

  if (!applicant) {
    return <div className="text-white text-center">Applicant not found.</div>;
  }

  return (
    <div className="dashboard-container-dark container-fluid">
      <div className="card p-4 text-center">
        <img src={applicant.profilePic} alt="Student" className="applicant-profile-img-large rounded-circle mb-3" />
        <h2 className="text-white">{applicant.name}</h2>
        <p className="text-light"><strong>Student ID:</strong> {applicant.studentId}</p>
        <p className="text-light"><strong>Email:</strong> {applicant.email}</p>
        <p className="text-light"><strong>EduCoins:</strong> {applicant.eduCoins}</p>
        <p className="text-light"><strong>Bio:</strong> {applicant.bio}</p>
        <button className="btn btn-outline-light mt-3" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

export default ApplicantProfile;
