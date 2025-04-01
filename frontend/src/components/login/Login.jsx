import React, { useState } from 'react';
import { FaUserAlt, FaLock, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../assets/styles/auth.css';
import backgroundImage from '../../assets/img/background1.jpg';

const Login = () => {
  // Simple state for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Simple form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login with:', email, password);
    // Add login logic here
  };

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="glass-card">
        <div className="card-header">
          <h1>Ocean's Access</h1>
          <p>Enter your credentials</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="icon">
              <FaUserAlt />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <div className="icon">
              <FaLock />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="forgot-link">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          
          <button type="submit" className="glow-button">
            <FaSignInAlt />
            <span>Login</span>
          </button>
          
          <div className="card-footer">
            <p>New here? <Link to="/signup">Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
