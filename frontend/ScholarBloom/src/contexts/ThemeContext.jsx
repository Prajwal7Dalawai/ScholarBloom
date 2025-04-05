import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [isLightMode, setIsLightMode] = useState(() => {
    const savedMode = localStorage.getItem('lightMode');
    return savedMode === 'true';
  });

  useEffect(() => {
    const body = document.body;
    if (isLightMode) {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
      localStorage.setItem('lightMode', 'true');
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('lightMode', 'false');
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
} 