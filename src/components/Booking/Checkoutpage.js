import React, { useState, useEffect } from 'react';
import { useAuth } from '../Protected/AuthContext'; // Custom authentication context
import axios from 'axios';
import './Checkoutpage.css';

const Checkout = () => {
  const { isLoggedIn } = useAuth(); // Access authentication status
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [error, setError] = useState(null); // State to handle error messages
  const [loading, setLoading] = useState(false); // State to indicate loading status
  const [paymentError, setPaymentError] = useState(null); // State to handle error messages during payment

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(
          'http://localhost:5000/api/v1/booking/add-to-cart',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );        const userId = localStorage.getItem('userId');
        if (response.data.status === 'success') {
          const userCartItems = response.data.data.filter((item) => item.userId === userId);
          setCartItems(userCartItems);
        } else {
          throw new Error('Failed to fetch cart items');
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Error fetching cart items.');
      }
    };

    if (isLoggedIn) {
      fetchCartItems();
    }
  }, [isLoggedIn]);

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
        'http://localhost:5000/api/v1/booking/checkout-session',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.session && response.data.session.url) {
        alert('Thank you for shopping with us.');
        window.location.href = response.data.session.url; // Redirect to checkout session
      } else {
        throw new Error('Failed to initiate checkout session');
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message || 'Something went wrong. Please try again.');
      } else if (err.request) {
        setError('Network error. Please check your connection and try again.');
      } else {
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
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <div className="item-info">
                  <img src={item.itemDetails?.photo || 'https://example.com/default-image.jpg'} alt={item.itemDetails?.name} />
                  <div className="item-details">
                    <span className="item-name">{item.itemDetails?.name || 'Unnamed item'}</span>
                  </div>
                </div>
                <span className="item-price">${item.itemDetails?.price || 0}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="total">
          <strong>Total:</strong>{' '}
          <span>
            ${cartItems.reduce(
              (total, item) => total + (item.itemDetails?.price || 0) * (item.quantity || 1),
              0
            )}
          </span>
        </div>
      </div>
      <button
        className="confirm-button"
        onClick={handleConfirm}
        disabled={loading || cartItems.length === 0}
      >
        {loading ? 'Processing...' : 'Confirm Order'}
      </button>
      {paymentError && <p className="error-message">{paymentError}</p>}
    </div>
  );
};

export default Checkout;
