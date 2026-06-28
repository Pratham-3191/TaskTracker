// ─── asyncHandler ─────────────────────────────────────────────────────────────
// A higher-order function that wraps async route handlers.
// Without this, every controller would need its own try/catch block.
// With this, any rejected promise is automatically passed to next(err),
// which triggers the centralized error handler in middleware/errorHandler.js
//
// Usage:
//   router.get('/', asyncHandler(async (req, res) => { ... }));

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
