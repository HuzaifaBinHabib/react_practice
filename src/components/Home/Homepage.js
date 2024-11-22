// src/components/HomePage.js
import React from 'react';
import './Homepage.css'; // Add your custom styling

// Sample images
const images = [
  "https://images.unsplash.com/photo-1712419326138-f71262529315?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
  "https://images.unsplash.com/photo-1674333362725-84e9996aa6fb?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1505896202-4fe971e982fa?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1706367515596-7c9e657360c2?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function HomePage() {


  return (
    <div className="homepage">
      <h1>Welcome to ME&Tours</h1>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Landscape ${index + 1}`} className="landscape-image" />
          </div>
        ))}
    </div>
  );
}

export default HomePage;
