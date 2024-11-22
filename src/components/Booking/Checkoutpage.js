import React from "react";
import "./Checkoutpage.css";

const Checkout = () => {
  const handleConfirm = () => {
    alert("Order confirmed! Thank you for shopping with us.");
  };

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
      <button className="confirm-button" onClick={handleConfirm}>
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
