// routes/user.js (or similar)
import express from 'express';
import User from '../models/User.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // ✅
 // JWT auth middleware

const router = express.Router();

// Get logged-in user's info
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // If you have orders in your system, get them here:
    const orders = []; // replace this with your real Order.find({ userId: req.user.id })

    res.json({ user, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});router.put('/me', verifyToken, async (req, res) => {
  const { username, email, phone, address, age } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email, phone, address, age },
      { new: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ msg: 'User not found' });

    res.json({ user: updatedUser });
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(400).json({ msg: 'Invalid update data' });
  }
});

export default router;