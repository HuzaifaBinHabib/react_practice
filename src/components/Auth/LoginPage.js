// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Protected/AuthContext';
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/signin', {
        email,
        password,
      });

      const { status, token, data, } = response.data;

      if (status === 'success') {
        // Save the token and login the user
        login(token); // Save the token to the context
        localStorage.setItem('authToken', token); // Optionally save the token for persistence
        localStorage.setItem('userId', data.user._id); // Save user ID
        
        alert(`Welcome, ${data.user.userName}!`);
        navigate('/home'); // Redirect to the home page
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p>
        Don't have an account? <a href="/Signup">Signup</a>
      </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
  
};

export default LoginPage;
