import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    passwordconfirm: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordconfirm) {
      setError('Passwords do not match');
      setSuccess('');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/v1/auth/signup', formData);
      setSuccess('User created successfully!');
      setError('');
      alert(`Signup successfully!`);
      navigate('/');
    } catch (err) {
      setError('Error creating user. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="passwordconfirm">Confirm Password</label>
          <input
            type="password"
            id="passwordconfirm"
            name="passwordconfirm"
            value={formData.passwordconfirm}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
