// server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

// --- NEW IMPORTS ---
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(express.json());

// --- USE LOGGER MIDDLEWARE ---
// This will run on every request
app.use(logger);

// Mount routes
app.use('/api/todos', todoRoutes);

// --- USE ERROR HANDLER MIDDLEWARE ---
// This must be LAST, after all routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});