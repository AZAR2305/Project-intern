import express from 'express';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route accessible to any logged-in user
router.get('/user', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you are logged in as ${req.user.role}` });
});

// Route accessible only to admins
router.get('/admin', verifyToken, requireRole(['admin']), (req, res) => {
  res.json({ message: 'Welcome Admin! This is a protected admin route.' });
});

export default router;
