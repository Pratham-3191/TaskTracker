const mongoose = require('mongoose');

// ─── Task Schema ──────────────────────────────────────────────────────────────
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },

    status: {
      type: String,
      enum: {
        values: ['todo', 'in-progress', 'done'],
        message: 'Status must be todo, in-progress, or done',
      },
      default: 'todo',
    },

    priority: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: 'Priority must be low, medium, or high',
      },
      default: 'medium',
    },

    dueDate: {
      type: Date,
      default: null,
      validate: {
        // Only run this check when a dueDate is actually provided
        validator: function (value) {
          if (!value) return true;
          return value instanceof Date && !isNaN(value);
        },
        message: 'Due date must be a valid date',
      },
    },
  },
  {
    // Automatically manages createdAt and updatedAt timestamps
    timestamps: true,

    // Shape the JSON output when sending to the client
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        // Rename _id → id so the frontend doesn't need to handle both
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
// Speed up the most common query operations.
taskSchema.index({ title: 'text' });           // Full-text search on title
taskSchema.index({ status: 1 });               // Filter by status
taskSchema.index({ priority: 1 });             // Filter by priority
taskSchema.index({ createdAt: -1 });           // Default sort (newest first)
taskSchema.index({ dueDate: 1 });              // Sort by due date

// ─── Pre-save Hook ────────────────────────────────────────────────────────────
// Mongoose's timestamps option handles updatedAt automatically,
// but this hook is a safety net for any manual updates that bypass it.
taskSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
