const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { authenticate, isAdmin } = require('../middleware/auth');
const { deployClient } = require('../utils/deployment');


const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password} = req.body;
    let role = 'user';

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const users = await User.find();
    if (users.length === 0) {
      role = 'admin';
    }

    const existingClientIds = await User.find().distinct('client_id');
    let client_id = 1;
    while (existingClientIds.includes(client_id)) {
      client_id++;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role, client_id });
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id.toString(),
        username: user.username,
        role: user.role
      }
    });
    deployClient(user.client_id);
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id.toString(),
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({
      id: user._id.toString(),
      username: user.username,
      role: user.role
    });
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ error: 'Me failed', details: error.message });
  }
});

module.exports = router;