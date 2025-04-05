import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isLight = localStorage.getItem("lightMode") === "true";
    setIsLightMode(isLight);
    if (isLight) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Current token:', token);

        if (!token) {
          setIsAuthenticated(false);
          setUserRole(null);
          setUser(null);
          return;
        }

        // Get the user data from localStorage as a fallback
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Set the authentication state based on token and stored user data
        if (token && storedUser) {
          setIsAuthenticated(true);
          setUserRole(storedUser.role);
          setUser(storedUser);
        }

        // Try to verify with the backend
        const response = await fetch('http://localhost:3000/api/auth/verify', {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Auth response data:', data);
          setIsAuthenticated(true);
          setUserRole(data.role);
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        } else if (response.status === 401) {
          console.log('Auth failed with 401');
          setIsAuthenticated(false);
          setUserRole(null);
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Don't clear auth state on network errors if we have a valid token and user data
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (!token || !storedUser) {
          setIsAuthenticated(false);
          setUserRole(null);
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
    };

    checkAuth();
  }, []);

  const toggleMode = () => {
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    localStorage.setItem("lightMode", newMode);
    if (newMode) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (response.ok) {
        setIsAuthenticated(false);
        setUserRole(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleDashboard = () => {
    if (userRole === 'student') {
      navigate('/student');
    } else if (userRole === 'university') {
      navigate('/university');
    } else if (userRole === 'admin') {
      navigate('/admin');
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          ScholarBloom
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>
            {console.log('Auth state:', { isAuthenticated, userRole, user })}
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <button 
                    className="btn btn-primary" 
                    onClick={() => {
                      handleDashboard();
                      closeMenu();
                    }}
                  >
                    Dashboard
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-outline-primary" 
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-outline-primary" onClick={closeMenu}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="btn btn-primary" onClick={closeMenu}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 