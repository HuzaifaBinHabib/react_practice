import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './TourDetails.css';

const TourDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [tour, setTour] = useState(state?.tour || null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tour) {
      fetch(`http://localhost:5000/api/v1/tour/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch tour details');
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === 'success') {
            setTour(data.data.info);
          } else {
            setError('Failed to load tour details.');
          }
        })
        .catch((err) => setError(err.message || 'An error occurred while fetching tour details.'));
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

  const handleBuyNow = () => {
    alert(`Proceeding to buy "${tour.name}".`);
  };

  if (error) {
    return <p className="error-message">{error}</p>;
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
          <p>
            <strong>Difficulty:</strong> {tour.difficulty}
          </p>
          <p>
            <strong>Price:</strong> ${tour.price}
          </p>
          <p>
            <strong>Rating:</strong> {tour.rating}
          </p>
          <p>
            <strong>Tour ID:</strong> {id}
          </p>

          <div className="action-buttons">
            <button onClick={handleAddToCart} className="btn btn-cart">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="btn btn-buy">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
