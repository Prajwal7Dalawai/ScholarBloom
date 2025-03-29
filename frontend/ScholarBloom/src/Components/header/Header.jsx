import { useTheme } from "../../ThemeContext"; // Import theme context
import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../controls/login-signup";
const Header = () => {
  const navigate = useNavigate();
  const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header-container">
      <div className="logo">
        Scholar-Bloom
        
      </div>

      <nav className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/challenge" className="nav-item">Challenge</Link>
        <Link to="/jobApplication" className="nav-item">Job Portal</Link>
        <Link to="/scholarship" className="nav-item">Internships</Link>
        <Link to="/studentDashboard" className="nav-item">Dashboard</Link>
        
        {/* Get Started Button */}
        <button className="get-started" onClick={() => (window.location.href = "/signup")}>
  Signup
</button>
<button className="get-started" onClick={async () => logout(navigate)}>Logout</button>
      </nav>
      {/* 🌙/☀️ Icon beside the logo */}
      <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
    </header>
  );
};

export default Header;
