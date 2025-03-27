import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { logout } from "../../controls/login-signup";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header-container">
      <div className="logo">Scholar-Bloom</div>
      <nav className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/challenge" className="nav-item">Challenge</Link>
        <Link to="/jobApplication" className="nav-item">Opportunities</Link>
        <Link to="/scholarship" className="nav-item">Scholarships</Link>
        <Link to="/courses" className="nav-item">Courses</Link>
        <Link to="/studentDashboard" className="nav-item">Dashboard</Link>
        <button className="get-started" onClick={() => (window.location.href = "/signup")}>
  Signup
</button>
<button className="get-started" onClick={async () => logout(navigate)}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
