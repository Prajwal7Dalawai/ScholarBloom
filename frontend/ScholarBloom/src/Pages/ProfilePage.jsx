import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./ProfilePage.css"; // Import custom styles
import image from "../assets/defaultImage.png"
const ProfilePage = () => {
  // State for user details
  const navigate=useNavigate();

  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Passionate learner and tech enthusiast.",
    profilePic: image, // Default Profile Picture
  });

  // Handle Profile Picture Change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUser({ ...user, profilePic: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="container profile-container">
      <div className="card profile-card">
        
        {/* Profile Image Section */}
        <div className="profile-img-section text-center">
          <img src={user.profilePic} alt="Profile" className="profile-img" />
          <input type="file" id="fileUpload" accept="image/*" onChange={handleImageChange} hidden />
          <label htmlFor="fileUpload" className="upload-btn">Change Profile</label>
        </div>

        {/* User Details */}
        <div className="profile-details text-center">
          <h2 className="text-primary ">{user.name}</h2>
          <p className="text-light">{user.email}</p>
          <p className="text-light">{user.bio}</p>

          {/* Edit Profile Button */}
          <button className="btn btn-primary mt-3" onClick={() => navigate("/edit-profile")}>
            Edit Profile
          </button>        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
