import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfilePage.css";
import defaultImage from "../assets/defaultImage.png";

const EditProfile = () => {
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    return savedUser || {
      name: "John Doe",
      email: "johndoe@example.com",
      grades: "A",
      skills: ["JavaScript", "React"],
      profilePic: defaultImage,
      password: "",
    };
  });

  // Form State
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [grades, setGrades] = useState(user.grades);
  const [skills, setSkills] = useState(user.skills.join(", "));
  const [profilePic, setProfilePic] = useState(user.profilePic || defaultImage);
  const [password, setPassword] = useState(""); // Change Password Field

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
    const updatedUser = {
      name,
      email,
      grades,
      skills: skills.split(",").map((skill) => skill.trim()),
      profilePic,
    };

    if (password.trim() !== "") {
      updatedUser.password = password; // Store new password if provided
    }

    localStorage.setItem("user", JSON.stringify(updatedUser));
    navigate("/profile");
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <h2 className="text-white">Edit Profile</h2>

        {/* Profile Picture Upload */}
        <div className="profile-img-section text-center">
          <img src={profilePic} alt="Profile" className="profile-img" />
          <input type="file" id="fileUpload" accept="image/*" onChange={handleImageChange} hidden />
          <label htmlFor="fileUpload" className="upload-btn">Change Profile Picture</label>
        </div>

        <div className="form-group">
          <label className="text-light">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="text-light">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="text-light">Grades</label>
          <select className="form-control" value={grades} onChange={(e) => setGrades(e.target.value)}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        </div>

        <div className="form-group">
          <label className="text-light">Skills (comma-separated)</label>
          <textarea
            className="form-control skills-textarea"
            rows="4"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Enter skills separated by commas (e.g., JavaScript, React, Python)"
          ></textarea>
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

export default EditProfile;
