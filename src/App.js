import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/Homepage';
import TourPage from './components/Tours/TourPage';
import ProductPage from './components/Products/ProductPage';
import AboutPage from './components/About/AboutPage';
import ContactPage from './components/Contact/ContactPage';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import './App.css';
import { AuthProvider } from './components/Protected/AuthContext';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import ProductPayment from './components/Booking/ProductPayment';
import TourPayment from './components/Booking/TourPayment';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tours"
              element={
                <ProtectedRoute>
                  <TourPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <ContactPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <ProductPayment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tour/:id"
              element={
                <ProtectedRoute>
                  <TourPayment/>
                </ProtectedRoute>
              }
            />



            {/* Fallback Route */}
            <Route path="*" element={<div><h1>404 - Page Not Found</h1></div>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
