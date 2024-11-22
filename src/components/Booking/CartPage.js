import React, { useState, useEffect } from 'react';
import './CartPage.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);  // Initialize cartItems as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items when component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/booking/add-to-cart'); // Replace with your actual API endpoint
        const data = await response.json();

        if (data.status === 'success') {
          setCartItems(data.data || []);  // Ensure we always set an array, even if the response is empty
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
            <div className="cart-item" key={item._id}>
              {/* Render Product Details if present */}
              {item.productDetails && (
                <div className="product-info">
                  <h3>{item.productDetails.name}</h3>
                  <p>{item.productDetails.description}</p>
                  <p>Price: ${item.productDetails.price}</p>
                  {item.productDetails.photo && (
                    <img 
                      src={item.productDetails.photo} 
                      alt={item.productDetails.name} 
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                    />
                  )}
                </div>
              )}

              {/* Render Tour Details if present */}
              {item.tourDetails && (
                <div className="tour-info">
                  <h3>{item.tourDetails.name}</h3>
                  <p>{item.tourDetails.description}</p>
                  <p>Price: ${item.tourDetails.price}</p>
                  {item.tourDetails.photo && (
                    <img 
                      src={item.tourDetails.photo} 
                      alt={item.tourDetails.name} 
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                    />
                  )}
                </div>
              )}

              <div className="quantity">
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="total">
                <p>Total: ${item.productDetails ? item.productDetails.price * item.quantity : item.tourDetails.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
