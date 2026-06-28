// ─── Global Error Handler ─────────────────────────────────────────────────────
// Express identifies this as an error handler because it has exactly 4 params.
// All errors — thrown manually (ApiError) or by Mongoose — end up here.
// Every response is structured JSON so the frontend can parse it reliably.

const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || [];

  // ─── Mongoose: Document Validation Error ───────────────────────────────
  // Thrown when a document fails schema validation (e.g. required field missing)
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // ─── Mongoose: Cast Error ──────────────────────────────────────────────
  // Thrown when an invalid ObjectId is passed (e.g. /tasks/not-a-valid-id)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid value for field: ${err.path}`;
  }

  // ─── Mongoose: Duplicate Key Error ────────────────────────────────────
  // Thrown when a unique index constraint is violated
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value: a record with this ${field} already exists`;
  }

  // ─── Log unexpected server errors in development ───────────────────────
  if (statusCode === 500 && process.env.NODE_ENV === 'development') {
    console.error('❌ Unexpected Error:', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    // Include stack trace only in development — never expose it in production
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
