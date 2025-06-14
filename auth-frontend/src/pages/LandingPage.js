import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="landing-title">GreenGrocer</h1>
        <p className="landing-desc">
          Welcome to GreenGrocer, your trusted local e-commerce grocery store! Browse, choose, and shop fresh produce and daily essentials from the comfort of your home.
        </p>
        <div className="landing-buttons">
          <div
            className="login-dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="login-main-btn">Login</button>
            {showDropdown && (
              <div className="login-dropdown-content">
                <button onClick={() => navigate('/admin/login')}>Admin Login</button>
                <button onClick={() => navigate('/login')}>User Login</button>
              </div>
            )}
          </div>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
