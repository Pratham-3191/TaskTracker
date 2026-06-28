import api from './api';

// ─── Task Service ─────────────────────────────────────────────────────────────
// All API calls for tasks live here.
// Components and hooks import from this file — never from api.js directly.
// Every function returns the unwrapped data from the response body.

/**
 * Fetch a paginated, filtered, sorted list of tasks.
 * @param {Object} params - Query parameters
 * @param {string}  params.search   - Title search string
 * @param {string}  params.status   - Filter by status
 * @param {string}  params.priority - Filter by priority
 * @param {string}  params.sortBy   - Field to sort by
 * @param {string}  params.order    - 'asc' | 'desc'
 * @param {number}  params.page     - Page number
 * @param {number}  params.limit    - Items per page
 * @returns {{ data: Task[], pagination: Pagination }}
 */
export const fetchTasks = async (params = {}) => {
  // Strip out undefined/empty string values so the URL stays clean
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== '' && v !== undefined && v !== null)
  );
  const response = await api.get('/tasks', { params: cleanParams });
  return response.data;
};

/**
 * Fetch a single task by its ID.
 * @param {string} id
 * @returns {{ data: Task }}
 */
export const fetchTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

/**
 * Create a new task.
 * @param {Object} taskData - { title, description, status, priority, dueDate }
 * @returns {{ data: Task, message: string }}
 */
export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

/**
 * Update an existing task.
 * @param {string} id
 * @param {Object} taskData - Partial task fields to update
 * @returns {{ data: Task, message: string }}
 */
export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

/**
 * Delete a task by ID.
 * @param {string} id
 * @returns {{ message: string }}
 */
export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
