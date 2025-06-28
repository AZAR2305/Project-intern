import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify/${token}`);
        localStorage.setItem('token', res.data.token);
        navigate('/profile');
      } catch (err) {
        console.error('Verification failed:', err);
        alert(err.response?.data?.msg || 'Verification failed.');
        navigate('/signup'); // fallback
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return <p>Verifying email...</p>;
}

export default VerifyEmail;
