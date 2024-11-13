// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <h1>ME&Tours</h1>
      <nav>
        <a href="/Home">Home</a>
        <a href="/Tours">Tours</a>
        <a href="/Products">Products</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
