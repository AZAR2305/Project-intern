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
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already exists as user' });
    }


    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ msg: 'Email already exists as admin' });


    // Hash password and generate token
    const hashed = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString('hex');

    // Create new user
    const user = new User({
      username,
      email,
      password: hashed,
      verificationToken: token,
      role: 'user',
      isVerified: false
    });
    console.log("Generated verification token:", token);

    await user.save();
        console.log("Generated verification token:", token);

    // Construct verification URL
      const url = `http://localhost:5000/api/auth/verify/${token}`;

    // Send email
    await transporter.sendMail({
      to: email,
      subject: 'Verify Email',
      html: `<p>Welcome to our app!</p><p>Click <a href="${url}">here</a> to verify your email.</p>`
    });

    res.status(201).json({ msg: 'User created, verify your email.' });

  } catch (err) {
    console.error('Signup route error:', err);
    res.status(500).json({ error: 'Signup failed. Please try again later.' });
  }
});
// Email verification
// Email verification (updated)git check-ignore -v auth-frontend/*

router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = '';
    await user.save();

    // Generate JWT token after verification
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // ✅ Redirect with token to frontend
    res.redirect(`http://localhost:3000/profile?token=${jwtToken}`);
  } catch (err) {
    console.error('Verification error:', err);
    res.status(500).json({ msg: 'Internal Server Error' });
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
