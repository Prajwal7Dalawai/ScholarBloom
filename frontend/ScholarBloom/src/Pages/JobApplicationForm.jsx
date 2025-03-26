import React, { useState } from "react";
import "./login.css"; // Make sure this file is properly linked
import googleLogo from "../assets/google.png";  
import { FcGoogle } from "react-icons/fc";

const JobApplicationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
  };

  const handleGoogleLogin = async () => {
    console.log("Google login attempted");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          
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

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="login-btn">
            Login
          </button>

          {/* Google Login Button */}
          <div className="google-login">
            <span>Or login with  <a href=""><FcGoogle /></a></span>
            

          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
