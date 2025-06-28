import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { cartItems, total } = req.body;
  const address = req.user.address || req.body.address;
  if (!address) return res.status(400).json({ msg: 'Address required' });

  const order = new Order({
    user: req.user._id,
    items: cartItems,
    total,
    address
  });
  await order.save();

  await User.findByIdAndUpdate(req.user._id, {
    $inc: { ordersCount: 1 },
    $push: { ordersHistory: order._id }
  });

  res.json({ msg: 'Order placed', order });
});

router.get('/me', verifyToken, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
  res.json({ orders });
});

export default router;
