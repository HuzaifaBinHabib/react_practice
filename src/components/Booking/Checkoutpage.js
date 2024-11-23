import React, { useState } from 'react';
import { useAuth } from '../Protected/AuthContext'; // Custom authentication context
import axios from 'axios';
import "./Checkoutpage.css";

const Checkout = () => {
  const { isLoggedIn } = useAuth(); // Access authentication status and logout function
  const [error, setError] = useState(null); // State to handle generic error messages
  const [loading, setLoading] = useState(false); // State to indicate loading status
  const [paymentError, setPaymentError] = useState(null); // State to handle error messages during payment

  const handleConfirm = async () => {
    if (!isLoggedIn) {
      setPaymentError('Please log in first.');
      return;
    }
    setLoading(true);
    setPaymentError(null);
    setError(null); // Clear any previous error message

    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.get(
        `http://localhost:5000/api/v1/booking/checkout-session`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.session && response.data.session.url) {
        alert("Order confirmed! Thank you for shopping with us.");
        window.location.href = response.data.session.url; // Redirect to checkout session
      } else {
        throw new Error('Failed to initiate checkout session');
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        // If the error is related to the response, display the message
        setError(err.response.data.message || 'Something went wrong. Please try again.');
      } else if (err.request) {
        // If no response was received (e.g., network error)
        setError('Network error. Please check your connection and try again.');
      } else {
        // General error message for other types of errors
        setError('An error occurred. Please try again later.');
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="checkout-container">
      <h1>Confirm Your Checkout</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          <li>
            <span>Product 1</span>
            <span>$20.00</span>
          </li>
          <li>
            <span>Product 2</span>
            <span>$15.00</span>
          </li>
          <li>
            <span>Product 3</span>
            <span>$30.00</span>
          </li>
        </ul>
        <div className="total">
          <strong>Total:</strong> <span>$65.00</span>
        </div>
      </div>
      <button className="confirm-button" onClick={handleConfirm} disabled={loading}>
        {loading ? 'Processing...' : 'Confirm Order'}
      </button>
      {paymentError && <p className="error-message">{paymentError}</p>}
    </div>
  );
};

export default Checkout;
