// models/Employee.js
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  department: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  joiningDate: Date,
});

export default mongoose.model('Employee', employeeSchema);
