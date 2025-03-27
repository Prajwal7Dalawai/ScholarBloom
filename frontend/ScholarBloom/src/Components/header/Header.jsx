import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in (fetch from localStorage)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from storage
    setIsLoggedIn(false);
    navigate("/"); // Redirect to homepage
  };

  return (
    <header className="header-container">
      <div className="logo">Scholar-Bloom</div>
      <nav className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/challenge" className="nav-item">Challenge</Link>
        <Link to="/jobApplication" className="nav-item">Job Portal</Link>
        <Link to="/scholarship" className="nav-item">Internships</Link>
        <Link to="/studentDashboard" className="nav-item">Dashboard</Link>

        {/* Show "Get Started" button if NOT logged in, else show "Logout" */}
        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="get-started" onClick={() => navigate("/signup")}>
            Get Started
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
