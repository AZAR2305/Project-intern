import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [{ name: String, price: Number }],
  totalAmount: Number,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  role: { type: String, default: 'user' },
  address: { type: String },
  phone: { type: String },
  age: { type: Number },
  orders: [orderSchema]
});

export default mongoose.model('User', userSchema);
