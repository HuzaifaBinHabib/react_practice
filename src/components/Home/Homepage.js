import React, { useState, useEffect } from 'react';
import './Homepage.css'; // Add your custom styling
import Bort from'./Bort.js'

const images = [
  "https://images.unsplash.com/photo-1712419326138-f71262529315?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1674333362725-84e9996aa6fb?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1505896202-4fe971e982fa?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1706367515596-7c9e657360c2?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Autoplay functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 9000);

    return () => clearInterval(slideInterval); // Cleanup
  }, []);

  // Navigate slides
  const nextSlide = () => setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevSlide = () => setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);

  // Thumbnail click
  const handleThumbnailClick = (index) => setActiveIndex(index);

  // Toggle chat visibility

  return (
    <div className="homepage">
      {/* Slider */}
      <div className="slider">
        <div className="list">
          {images.map((image, index) => (
            <div
              key={index}
              className={`item ${activeIndex === index ? 'active' : ''}`}
            >
              <img src={image} alt={`Slide ${index + 1}`} />
              <div className="content">
                <p>TOURS</p>
                <h2>TRIP {index + 1}</h2>
                <p>GET READY</p>
              </div>
            </div>
          ))}
        </div>
        <div className="arrows">
          <button 
            onClick={prevSlide} 
            aria-label="Previous Slide" 
            className="arrow-btn"
          >
            &lt;
          </button>
          <button 
            onClick={nextSlide} 
            aria-label="Next Slide" 
            className="arrow-btn"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="thumbnail">
        {images.map((image, index) => (
          <div
            key={index}
            className={`item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`Select slide ${index + 1}`}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
      <Bort/>
 
    </div>
  );
}

export default HomePage;
