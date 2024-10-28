import React, { useState } from 'react';
import axios from 'axios';
import './Login.js.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const toggleRegistering = () => setIsRegistering(!isRegistering);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = isRegistering
        ? await axios.post('http://localhost:8000/register', { email, password }, { headers: { 'Content-Type': 'application/json' } })
        : await axios.post('http://localhost:8000/login', { email, password }, { headers: { 'Content-Type': 'application/json' } });
      const { message, token } = response.data;
      if (isRegistering) {
        alert(message);
      } else {
        localStorage.setItem('token', token);
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <h1>User Registration and Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="links">
        <a href="#" onClick={toggleRegistering}>
          {isRegistering ? 'Already have an account? Log in' : 'Need an account? Register'}
        </a>
        <a href="#">Forgot Password</a>
        <a href="#">Terms & Conditions</a>
      </div>
      <footer>
        <p>© 2023 Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Login;
