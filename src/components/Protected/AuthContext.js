import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for token and userId on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setIsLoggedIn(true);
    }
  }, []);

  // Login function: Save token and userId and update state
  const login = (token, userId) => {
    setIsLoggedIn(true);
    localStorage.setItem('authToken', token);  // Persist token in localStorage
    localStorage.setItem('userId', userId);    // Persist userId in localStorage
  };

  // Logout function: Clear token and userId and update state
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');   // Remove token on logout
    localStorage.removeItem('userId');      // Remove userId on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
