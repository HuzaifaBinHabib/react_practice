import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../Protected/AuthContext'; // Custom authentication context
import axios from 'axios';
import './ProductPayment.css';

const ProductPayment = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { isLoggedIn } = useAuth(); // Access authentication status and logout function
  const [product, setProduct] = useState(state?.product || null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false); // State to indicate loading status
  const [paymentError, setPaymentError] = useState(null); // State to handle error messages during payment

  // Fetch product details if not passed from previous page (state)
  useEffect(() => {
    if (!product) {
      fetch(`http://localhost:5000/api/v1/product/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'success') {
            setProduct(data.data.product);
          } else {
            setError('Failed to load product details.');
          }
        })
        .catch(() => setError('An error occurred while fetching product details.'));
    }
  }, [id, product]);

  useEffect(() => {
    if (product) {
      document.title = product.name;
    }
  }, [product]);

  const handleAddToCart = async () => {
    setLoading(true);
    setPaymentError(null);
  
    try {
      const itemId = product._id || product.id;
      if (!itemId) {
        setPaymentError("Product ID is missing");
        return;
      }
  
      // Make the API request to add the item to the cart
      const response = await axios.post(
        `http://localhost:5000/api/v1/booking/add-to-cart`,
        { itemId, quantity }
      );
  
      console.log("Add to Cart Response:", response.data);
  
      // Check for the success message in the response
      if (response.data.message === "Item added to cart successfully") {
        window.location.href = "http://localhost:5000/home"; // Redirect to home
      } else {
        setPaymentError("Failed to add product to cart.");
      }
    } catch (err) {
      console.error("Add to Cart Error:", err);
      // Handle API error response if available
      setPaymentError(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  
  

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      setPaymentError("Please log in first.");
      return;
    }
    setLoading(true);
    setPaymentError(null);

    try {
      const token = localStorage.getItem("token");
      const productId = product._id || product.id;

      if (!productId) {
        throw new Error("Product ID is missing");
      }

      const response = await axios.post(
        `http://localhost:5000/api/v1/booking/checkout-session-product/${productId}`,
        { quantity }, // Send the selected quantity
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.session && response.data.session.url) {
        window.location.href = response.data.session.url;
      } else {
        throw new Error("Failed to initiate checkout session");
      }
    } catch (err) {
      setPaymentError(err.response?.data?.message || err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <div className="spinner">Loading...</div>;
  }

  return (
    <div className="product-details">
      <div className="product-details-box">
        <div className="product-image">
          <img
            src={product.photo}
            alt={product.name}
            onError={(e) => (e.target.src = '/fallback-image.jpg')}
          />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <h3>Product Details</h3>
          <p className="product-description">{product.description}</p>
          <p><strong>Stock:</strong> {product.quantity}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Color:</strong> {product.color}</p>
          <p><strong>Product ID:</strong> {id}</p>

          <div className="quantity-selector">
            <label htmlFor="quantity">Choose Quantity:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              max={product.quantity}
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.min(Math.max(1, e.target.value), product.quantity))
              }
            />
          </div>

          <div className="action-buttons">
            <button onClick={handleAddToCart} className="btn btn-cart" disabled={loading}>
              {loading ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
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

export default ProductPayment;
