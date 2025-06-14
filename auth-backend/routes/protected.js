import express from 'express';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route accessible to any logged-in user
// routes/protected.js
router.get('/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
});


// Route accessible only to admins
router.get('/admin', verifyToken, requireRole(['admin']), (req, res) => {
  res.json({ message: 'Welcome Admin! This is a protected admin route.' });
});

export default router;
