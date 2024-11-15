import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Login function: Save token and update state
  const login = (token) => {
    setIsLoggedIn(true);
    localStorage.setItem('authToken', token); // Persist token in localStorage
  };

  // Logout function: Clear token and update state
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('authToken'); // Remove token on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
