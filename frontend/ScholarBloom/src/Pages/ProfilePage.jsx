import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import defaultImage from "../assets/defaultImage.png";

const ProfilePage = () => {
  const navigate = useNavigate();

  // Load user data from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    return savedUser || {
      name: "John Doe",
      email: "johndoe@example.com",
      grades: "A",
      skills: ["JavaScript", "React"],
      profilePic: defaultImage,
    };
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div className="container profile-container">
      <div className="card profile-card">
        
        <div className="profile-img-section text-center">
          <img src={user.profilePic} alt="Profile" className="profile-img" />
        </div>

        <div className="profile-details text-center">
          <h2 className="text-primary">{user.name}</h2>
          <p className="text-light">{user.email}</p>
          <p className="text-light"><strong>Grades:</strong> {user.grades}</p>
          <p className="text-light"><strong>Skills:</strong> {user.skills.join(", ")}</p>

          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/edit-profile")}
          >
            Edit Profile
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
