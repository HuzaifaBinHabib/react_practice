import React from 'react';
import { useAuth } from '../Protected/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, logout } = useAuth(); // Access isLoggedIn and logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to login page after logout
  };

  let navLinks;

  if (isLoggedIn) {
    navLinks = (
      <>
        <Link to="/home">Home</Link>
        <Link to="/tours">Tours</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">Cart</Link> {/* Cart link */}
        <Link to="/checkout">Checkout</Link> {/* Checkout link */}
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  } else {
    navLinks = <Link to="/">Login</Link>;
  }

  return (
    <header className="header">
      <h1>ME&Tours</h1>
      <nav>
        {navLinks}
      </nav>
    </header>
  );
};

export default Header;
