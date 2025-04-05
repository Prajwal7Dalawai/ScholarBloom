import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!storedToken || !userData) {
        setUser(null);
        setToken(null);
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3000/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const parsedUser = JSON.parse(userData);
        console.log('Stored user data:', parsedUser);
        
        if (!parsedUser.role) {
          console.error('No role found in user data');
          handleAuthFailure();
          return;
        }

        setUser(parsedUser);
        setToken(storedToken);
      } else {
        handleAuthFailure();
      }
    } catch (error) {
      console.error('Auth verification failed:', error);
      // Only clear auth if it's not a network error
      if (error.name !== 'TypeError') {
        handleAuthFailure();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAuthFailure = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
  };

  // Check auth on mount and when location changes
  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  // Periodic token verification (every 5 minutes)
  useEffect(() => {
    if (token) {
      const interval = setInterval(checkAuth, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const login = (userData, authToken) => {
    console.log('Login called with:', { userData, authToken });

    if (!userData || !userData.role) {
      console.error('Invalid user data or missing role:', userData);
      return;
    }

    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    
    console.log('Navigating based on role:', userData.role);
    
    switch (userData.role) {
      case 'student':
        navigate('/student');
        break;
      case 'university':
        navigate('/university');
        break;
      case 'admin':
        navigate('/admin');
        break;
      default:
        console.error('Unknown role:', userData.role);
        navigate('/');
    }
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        handleAuthFailure();
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if server request fails
      handleAuthFailure();
      navigate('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 