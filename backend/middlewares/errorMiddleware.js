const ErrorHandler = require("../utils/errorHandler");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal server error.";

  if (error.name === "CastError") {
    const message = `Resource not found. Invalid: ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  if (error.code === 11000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} provided.`;
    error = new ErrorHandler(message, 400);
  }

  if (error.name === "JsonWebTokenError") {
    const message = `Invalid JSON Web Token.`;
    error = new ErrorHandler(message, 400);
  }

  if (error.name === "TokenExpiredError") {
    const message = `JSON Web Token expired.`;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
