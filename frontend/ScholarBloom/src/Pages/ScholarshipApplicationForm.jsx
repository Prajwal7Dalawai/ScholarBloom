import React, { useState } from "react";
import "./ScholarshipApplicationForm.css"; // Keeping the same styles for consistency

const ScholarshipApplicationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [university, setUniversity] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Scholarship Application submitted with:", { name, email, cgpa, university, resume });
  };

  return (
    <div className="login-container"> 
      <div className="login-card">
        <h2 className="login-title">Scholarship Application</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          
          {/* Name Input */}
          <div className="input-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* CGPA Input */}
          <div className="input-group">
            <label htmlFor="cgpa">CGPA:</label>
            <input
              type="text"
              id="cgpa"
              name="cgpa"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              placeholder="Enter your CGPA"
              required
            />
          </div>

          {/* University Input */}
          <div className="input-group">
            <label htmlFor="university">University:</label>
            <input
              type="text"
              id="university"
              name="university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="Enter your university name"
              required
            />
          </div>

          {/* Resume Upload */}
          <div className="input-group">
            <label htmlFor="resume">Upload Resume:</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf, .doc, .docx"
              onChange={(e) => setResume(e.target.files[0])}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-btn">
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
};

export default ScholarshipApplicationForm;
