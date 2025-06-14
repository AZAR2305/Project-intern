import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      if (res.data.token) {
        const payload = JSON.parse(atob(res.data.token.split('.')[1]));
        if (payload.role !== 'admin') {
          return setMessage('Access denied. Admins only.');
        }
        localStorage.setItem('token', res.data.token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        {message && <p className="admin-login-message">{message}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;
