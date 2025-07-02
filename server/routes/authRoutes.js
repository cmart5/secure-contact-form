const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Hardcoded admin credentials (TEMP)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

// POST /api/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
  // Generate JWT token
  const token = jwt.sign(
    { username },                      // payload
    process.env.JWT_SECRET,           // secret
    { expiresIn: '1h' }               // expiration
  );

  res.json({ token });
});

const authenticateToken = require('../middleware/authMiddleware');

// GET /api/messages (protected)
router.get('/messages', authenticateToken, (req, res) => {
  res.json({
    message: 'This is a protected route!',
    user: req.user  // From the token
  });
});

// Test route to verify server is running
router.get('/test', (req, res) => {
  res.send('Test route is working!');
});

// POST /api/contact (protected + validated)
router.post(
  '/contact',
  authenticateToken, // Middleware: requires a valid JWT

  // Middleware: validate the incoming request body
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').notEmpty().withMessage('Message cannot be empty')
  ],

  // Handler: only called if token is valid and inputs pass validation
  (req, res) => {
    const errors = validationResult(req);

    // If any validation failed, return a 400 with details
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, message } = req.body;

    // Simulate storing or sending the message
    console.log('New contact form submitted:', { name, email, message });

    res.status(200).json({ message: 'Message received successfully' });
  }
);

module.exports = router;
