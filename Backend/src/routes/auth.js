const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const users = [];

// JWT token generation
const generateToken = (email) => {
  return jwt.sign({ email }, 'jwt_secret', { expiresIn: '30d' }); // Token expires in 30 days
};

// Password hashing
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Password comparison
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// User creation
const createUser = async (username, email, password) => {
  const hashedPassword = await hashPassword(password);
  const newUser = { username, email, password: hashedPassword };
  users.push(newUser);
  return generateToken(email);
};

// User authentication
const authenticateUser = async (email, password) => {
  const user = users.find(user => user.email === email);
  if (!user) {
    throw new Error('User does not exist');
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return generateToken(email);
};

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const token = await createUser(username, email, password);
    res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // Cookie expires in 30 days
    res.status(201).json({ token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authenticateUser(email, password);
    res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // Cookie expires in 30 days
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Forgot password route
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  try {
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Normally you would send a password reset email here
    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
