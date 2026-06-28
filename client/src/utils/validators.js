// ─── Form Validators ──────────────────────────────────────────────────────────
// Pure functions that return an error string or null.
// Used in TaskForm for client-side validation before hitting the API.

export const validateTitle = (value) => {
  const trimmed = (value || '').trim();
  if (!trimmed) return 'Title is required';
  if (trimmed.length < 3) return 'Title must be at least 3 characters';
  if (trimmed.length > 100) return 'Title cannot exceed 100 characters';
  return null;
};

export const validateDescription = (value) => {
  const trimmed = (value || '').trim();
  if (trimmed.length > 500) return 'Description cannot exceed 500 characters';
  return null;
};

export const validateDueDate = (value) => {
  if (!value) return null; // Due date is optional
  const date = new Date(value);
  if (isNaN(date.getTime())) return 'Please enter a valid date';
  return null;
};

// Validates the entire task form and returns an errors object.
// Returns null if all fields are valid.
export const validateTaskForm = (fields) => {
  const errors = {};

  const titleError = validateTitle(fields.title);
  if (titleError) errors.title = titleError;

  const descError = validateDescription(fields.description);
  if (descError) errors.description = descError;

  const dateError = validateDueDate(fields.dueDate);
  if (dateError) errors.dueDate = dateError;

  return Object.keys(errors).length > 0 ? errors : null;
};
