import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SignupPage.css"; // Import custom styles
import google from '../assets/google.png';
import { Link, useNavigate } from 'react-router-dom';
import { handleGoogleSignIn } from "../controls/login-signup";

const SignupPage = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [studentForm, setStudentForm] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [universityForm, setUniversityForm] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setIsLightMode(document.body.classList.contains("light-mode"));
  }, []);

  const toggleMode = () => {
    document.body.classList.toggle("light-mode");
    setIsLightMode(!isLightMode);
  };

  const handleStudentSignup = async () => {
    if (!studentForm.fullName || !studentForm.email || !studentForm.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post("http://localhost:3000/api/auth/register", {
        ...studentForm,
        role: "student"
      });

      localStorage.setItem("token", response.data.token);
      navigate("/login", { state: { successMessage: "Registration successful! Please login." } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUniversitySignup = async () => {
    if (!universityForm.fullName || !universityForm.email || !universityForm.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post("http://localhost:3000/api/auth/register", {
        ...universityForm,
        role: "university"
      });

      localStorage.setItem("token", response.data.token);
      navigate("/login", { state: { successMessage: "Registration successful! Please login." } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 px-3 px-md-5">

        <button onClick={toggleMode} className="mode-toggle-btn">
          {isLightMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        {/* Left Section - Students */}
        <div className={`col-md-6 text-center text-md-start p-5 signup-section ${isLightMode ? "light" : ""}`}>
          <div className="badge px-3 py-2 mb-3">STUDENT</div>
          <h2 className="fw-bold">
            For <span className="highlight">Students</span>
          </h2>
          <p>
            Join thousands of students, explore internship & scholarship opportunities, and take your academic journey to the next level.
          </p>

          <input 
            type="text" 
            className="form-control mb-3 input-dark" 
            placeholder="Full Name"
            value={studentForm.fullName}
            onChange={(e) => setStudentForm({...studentForm, fullName: e.target.value})}
          />
          <input 
            type="email" 
            className="form-control mb-3 input-dark" 
            placeholder="Email"
            value={studentForm.email}
            onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
          />
          <input 
            type="password" 
            className="form-control mb-3 input-dark" 
            placeholder="Password"
            value={studentForm.password}
            onChange={(e) => setStudentForm({...studentForm, password: e.target.value})}
          />

          {error && <div className="alert alert-danger">{error}</div>}

          <button 
            className="btn btn-outline-primary btn-lg w-100"
            onClick={handleStudentSignup}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="text-center my-3">OR</div>

          <button className="btn btn-google w-100" onClick={() => handleGoogleSignIn('student', navigate)}>
            <img src={google} alt="Google" className="google-icon" /> Sign Up with Google
          </button>

          <p className="mt-3">
            Already have an account? <Link to="/login" className="text-success fw-bold">Log in</Link>
          </p>
        </div>

        {/* Right Section - Universities */}
        <div className={`col-md-6 text-center text-md-start p-5 signup-section ${isLightMode ? "light" : ""}`}>
          <div className="badge px-3 py-2 mb-3">UNIVERSITY</div>
          <h2 className="fw-bold">
            For <span className="highlight">Universities</span>
          </h2>
          <p>
            Connect with top students, promote academic programs, and offer scholarships to talented learners.
          </p>

          <input 
            type="text" 
            className="form-control mb-3 input-dark" 
            placeholder="University Name"
            value={universityForm.fullName}
            onChange={(e) => setUniversityForm({...universityForm, fullName: e.target.value})}
          />
          <input 
            type="email" 
            className="form-control mb-3 input-dark" 
            placeholder="Email"
            value={universityForm.email}
            onChange={(e) => setUniversityForm({...universityForm, email: e.target.value})}
          />
          <input 
            type="password" 
            className="form-control mb-3 input-dark" 
            placeholder="Password"
            value={universityForm.password}
            onChange={(e) => setUniversityForm({...universityForm, password: e.target.value})}
          />

          {error && <div className="alert alert-danger">{error}</div>}

          <button 
            className="btn btn-outline-primary btn-lg w-100"
            onClick={handleUniversitySignup}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="text-center my-3">OR</div>

          <button className="btn btn-google w-100" onClick={() => handleGoogleSignIn('university', navigate)}>
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
