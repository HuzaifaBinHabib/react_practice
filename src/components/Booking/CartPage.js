import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming user token is stored here
      const response = await axios.get('http://localhost:5000/api/v1/add-to-cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(response.data.items);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cart items. Please try again later.');
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:5000/api/v1/cart/${productId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCartItems(); // Refresh cart items
    } catch (err) {
      setError('Failed to update cart item.');
    }
  };

  const removeCartItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/v1/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCartItems(); // Refresh cart items
    } catch (err) {
      setError('Failed to remove cart item.');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product._id} className="cart-item">
                <img
                  src={item.product.imageUrl || '/fallback-image.jpg'}
                  alt={item.product.name}
                  onError={(e) => (e.target.src = '/fallback-image.jpg')}
                />
                <div className="item-details">
                  <h2>{item.product.name}</h2>
                  <p>{item.product.description}</p>
                  <p>
                    Price: <strong>${item.product.price.toFixed(2)}</strong>
                  </p>
                  <div className="quantity-control">
                    <button
                      onClick={() => updateCartItem(item.product._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateCartItem(item.product._id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => removeCartItem(item.product._id)} className="btn-remove">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${calculateTotal()}</h3>
            <button className="btn-checkout">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
