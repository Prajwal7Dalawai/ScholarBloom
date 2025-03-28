import React, { useState } from "react";
import "./JobApplicationForm.css"; // Using the same styles for consistency
import { FcGoogle } from "react-icons/fc";

const JobApplicationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Application submitted with:", { name, email, phone, resume });
  };

  return (
    <div className="application-container"> 
      <div className="application-card">
        <h2 className="application-title">Job Application</h2>
        <form className="application-form" onSubmit={handleSubmit}>
          
          {/* Name Input */}
          <div className="form-group">
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
          <div className="form-group">
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

          {/* Phone Input */}
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Resume Upload */}
          <div className="form-group">
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
          <button type="submit" className="application-btn">
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
