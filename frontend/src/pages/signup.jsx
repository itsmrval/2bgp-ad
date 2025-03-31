import React, { useState } from 'react';
import { FaUserAlt, FaLock, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/auth.css';
import backgroundImage from '../assets/background1.jpg';

const Signup = () => {
  // Simple state variables for easier understanding
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Simple form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // d'autres validations peuvent être ajoutées ici
    
    console.log('Signup with:', username, email, password);
    // Add signup logic here
  };

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="glass-card">
        <div className="card-header">
          <h1>Join Ocean's Team</h1>
          <p>Create your account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="icon">
              <FaUserAlt />
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <div className="icon">
              <FaEnvelope />
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
          
          <div className="form-group">
            <div className="icon">
              <FaLock />
            </div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="glow-button">
            <FaUserPlus />
            <span>Sign Up</span>
          </button>
          
          <div className="card-footer">
            <p>Already a member? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
