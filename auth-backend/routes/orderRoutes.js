import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/order — Place a new order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    if (!items || !totalAmount) {
      return res.status(400).json({ msg: 'Missing order data' });
    }

    const newOrder = new Order({
      userId: req.user.id,
      items,
      totalAmount
    });

    const savedOrder = await newOrder.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { orders: savedOrder }
    });

    res.status(201).json({ msg: 'Order placed', order: savedOrder });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
