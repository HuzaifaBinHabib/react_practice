import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className="tour-list">
      {products.map((product) => (
        <div key={product._id} className="product-container">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
