import { useState } from "react";
import './SignupPage.css';

export default function SignUp() {
  const [userType, setUserType] = useState(""); // No selection initially
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${userType} Login Data:`, formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Login as</h2>

        {/* Login Buttons */}
        <div className="login-buttons">
          <button
            className={userType === "student" ? "active-btn" : ""}
            onClick={() => setUserType("student")}
          >
            Student Login
          </button>
          <button
            className={userType === "university" ? "active-btn" : ""}
            onClick={() => setUserType("university")}
          >
            University Login
          </button>
        </div>

        {/* Show Login Form Only When a User Type is Selected */}
        {userType && (
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="signup-input"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="signup-input"
              onChange={handleChange}
              required
            />

            <button type="submit" className="signup-btn">
              Login as {userType === "student" ? "Student" : "University"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
