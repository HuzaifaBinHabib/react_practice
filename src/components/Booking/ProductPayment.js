import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductPayment.css';

const ProductPayment = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [product, setProduct] = useState(state?.product || null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false); // State to indicate loading status
  const [paymentError, setPaymentError] = useState(null); // State to handle error messages during payment

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
    alert(`Added ${quantity} of "${product.name}" to the cart.`);

    setLoading(true);
    setPaymentError(null);
    try {
      const token = localStorage.getItem("token");
      const productId = product._id || product.id;
      
      if (!productId) {
        throw new Error("Product ID is missing");
      }
      
      const response = await axios.post(
        `http://localhost:5000/api/v1/booking/add-to-cart`,
         { productId: product._id, quantity },  // Send the selected quantity
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.status === 'success') {
        window.location.href = "http://localhost:5000/home"
      } else {
        throw new Error("Invalid response from server or missing session URL");
      }
    } catch (err) {
      setPaymentError(err.response?.data?.message || err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleBuyNow = async () => {
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
        throw new Error("Invalid response from server or missing session URL");
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

export default ProductPayment;
