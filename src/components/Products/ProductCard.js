import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product._id || product.id}`, { state: { product } });
  };

  return (
    <div className="product-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h2>{product.name}</h2>
      <img src={product.photo} alt={product.name} />
      <p>Price: ${product.price}</p>
      <p>Color: {product.color}</p>
    </div>
  );
};

export default ProductCard;
