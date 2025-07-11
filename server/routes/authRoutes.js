const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = [
  { username: 'admin', password: 'password123' }
]
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

module.exports = router;
