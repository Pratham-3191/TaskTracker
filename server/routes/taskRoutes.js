const express = require('express');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const validateTask = require('../middleware/validateTask');

const router = express.Router();

// ─── Task Routes ──────────────────────────────────────────────────────────────
// All routes here are prefixed with /api/tasks (defined in app.js)

// Collection routes
router.route('/')
  .get(getTasks)                 // GET  /api/tasks
  .post(validateTask, createTask); // POST /api/tasks (with validation)

// Single resource routes
router.route('/:id')
  .get(getTaskById)                // GET    /api/tasks/:id
  .put(validateTask, updateTask)   // PUT    /api/tasks/:id (with validation)
  .delete(deleteTask);             // DELETE /api/tasks/:id

module.exports = router;
