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
      naacGrade: "A++",
      profilePic: defaultImage,
    };
  });

  // Form State
  const [name, setName] = useState(university.name);
  const [email, setEmail] = useState(university.email);
  const [naacGrade, setNaacGrade] = useState(university.naacGrade);
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
      naacGrade,
      profilePic,
    };

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
          <label className="text-light">NAAC Grade</label>
          <select className="form-control" value={naacGrade} onChange={(e) => setNaacGrade(e.target.value)}>
            <option value="A++">A++</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="B++">B++</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        <button className="btn btn-success save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditUniversityProfile;
