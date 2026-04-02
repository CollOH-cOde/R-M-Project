// server/controllers/authController.js
// =========================================================
// Auth Controller - Handles signup and login logic
// =========================================================

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * POST /api/auth/signup
 * Register a new user account
 */
async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // --- Input Validation ---
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    if (name.trim().length < 2) {
      return res.status(400).json({ message: 'Name must be at least 2 characters.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    // --- Check for Duplicate Email ---
    const existingUser = await User.findByEmail(email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    // --- Create the User ---
    const userId = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password
    });

    // --- Generate JWT ---
    const token = jwt.sign(
      { id: userId, email: email.toLowerCase(), role: 'customer' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: { id: userId, name: name.trim(), email: email.toLowerCase(), role: 'customer' }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/auth/login
 * Log in an existing user
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // --- Input Validation ---
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // --- Find User ---
    const user = await User.findByEmail(email.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // --- Verify Password ---
    const isValid = await User.verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // --- Generate JWT ---
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Login successful!',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/auth/me
 * Get current logged-in user's profile
 */
async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/auth/users
 * Admin: get all registered users (no passwords)
 */
async function getAllUsers(req, res, next) {
  try {
    const db = require('../config/db');
    const [users] = await db.query(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/auth/profile
 * Update current user's name, email and phone
 */
async function updateProfile(req, res, next) {
  try {
    const { name, phone_number } = req.body;
    const userId = req.user.id;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ message: 'Name must be at least 2 characters.' });
    }

    const db = require('../config/db');
    await db.query(
      'UPDATE users SET name = ?, phone_number = ? WHERE id = ?',
      [name.trim(), phone_number ? phone_number.trim() : null, userId]
    );

    const updatedUser = await User.findById(userId);
    res.json({ success: true, message: 'Profile updated!', user: updatedUser });
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/auth/change-password
 * Change current user's password
 */
async function changePassword(req, res, next) {
  try {
    const { current_password, new_password } = req.body;
    const userId = req.user.id;

    if (!current_password || !new_password) {
      return res.status(400).json({ message: 'Both current and new password are required.' });
    }
    if (new_password.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters.' });
    }

    // Get user with password hash
    const db   = require('../config/db');
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    const user   = rows[0];

    // Verify current password is correct
    const isValid = await User.verifyPassword(current_password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    // Hash and save new password
    const bcrypt    = require('bcryptjs');
    const newHash   = await bcrypt.hash(new_password, 12);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [newHash, userId]);

    res.json({ success: true, message: 'Password changed successfully!' });
  } catch (err) {
    next(err);
  }
}

module.exports = { signup, login, getMe, getAllUsers, updateProfile, changePassword };
