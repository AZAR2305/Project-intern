// routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '../models/User.js';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js'; // add this with your other imports


dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email already exists as user' });

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ msg: 'Email already exists as admin' });

    const hashed = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString('hex');
    const user = new User({ username, email, password: hashed, verificationToken: token, role: 'user' });
    await user.save();

    const url = `http://localhost:5000/api/auth/verify/${token}`;
   

    await transporter.sendMail({
      to: email,
      subject: 'Verify Email',
      html: `Click <a href="${url}">here</a> to verify your email.`
    });

    res.status(201).json({ msg: 'User created, verify your email.' });
  }  catch (err) {
  console.error('Signup route error:', err);
  res.status(500).json({ error: err.message });
}
});
// Email verification
// Email verification (updated)
router.get('/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.status(400).send('Invalid or expired token');

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Auto-login after verification
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Redirect with token as query param (or store in cookie for security)
    res.redirect(`http://localhost:3000/profile?token=${token}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    if (!user.isVerified) return res.status(403).json({ msg: 'Please verify your email first' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
