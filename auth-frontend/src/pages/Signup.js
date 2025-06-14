import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // We'll write this next


function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      setMessage(res.data.msg);
      
    } catch (err) {
  console.error('Signup error response:', err.response);
  const serverMsg = err.response?.data?.msg || err.response?.data?.error;
  setMessage(serverMsg || 'Signup failed – see console for details');
}
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Sign Up</button>
        </form>
        {message && <p className="signup-message">{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
