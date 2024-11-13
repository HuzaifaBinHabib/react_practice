// src/components/ProductCard.js
import React from 'react';

const TourCard = ({ tour }) => {
  return (
    <div className="tour-card">
            <h2>{tour.name}</h2>
            <img src={tour.photo} alt={tour.name} />
            <p>{tour.description}</p>
            <p>Price: ${tour.price}</p>
            <p>Rating: {tour.rating} / 10</p>
            <p>Difficulty: {tour.difficulty}</p>
    </div>
  );
};

export default TourCard;
