import React, { useState, useContext } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", form);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      console.log("Login success:", res.data);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setMessage('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.log("Login error:", err.response);
      setMessage(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        <p className="login-message">{message}</p>
      </div>
    </div>
  );
}

export default Login;
