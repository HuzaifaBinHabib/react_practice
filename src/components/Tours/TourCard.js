// src/components/ProductCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

  const TourCard = ({ tour }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(`/tour/${tour._id || tour.id}`, { state: { tour } });

    };
  return (
    <div className="tour-card"  onClick={handleClick} style={{ cursor: 'pointer' }}>
            <h2>{tour.name}</h2>
            <img src={tour.photo} alt={tour.name} />
            <p>Price: ${tour.price}</p>
            <p>Rating: {tour.rating} / 10</p>
    </div>
  );
};

export default TourCard;
