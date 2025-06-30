import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Verify from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import UserProfile from './pages/UserProfile';
import AdminEmployees from './pages/AdminEmployee';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const { token } = useContext(AuthContext);

  let userRole = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (err) {
      console.error("Token decode failed:", err.message);
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/user-profile" element={token ? <UserProfile /> : <Navigate to="/login" />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/dashboard"
          element={token && userRole === 'admin' ? <AdminEmployees /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
