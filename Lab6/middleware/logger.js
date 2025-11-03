// middleware/logger.js

// @desc    Logs all requests to the console
const logger = (req, res, next) => {
  console.log(
    `[LOG] ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  next(); // Must call next() to move to the next middleware
};

module.exports = logger;