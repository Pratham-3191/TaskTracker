const ApiError = require('../utils/ApiError');

// ─── 404 Not Found Middleware ─────────────────────────────────────────────────
// Placed after all valid routes in app.js.
// If a request reaches here, no route matched — send a 404 ApiError
// to the global error handler instead of Express's default HTML response.

const notFound = (req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

module.exports = notFound;
