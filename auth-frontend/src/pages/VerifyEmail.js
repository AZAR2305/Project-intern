
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState('Verifying...');

  useEffect(() => {
    async function verify() {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
        setMessage(res.data || 'Email verified!');
      } catch (err) {
        setMessage(err.response?.data || 'Invalid or expired token');
      }
    }
    verify();
  }, [token]);

  return (
    <div className="container">
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
}

export default VerifyEmail;