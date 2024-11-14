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
import { AuthProvider } from './components/Protected/AuthContext';
import ProtectedRoute from './components/Protected/ProtectedRoute';

function App() {
  return (
    <AuthProvider>

    <Router>
      <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />        
          <Route path="/Signup" element={<SignupPage />} />        
          <Route path="/Home" element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />        
          <Route path="/Tours" element={<ProtectedRoute> <TourPage /></ProtectedRoute>} />        
          <Route path="/Products" element={<ProtectedRoute> <ProductPage /> </ProtectedRoute>} />        
          <Route path="/About" element={<ProtectedRoute> <AboutPage /> </ProtectedRoute>} />        
          <Route path="/Contact" element={<ProtectedRoute> <Contact /> </ProtectedRoute>} />        
        </Routes>
      </div>
    </Router>
     </AuthProvider>

  );
}

export default App;
