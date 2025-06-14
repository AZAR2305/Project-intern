// ProfilePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // 🔑 STEP 1: Capture token (from URL or localStorage)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');

    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      setToken(tokenFromUrl);
      window.history.replaceState({}, document.title, '/profile');
    } else {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      } else {
        setError('No session token found. Please login.');
      }
    }
  }, [location]);

  // 🔑 STEP 2: Fetch user & orders when token is available
  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/protected/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
        setFormData({ username: res.data.username, email: res.data.email });

        const orderRes = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(orderRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
      }
    };

    fetchUserData();
  }, [token]);

  // 🔁 STEP 3: Redirect if there's an error
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => navigate('/login'), 2000);
      return () => clearTimeout(timeout);
    }
  }, [error, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEditToggle = () => setEditMode(!editMode);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/user/update', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ ...user, ...formData });
      setEditMode(false);
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (error) return <div className="profile-container"><p>{error}</p></div>;
  if (!user) return <div className="profile-container"><p>Loading profile...</p></div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Welcome, {user.username}!</h2>

        {editMode ? (
          <div className="edit-fields">
            <input name="username" value={formData.username} onChange={handleInputChange} />
            <input name="email" value={formData.email} onChange={handleInputChange} />
            <div className="edit-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleEditToggle}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="info-block">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <button onClick={handleEditToggle}>Edit Profile</button>
          </div>
        )}

        {user.role === 'admin' ? (
          <div className="admin-section">
            <h3>Admin Dashboard</h3>
            <p>You can manage products, users, and analytics here. (Coming Soon...)</p>
          </div>
        ) : (
          <div className="user-section">
            <h3>Your Orders</h3>
            {orders.length ? (
              <ul>
                {orders.map((order, i) => (
                  <li key={i}>Order #{order._id} - {order.status}</li>
                ))}
              </ul>
            ) : <p>No orders yet.</p>}
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default ProfilePage;
