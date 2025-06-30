// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
const tokenFromURL = urlParams.get('token');
const token = tokenFromURL || localStorage.getItem('token');
console.log('Token:', token);
const [isNew, setIsNew] = useState(false);


useEffect(() => {
  if (tokenFromURL) localStorage.setItem('token', tokenFromURL);
}, [tokenFromURL]);


  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    phone: '',
    age: ''
  });

  useEffect(() => {
    if (!token) return navigate('/login');
   axios.get('http://localhost:5000/api/user/me', { headers: { Authorization: `Bearer ${token}` } })
.then(({ data }) => {
      setUser(data.user);
      setOrders(data.orders);
      const { username, email, address, phone, age } = data.user;
      const incomplete = !address || !phone || !age;
      setIsNew(incomplete);
      if (!incomplete) setFormData({ username, email, address, phone, age });
      else setFormData({ username, email, address: '', phone: '', age: '' });
    }).catch(() => navigate('/login'));
  }, [token, navigate]);

  const handleEditToggle = () => setEditMode(v => !v);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSave = async () => {
  try {
    const token = localStorage.getItem('token');
    
    const updateData = {
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      age: formData.age,
    };

    const response = await axios.put(
      'http://localhost:5000/api/user/me',
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setUser(response.data.user);
    console.log("Profile updated successfully.");
  } catch (err) {
    console.error("Profile update error:", err);
    alert(err.response?.data?.msg || 'Failed to update profile.');
  }
};


  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>🧑 {isNew ? 'Complete Your Profile' : `Welcome, ${user.username}!`}</h2>

        <div className="form-block">
          {['username','email','address','phone','age'].map(field => (
            <div key={field} className="field-group">
              <label>{field.charAt(0).toUpperCase()+field.slice(1)}:</label>
              <input
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field}
              />
            </div>
          ))}
          <button className="save-btn" onClick={handleSave}>
            {isNew ? 'Save Profile' : 'Update Profile'}
          </button>
        </div>

        <button className="logout-btn" onClick={handleLogout}>Logout 🔓</button>
      </div>
    </div>
  );
};

export default Profile;