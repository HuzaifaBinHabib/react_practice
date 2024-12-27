import React from 'react';
import { useAuth } from '../Protected/AuthContext'; // Custom authentication context
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, logout } = useAuth(); // Access authentication status and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/login'); // Redirect to login page after logout
  };

  const handleLogin = () => {
    navigate('/login'); // Redirect to login page
  };

  let navLinks;

  if (isLoggedIn) {
    // User is logged in
    navLinks = (
      <>
        <Link to="/home">Home</Link>
        <Link to="/tours">Tours</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/CartPage">
  <img 
    src="https://i.ibb.co/qnPPjpt/Whats-App-Image-2024-11-22-at-01-44-53-51707cfc.jpg" 
    alt="Cart Icon" 
    style={{ width: '40px', height: '30px' }} 
  />
</Link>
        <button onClick={handleLogout}>Logout</button> {/* Show Logout button */}
      </>
    );
  } else {
    // User is not logged in
    navLinks = (
      <>
        <Link to="/home">Home</Link>
        <Link to="/tours">Tours</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>


        <button onClick={handleLogin}>Login</button> {/* Show Login button */}
      </>
    );
  }

  return (
    <header className="header">
      
      <div className="logo"></div>
        <ul className="menu">
      <h1>ME&Tours</h1>
      <nav>
        {navLinks}
      </nav>
        </ul>
        <div className="logo"></div>
    </header>
    
  );
};

export default Header;
