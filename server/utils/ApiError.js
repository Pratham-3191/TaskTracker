// ─── ApiError ─────────────────────────────────────────────────────────────────
// A custom error class that extends the native Error.
// By attaching an HTTP statusCode, controllers can throw a single object
// that carries everything the error handler needs — no extra parameters.
//
// Usage:
//   throw new ApiError(404, 'Task not found');
//   throw new ApiError(400, 'Title is required');

class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;

    // 'errors' holds granular validation details when needed
    // e.g. [{ field: 'title', message: 'Title is required' }]
    this.errors = errors;

    this.isOperational = true; // Marks this as an expected, handled error

    // Capture a clean stack trace that starts at the call site,
    // not inside the ApiError constructor itself.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
