// models/Admin.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'admin' },
});

export default mongoose.model('Admin', adminSchema);
