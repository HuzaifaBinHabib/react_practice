// src/StripeFetch.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
  const [id, setId] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Automatically fetch data when component mounts
    if (id) {
      handleFetch();
    }
  }, [id]); // Fetch when 'id' is set

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch data from Node.js backend
      const response = await axios.get(`http://localhost:5000/api/v1/booking/checkout-session-product/${id}`);
      setData(response.data.session); // Set the data from the response

      // Open the Stripe checkout URL automatically
      if (response.data.session || response.data.session.url) {
        window.location.href = response.data.session.url; // Redirect to the checkout URL
      }
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Fetch Stripe Data by ID</h1>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter Stripe ID"
      />
      <button onClick={handleFetch} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div>
          <h3>Customer Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Payment;
