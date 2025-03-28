import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./uniProfile.css";
import defaultImage from "../assets/defaultImage.png";

const UniversityProfile = () => {
  const navigate = useNavigate();

  // Retrieve university data from localStorage or use default values
  const [university, setUniversity] = useState(() => {
    const savedUniversity = JSON.parse(localStorage.getItem("university"));
    return savedUniversity || {
      name: "Stanford University",
      email: "contact@stanford.edu",
      website: "https://www.stanford.edu",
      profilePic: defaultImage,
    };
  });

  useEffect(() => {
    localStorage.setItem("university", JSON.stringify(university));
  }, [university]);

  return (
    <div className="container profile-container">
      <div className="card profile-card">
        
        <div className="profile-img-section text-center">
          <img src={university.profilePic || defaultImage} alt="University Logo" className="profile-img" />
        </div>

        <div className="profile-details text-center">
          <h2 className="text-primary">{university.name}</h2>
          <p className="text-light">{university.email}</p>
          <p className="text-light">
            <strong>Website:</strong>{" "}
            <a href={university.website} target="_blank" rel="noopener noreferrer" className="text-link">
              {university.website}
            </a>
          </p>

          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/editUniprofile")}
          >
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  );
};

export default UniversityProfile;
