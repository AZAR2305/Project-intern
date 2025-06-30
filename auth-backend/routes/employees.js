// routes/employees.js
import express from 'express';
import Employee from '../models/Employee.js';
import { verifyToken, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all employees
router.get('/', verifyToken, requireRole('admin'), async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// POST create employee
router.post('/', verifyToken, requireRole('admin'), async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json(employee);
});

// PUT update employee
router.put('/:id', verifyToken, requireRole('admin'), async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE employee
router.delete('/:id', verifyToken, requireRole('admin'), async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted successfully' });
});

export default router;
