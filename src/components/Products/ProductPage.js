// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import Bort from'./../Home/Bort'

// import "./Product.css"


function ProductPage() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    // Replace with actual API endpoint
    fetch('http://localhost:5000/api/v1/product')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setProduct(data.data.info);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="homepage">
            <h1>  </h1>

      <ProductList products={products}/>
      <Bort/>
    </div>
  );
}

export default ProductPage;

