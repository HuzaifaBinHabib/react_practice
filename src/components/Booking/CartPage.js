import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/booking/add-to-cart');
        const data = await response.json();
        const userId = localStorage.getItem('userId');
        if (data.status === 'success') {
          const userCartItems = data.data.filter((item) => item.userId === userId);
          setCartItems(userCartItems);
        } else {
          setError('No items in your cart');
        }
      } catch (err) {
        setError('Failed to load cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/booking/remove-from-cart/${itemId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.status === 'success') {
        // Update state to remove the item locally
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
      } else {
        setError('Failed to remove item from cart');
      }
    } catch (err) {
      setError('An error occurred while removing the item');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id} style={{ position: 'relative' }}>
              <button
                className="remove-button"
                onClick={() => handleRemoveItem(item._id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                &times;
              </button>
              <div className="product-info">
                <h3>{item.itemDetails.name}</h3>
                <p>{item.itemDetails.description}</p>
                <p>Price: ${item.itemDetails.price}</p>
                {item.itemDetails.photo && (
                  <img
                    src={item.itemDetails.photo}
                    alt={item.itemDetails.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                )}
              </div>
              <div className="quantity">
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="total">
                <p>Total: ${item.itemDetails.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        className="checkout-button"
        onClick={() => navigate('/checkoutpage')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
