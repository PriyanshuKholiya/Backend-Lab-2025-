// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Log the error for the developer
  console.error(`[ERROR] ${err.stack}`);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Server Error';

  // Handle specific Mongoose errors
  
  // 1. Mongoose Bad Object ID (CastError)
  if (err.name === 'CastError') {
    message = `Todo not found with id of ${err.value}`;
    statusCode = 404;
  }

  // 2. Mongoose Validation Error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    statusCode = 400;
  }

  // Send the standardized JSON response
  res.status(statusCode).json({
    success: false,
    error: message,
  });
};

module.exports = errorHandler;