const Task = require('../models/Task');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// ─── GET /api/tasks ───────────────────────────────────────────────────────────
// Supports: search, filter by status/priority, sort, pagination
const getTasks = asyncHandler(async (req, res) => {
  const {
    search = '',
    status,
    priority,
    sortBy = 'createdAt',
    order = 'desc',
    page = 1,
    limit = 10,
  } = req.query;

  // ── Build the filter object ──────────────────────────────────────────────
  const filter = {};

  if (search.trim()) {
    filter.title = { $regex: search.trim(), $options: 'i' };
  }

  const validStatuses = ['todo', 'in-progress', 'done'];
  if (status && validStatuses.includes(status)) {
    filter.status = status;
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (priority && validPriorities.includes(priority)) {
    filter.priority = priority;
  }

  // ── Pagination calculations ──────────────────────────────────────────────
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (pageNum - 1) * limitNum;

  // ── Execute query based on sort field ────────────────────────────────────
  let tasks;
  const sortOrder = order === 'asc' ? 1 : -1;

  if (sortBy === 'priority') {
    // Custom Priority Sorting (high = 3, medium = 2, low = 1) using aggregation
    tasks = await Task.aggregate([
      { $match: filter },
      {
        $addFields: {
          priorityWeight: {
            $switch: {
              branches: [
                { case: { $eq: ['$priority', 'high'] }, then: 3 },
                { case: { $eq: ['$priority', 'medium'] }, then: 2 },
                { case: { $eq: ['$priority', 'low'] }, then: 1 },
              ],
              default: 0,
            },
          },
        },
      },
      { $sort: { priorityWeight: sortOrder, createdAt: -1 } },
      { $skip: skip },
      { $limit: limitNum },
    ]);

    // Map `_id` to `id` for consistency in aggregation output (since aggregate bypasses Mongoose schema toJSON transform)
    tasks = tasks.map(task => {
      task.id = task._id;
      delete task._id;
      delete task.__v;
      return task;
    });
  } else {
    // Standard sorting for native schema fields (createdAt, dueDate, title, etc.)
    const validSortFields = ['createdAt', 'updatedAt', 'dueDate', 'title'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const sort = { [sortField]: sortOrder };

    tasks = await Task.find(filter).sort(sort).skip(skip).limit(limitNum);
  }

  const total = await Task.countDocuments(filter);
  const totalPages = Math.ceil(total / limitNum);

  res.status(200).json({
    success: true,
    data: tasks,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    },
  });
});

// ─── GET /api/tasks/:id ───────────────────────────────────────────────────────
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id).lean();

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  res.status(200).json({ success: true, data: task });
});

// ─── POST /api/tasks ──────────────────────────────────────────────────────────
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  const task = await Task.create({ title, description, status, priority, dueDate });

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task,
  });
});

// ─── PUT /api/tasks/:id ───────────────────────────────────────────────────────
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (status !== undefined) updates.status = status;
  if (priority !== undefined) updates.priority = priority;
  if (dueDate !== undefined) updates.dueDate = dueDate;

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    updates,
    {
      new: true,
      runValidators: true,
    }
  ).lean();

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: task,
  });
});

// ─── DELETE /api/tasks/:id ────────────────────────────────────────────────────
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id).lean();

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
    data: { id: task._id },
  });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
