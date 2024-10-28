import React, { useState } from 'react';
import axios from 'axios';
import './Registration.js.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      loginUser();
    } else {
      registerUser();
    }
  };

  const loginUser = async () => {
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setMessage(response.data.message);
      setError('');
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      setMessage('');
    }
  };

  const registerUser = async () => {
    try {
      const response = await axios.post('http://localhost:8000/register', {
        email,
        password,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      setMessage('');
    }
  };

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="registration-container">
      <h1>User Registration and Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="primary-button">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {message && <div className="message">{message}</div>}
      <a href="#forgot-password" className="link">Forgot Password?</a>
      <a href="#terms-conditions" className="link">Terms & Conditions</a>
      <div className="toggle-section">
        <span onClick={toggleForm}>
          {isLogin ? 'Need to register? Click here.' : 'Already registered? Log in.'}
        </span>
      </div>
      <footer className="footer">
        <span>Legal and Company Information</span>
      </footer>
    </div>
  );
}

export default Registration;
