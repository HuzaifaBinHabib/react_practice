// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Login.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setError(''); // Clear any previous error message

    // Mock login check (replace with actual authentication logic)
    if (username === 'user' && password === 'password') {
      alert('Login successful!');
      navigate('/Home'); // Redirect to home page on success
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {error && <div className="error-message">{error}
          </div>}
         <p>Signup if don't Login <a href='/Signup'>Signup</a></p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
