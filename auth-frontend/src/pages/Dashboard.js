// Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashBoard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Session expired. Please login.');
          return navigate('/login');
        }

        const res = await axios.get('http://localhost:5000/api/protected/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (err) {
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const goToProfile = () => navigate('/user-profile');

  if (error) {
    return (
      <div className="grocery-dashboard-container">
        <div className="grocery-card">
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="grocery-dashboard-container">
        <div className="grocery-card">
          <p>Loading your grocery dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grocery-dashboard-container">
      <div className="grocery-card">
        <h2>Welcome, <span className="username">{user.username || 'User'}</span>!</h2>
        <p><strong>User ID:</strong> {user._id}</p>
        <p><strong>Role:</strong> {user.role}</p>

        <button className="btn view-profile" onClick={goToProfile}>
          View Profile
        </button>

        <div className="dashboard-section">
          <h3>
            {user.role === 'admin' ? 'Store Admin Panel 🛠️' : 'User Dashboard 🛒'}
          </h3>
          <p>
            {user.role === 'admin'
              ? 'Manage inventory, view reports, and edit store settings.'
              : 'Access your profile and track your orders with freshness!'}
          </p>
        </div>

        <button className="btn logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
