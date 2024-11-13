import React from 'react';
import TourCard from './TourCard';

const TourList = ({ tours }) => {
  return (
    <div className="tour-list">
      {tours.map((tour) => (
        <div key={tour._id} className="tour-container">
          <TourCard tour={tour} />
        </div>
      ))}
    </div>
  );
};

export default TourList;
