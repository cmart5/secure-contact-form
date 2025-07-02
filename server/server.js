const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // allow your React frontend
  credentials: true
}));
app.use(express.json()); // allows JSON parsing

// Import routes
const authRoutes = require('./routes/authRoutes');

// Mount routes under /api prefix
app.use('/api', authRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
