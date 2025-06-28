const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    const newOrder = new Order({
      user: req.user.id,
      items,
      total,
      status: 'Pending'
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order', error });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get orders', error });
  }
};
