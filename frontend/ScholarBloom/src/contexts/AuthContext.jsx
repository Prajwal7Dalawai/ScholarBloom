import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
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
          console.log('Stored user data:', parsedUser); // Debug log
          
          if (!parsedUser.role) {
            console.error('No role found in user data');
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return;
          }

          setUser(parsedUser);
          setToken(storedToken);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData, authToken) => {
    console.log('Login called with:', { userData, authToken }); // Debug log

    if (!userData || !userData.role) {
      console.error('Invalid user data or missing role:', userData);
      return;
    }

    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    
    // Navigate based on user role
    console.log('Navigating based on role:', userData.role); // Debug log
    
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
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if server request fails
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
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