import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800&family=Exo:wght@400;700&display=swap" rel="stylesheet"/>


const Header = ({isAuth}) => {
  return (
    <header>
        <div className="logo">Scholor-Bloom</div>

        <div className="link">
            <Link to={'/'}>Home</Link>
            <Link to={'/challenge'}>Challenge</Link>
            <Link to={'/jobApplication'}>Job Portal</Link>
            <Link to={'/scholarship'}>Internships</Link>
            <Link to={'/about'}>About</Link>
            <Link to={'/studentDashboard'}>Dashboard</Link>
            <Link to={'/login'}>Login</Link>
        </div>
    </header>
  );
};

export default Header;
