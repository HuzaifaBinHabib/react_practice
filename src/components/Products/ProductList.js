import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  console.log(products); // Debugging: Inspect the products array

  return (
    <div className="tour-list">
      {products.map((product) => (
        <div key={product._id || product.id} className="product-container">
        <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
