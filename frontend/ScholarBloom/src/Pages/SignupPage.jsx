import React, { useState, useEffect } from "react";
import "./SignupPage.css"; // Import custom styles
import google from '../assets/google.png';
import { Link, useNavigate } from 'react-router-dom';
import { handleGoogleSignIn } from "../controls/login-signup";

const SignupPage = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check if light mode is active on body
    setIsLightMode(document.body.classList.contains("light-mode"));
  }, []);

  const toggleMode = () => {
    document.body.classList.toggle("light-mode");
    setIsLightMode(!isLightMode);
  };
  const navigate = useNavigate();


  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 px-3 px-md-5">

        {/* Mode Toggle Button */}
        <button onClick={toggleMode} className="mode-toggle-btn">
          {isLightMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        {/* Left Section - For Students */}
        <div className={`col-md-6 text-center text-md-start p-5 signup-section ${isLightMode ? "light" : ""}`}>
          <div className="badge px-3 py-2 mb-3">STUDENT</div>
          <h2 className="fw-bold">
            For <span className="highlight">Students</span>
          </h2>
          <p>
            Join thousands of students, explore internship & scholarship opportunities, and take your academic journey to the next level.
          </p>

          {/* Username & Password Fields */}
          <input type="text" className="form-control mb-3 input-dark" placeholder="Enter Username" />
          <input type="password" className="form-control mb-3 input-dark" placeholder="Enter Password" />

          {/* Sign Up Button */}
          <button className="btn btn-outline-primary btn-lg w-100">Sign Up</button>

          {/* OR Divider */}
          <div className="text-center my-3">OR</div>

          {/* Sign Up with Google */}
          <button className="btn btn-google w-100" onClick={() => handleGoogleSignIn('student',navigate)}>
            <img src={google} alt="Google" className="google-icon" /> Sign Up with Google
          </button>

          <p className="mt-3">
            Already have an account? <Link to="/login" className="text-success fw-bold">Log in</Link>
          </p>
        </div>

        {/* Right Section - For Universities */}
        <div className={`col-md-6 text-center text-md-start p-5 signup-section ${isLightMode ? "light" : ""}`}>
          <div className="badge px-3 py-2 mb-3">UNIVERSITY</div>
          <h2 className="fw-bold">
            For <span className="highlight">Universities</span>
          </h2>
          <p>
            Connect with top students, promote academic programs, and offer scholarships to talented learners.
          </p>

          {/* Username & Password Fields */}
          <input type="text" className="form-control mb-3 input-dark" placeholder="Enter University Name" />
          <input type="password" className="form-control mb-3 input-dark" placeholder="Enter Password" />

          {/* Sign Up Button */}
          <button className="btn btn-outline-primary btn-lg w-100">Sign Up</button>

          {/* OR Divider */}
          <div className="text-center my-3">OR</div>

          {/* Sign Up with Google */}
          <button className="btn btn-google w-100" onClick={() => handleGoogleSignIn('university',navigate)}>
            <img src={google} alt="Google" className="google-icon" /> Sign Up with Google
          </button>

          <p className="mt-3 text-light">
            Already have an account? <Link to="/login" className="text-success fw-bold">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
