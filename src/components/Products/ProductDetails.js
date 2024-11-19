import { useLocation, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(state?.product || null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  const handleAddToCart = () => {
    alert(`Added ${quantity} of "${product.name}" to the cart.`);
  };

  const handleBuyNow = () => {
    alert(`Proceeding to buy ${quantity} of "${product.name}".`);
    navigate(`/payment/${product._id || product.id}`, { state: { product } });
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
            <button onClick={handleBuyNow} className="btn btn-buy">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
