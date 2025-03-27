import React, { useState } from "react";
import "./EditProfilePage.css"; // Import custom styles
import image from "../assets/defaultImage.png"
const EditProfilePage = () => {
  // State for user details
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Passionate learner and tech enthusiast.",
    profilePic: image, // Default Profile Picture
  });

  // Handle input changes
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // Handle Profile Picture Change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUser({ ...user, profilePic: URL.createObjectURL(file) });
    }
  };

  // Handle Save (For now, just log the data)
  const handleSave = () => {
    console.log("Updated User Data:", user);
    alert("Profile updated successfully!");
  };

  return (
    <div className="container edit-profile-container">
      <div className="card edit-profile-card">
        
        {/* Profile Image Section */}
        <div className="profile-img-section text-center">
          <img src={user.profilePic} alt="Profile" className="profile-img" />
          <input type="file" id="fileUpload" accept="image/*" onChange={handleImageChange} hidden />
          <label htmlFor="fileUpload" className="upload-btn">Change Profile Picture</label>
        </div>

        {/* Edit Form */}
        <div className="profile-details">
          <label className="text-light">Full Name</label>
          <input type="text" className="form-control input-dark" name="name" value={user.name} onChange={handleChange} />

          <label className="text-light mt-3">Email</label>
          <input type="email" className="form-control input-dark" name="email" value={user.email} onChange={handleChange} />

          <label className="text-light mt-3">Bio</label>
          <textarea className="form-control input-dark" name="bio" rows="3" value={user.bio} onChange={handleChange}></textarea>

          {/* Save Button */}
          <button className="btn btn-primary mt-4 w-100" onClick={handleSave}>Save Changes</button>
        </div>

      </div>
    </div>
  );
};

export default EditProfilePage;
