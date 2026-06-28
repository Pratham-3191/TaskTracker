const ApiError = require('../utils/ApiError');

// ─── Task Validation Middleware ───────────────────────────────────────────────
// Validates the incoming body fields for POST and PUT requests BEFORE
// they reach the controller logic. This prevents database load and
// keeps controllers focused on execution.

const validateTask = (req, _res, next) => {
  const errors = [];
  const { title, description, status, priority, dueDate } = req.body;

  // For PUT requests, title might not be present (partial updates).
  // For POST requests, title is strictly required.
  const isPost = req.method === 'POST';

  // 1. Title Validation
  if (isPost && (!title || typeof title !== 'string' || !title.trim())) {
    errors.push({ field: 'title', message: 'Title is required' });
  } else if (title !== undefined) {
    if (typeof title !== 'string' || title.trim().length < 3) {
      errors.push({ field: 'title', message: 'Title must be at least 3 characters long' });
    } else if (title.length > 100) {
      errors.push({ field: 'title', message: 'Title cannot exceed 100 characters' });
    }
  }

  // 2. Description Validation
  if (description !== undefined) {
    if (typeof description !== 'string') {
      errors.push({ field: 'description', message: 'Description must be a string' });
    } else if (description.length > 500) {
      errors.push({ field: 'description', message: 'Description cannot exceed 500 characters' });
    }
  }

  // 3. Status Validation
  if (status !== undefined) {
    const validStatuses = ['todo', 'in-progress', 'done'];
    if (!validStatuses.includes(status)) {
      errors.push({ field: 'status', message: 'Status must be todo, in-progress, or done' });
    }
  }

  // 4. Priority Validation
  if (priority !== undefined) {
    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      errors.push({ field: 'priority', message: 'Priority must be low, medium, or high' });
    }
  }

  // 5. Due Date Validation
  if (dueDate !== undefined && dueDate !== null && dueDate !== '') {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      errors.push({ field: 'dueDate', message: 'Due date must be a valid ISO date string' });
    }
  }

  // If there are validation failures, halt request and return 400 ApiError
  if (errors.length > 0) {
    return next(new ApiError(400, 'Validation failed', errors));
  }

  next();
};

module.exports = validateTask;
