// src/components/Header.js
import React from 'react';
import { useAuth } from '../Protected/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, logout } = useAuth(); // Access isLoggedIn and logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to login page on logout
  };

  return (
    <header className="header">
      <h1>ME&Tours</h1>
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/tours">Tours</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
