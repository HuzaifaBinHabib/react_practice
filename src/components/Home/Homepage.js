// src/components/HomePage.js
import React from 'react';
import Slider from 'react-slick'; // Import the react-slick component
import './Homepage.css'; // Add your custom styling
import Header from '../Home/Header';


// Sample images
const images = [
  "https://images.unsplash.com/photo-1712419326138-f71262529315?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
  "https://images.unsplash.com/photo-1674333362725-84e9996aa6fb?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1505896202-4fe971e982fa?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1706367515596-7c9e657360c2?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function HomePage() {
  // Slider settings
  const settings = {
    dots: true,             // Show dots navigation
    infinite: true,        // Infinite loop
    speed: 500,            // Transition speed (ms)
    autoplay: true,        // Enable auto sliding
    autoplaySpeed: 3000,   // Time between slides (ms)
    slidesToShow: 1,       // Show one slide at a time
    slidesToScroll: 1,     // Scroll one slide at a time
  };

  return (
    <div className="homepage">
      <Header/>
      <h1>Welcome to ME&Tours</h1>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Landscape ${index + 1}`} className="landscape-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomePage;
