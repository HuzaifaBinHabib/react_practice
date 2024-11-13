// src/App.js
// src/App.js or src/index.js
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
// import Header from './components/Home/Header';
import HomePage from './components/Home/Homepage';
import TourPage from './components/Tours/TourPage';
import ProductPage from './components/Products/ProductPage';
import AboutPage from './components/About/AboutPage';
import Contact from './components/Contact/ContactPage';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />        
          <Route path="/Signup" element={<SignupPage />} />        
          <Route path="/Home" element={<HomePage />} />        
          <Route path="/Tours" element={<TourPage />} />        
          <Route path="/Products" element={<ProductPage />} />        
          <Route path="/About" element={<AboutPage />} />        
          <Route path="/Contact" element={<Contact />} />        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
