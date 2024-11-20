import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductPayment.css';

const TourPayment = () => {
  const { id } = useParams();
  const { state } = useLocation();
  // const navigate = useNavigate();
  const [tour, setTour] = useState(state?.tour || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State to indicate loading status
  const [paymentError, setPaymentError] = useState(null); // State to handle error messages during payment

  useEffect(() => {
    if (!tour) {
      fetch(`http://localhost:5000/api/v1/tour/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            setTour(data.data.tour);
          } else {
            setError('Failed to load tour details.');
          }
        })
        .catch(() => setError('An error occurred while fetching tour details.'));
    }
  }, [id, tour]);

  useEffect(() => {
    if (tour) {
      document.title = tour.name;
    }
  }, [tour]);

  const handleAddToCart = () => {
    alert(`Added "${tour.name}" to the cart.`);
  };

  const handleBuyNow = async () => {
    setLoading(true);
    setPaymentError(null);

    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

      const tourId = tour._id || tour.id; // Use _id or id for consistency
      if (!tourId) {
        throw new Error('Tour ID is missing');
      }

      const response = await axios.get(`http://localhost:5000/api/v1/booking/checkout-session-tour/${tourId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in request headers
        }
      });

      if (response.data && response.data.session && response.data.session.url) {
        window.location.href = response.data.session.url;
      } else {
        throw new Error('Invalid response from server or missing session URL');
      }
    } catch (err) {
      const errorMessage = err.response
        ? `Server Error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`
        : `Network Error: ${err.message}`;
      setPaymentError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!tour) {
    return <div className="spinner">Loading...</div>;
  }

  return (
    <div className="product-details">
      <div className="product-details-box">
        <div className="product-image">
          <img
            src={tour.photo}
            alt={tour.name}
            onError={(e) => (e.target.src = '/fallback-image.jpg')}
          />
        </div>
        <div className="product-info">
          <h1>{tour.name}</h1>
          <h3>Tour Details</h3>

          <p className="product-description">{tour.description}</p>
          <p><strong>Difficulty:</strong> {tour.difficulty}</p>
          <p><strong>Price:</strong> ${tour.price}</p>
          <p><strong>Rating:</strong> {tour.rating}</p>
          <p><strong>Tour ID:</strong> {id}</p>


          <div className="action-buttons">
            <button onClick={handleAddToCart} className="btn btn-cart">Add to Cart</button>
            <button onClick={handleBuyNow} className="btn btn-buy" disabled={loading}>
              {loading ? 'Redirecting...' : 'Buy Now'}
            </button>
          </div>

          {paymentError && (
            <p style={{ color: 'red', marginTop: '10px' }}>
              {paymentError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourPayment;