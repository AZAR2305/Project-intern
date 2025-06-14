// pages/UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // ✅ reuse existing styles
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/login');

      try {
        const res = await axios.get('http://localhost:5000/api/protected/user', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(res.data);
        setFormData({ username: res.data.username, email: res.data.email });
      } catch (err) {
        console.error('Error fetching profile:', err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleEditToggle = () => setEditMode(!editMode);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:5000/api/user/update', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser({ ...user, ...formData });
      setEditMode(false);
    } catch (err) {
      alert('Update failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) return <div className="profile-container"><p>Loading...</p></div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>{user.role === 'admin' ? 'Admin' : 'User'} Profile</h2>

        {editMode ? (
          <>
            <input name="username" value={formData.username} onChange={handleChange} />
            <input name="email" value={formData.email} onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleEditToggle}>Cancel</button>
          </>
        ) : (
          <>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <button onClick={handleEditToggle}>Edit Profile</button>
          </>
        )}

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default UserProfile;
