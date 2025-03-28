import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfilePage.css";
import defaultImage from "../assets/defaultImage.png";

const EditUniversityProfile = () => {
  const navigate = useNavigate();

  // Retrieve university data from localStorage
  const [university, setUniversity] = useState(() => {
    const savedUniversity = JSON.parse(localStorage.getItem("university"));
    return savedUniversity || {
      name: "Stanford University",
      email: "contact@stanford.edu",
      website: "https://www.stanford.edu",
      profilePic: defaultImage,
    };
  });

  // Form State
  const [name, setName] = useState(university.name);
  const [email, setEmail] = useState(university.email);
  const [website, setWebsite] = useState(university.website);
  const [password, setPassword] = useState(""); // Change Password Field
  const [profilePic, setProfilePic] = useState(university.profilePic || defaultImage);

  // Handle Image Change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  // Save Profile
  const handleSave = () => {
    const updatedUniversity = {
      name,
      email,
      website,
      profilePic,
    };

    if (password.trim() !== "") {
      updatedUniversity.password = password; // Store new password if provided
    }

    localStorage.setItem("university", JSON.stringify(updatedUniversity));
    navigate("/university-profile");
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <h2 className="text-white">Edit University Profile</h2>

        {/* University Logo Upload */}
        <div className="profile-img-section text-center">
          <img src={profilePic} alt="University Logo" className="profile-img" />
          <input type="file" id="fileUpload" accept="image/*" onChange={handleImageChange} hidden />
          <label htmlFor="fileUpload" className="upload-btn">Change Logo</label>
        </div>

        <div className="form-group">
          <label className="text-light">University Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="text-light">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="text-light">University Website</label>
          <input type="url" className="form-control" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        {/* Change Password Field */}
        <div className="form-group">
          <label className="text-light">Change Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" />
        </div>

        <button className="btn btn-success save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditUniversityProfile;
