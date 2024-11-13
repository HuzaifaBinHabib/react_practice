// src/components/ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
            <h2>{product.name}</h2>
            <img src={product.photo} alt={product.name} />
            <p>{product.description}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ${product.price}</p>
            <p>color: {product.color} </p>
    </div>
  );
};

export default ProductCard;
