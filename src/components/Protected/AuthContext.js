import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// Custom hook to access AuthContext
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

  /**
   * Login function
   * @param {string} token - JWT token for authentication
   */
  const login = (token, userId) => {
    if (token) {
      localStorage.setItem('authToken', token); // Persist token in localStorage
  
      setIsLoggedIn(true);
    } else {
      console.error('Login failed: Token is required.');
    }
  };

  /**
   * Logout function
   * Clears authToken and userId from localStorage and updates state
   */
  const logout = () => {
    localStorage.removeItem('authToken'); // Remove token on logout
    localStorage.removeItem('userId');   // Remove userId on logout
    setIsLoggedIn(false);
  };

  // Context value to be shared
  const contextValue = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
