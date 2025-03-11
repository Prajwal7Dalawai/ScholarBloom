import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800&family=Exo:wght@400;700&display=swap" rel="stylesheet"/>


const Header = ({isAuth}) => {
  return (
    <header>
        <div className="logo">Edu-Quest</div>

        <div className="link">
            <Link to={'/'}>Landing</Link>
            <Link to={'/Challenge'}>Challenge</Link>
            <Link to={'/jobApplication'}>Job Portal</Link>
            <Link to={'/about'}>About</Link>
            { isAuth ? (
              <Link to={'/studentDashboard'}>Dashboard</Link>
            ) : (
              <Link to={'/login'}>Login</Link>
            )}
        </div>
    </header>
  );
};

export default Header;
