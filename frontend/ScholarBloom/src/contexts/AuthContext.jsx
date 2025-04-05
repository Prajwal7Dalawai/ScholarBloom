import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async (skipNavigate = false) => {
    try {
      const storedToken = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!storedToken || !userData) {
        handleAuthFailure();
        return false;
      }

      const response = await fetch('http://localhost:3000/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const { user: verifiedUser } = await response.json();
        
        if (!verifiedUser || !verifiedUser.role) {
          console.error('Invalid user data from verification');
          handleAuthFailure();
          return false;
        }

        // Only update if data has changed
        const currentUser = JSON.parse(userData);
        if (JSON.stringify(verifiedUser) !== JSON.stringify(currentUser)) {
          localStorage.setItem('user', JSON.stringify(verifiedUser));
          setUser(verifiedUser);
        } else {
          setUser(currentUser);
        }
        setToken(storedToken);
        return true;
      } else if (response.status === 401) {
        console.log('Token expired or invalid');
        handleAuthFailure();
        if (!skipNavigate && isProtectedRoute(location.pathname)) {
          navigate('/login', { 
            replace: true,
            state: { from: location.pathname }
          });
        }
        return false;
      } else {
        console.error('Verification failed:', response.status);
        handleAuthFailure();
        return false;
      }
    } catch (error) {
      console.error('Auth verification failed:', error);
      if (error.name !== 'TypeError') {
        handleAuthFailure();
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const isProtectedRoute = (path) => {
    return path.startsWith('/student') || 
           path.startsWith('/university') || 
           path.startsWith('/admin');
  };

  const handleAuthFailure = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    setLoading(false);
  };

  // Initial auth check on mount
  useEffect(() => {
    checkAuth(true);
  }, []);

  // Check auth when navigating to protected routes, but only if we have a token
  useEffect(() => {
    if (token && isProtectedRoute(location.pathname)) {
      const timeoutId = setTimeout(() => {
        checkAuth();
      }, 1000); // Add a delay to prevent rapid re-checks
      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, token]);

  // Periodic token verification (every 5 minutes)
  useEffect(() => {
    if (token) {
      const interval = setInterval(() => {
        checkAuth(true);
      }, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const login = async (userData, authToken) => {
    if (!userData || !userData.role) {
      console.error('Invalid user data or missing role:', userData);
      return;
    }

    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    
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
      if (token) {
        await fetch('http://localhost:3000/api/auth/logout', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      handleAuthFailure();
      navigate('/');
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
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