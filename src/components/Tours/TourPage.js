// src/components/HomePage.js (formerly TourPage.js)
import React, { useEffect, useState } from 'react';
import TourList from './TourList';
// import "./Tour.css";

function HomePage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    // Replace with actual API endpoint
    fetch('http://localhost:5000/api/v1/tour')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setTours(data.data.info);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="homepage">

      <h1>Tours</h1>
      <TourList tours={tours} />
    </div>
  );
}

export default HomePage;
