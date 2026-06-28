import React, { useState } from 'react';
import { TASK_STATUS, TASK_STATUS_LABELS } from '../../utils/constants';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [toggleLoading, setToggleLoading] = useState(false);

  // Format Date to a human readable string (e.g. Jun 28, 2026)
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleStatusToggle = async () => {
    if (toggleLoading) return;
    setToggleLoading(true);
    let nextStatus = TASK_STATUS.TODO;
    if (task.status === TASK_STATUS.TODO) {
      nextStatus = TASK_STATUS.IN_PROGRESS;
    } else if (task.status === TASK_STATUS.IN_PROGRESS) {
      nextStatus = TASK_STATUS.DONE;
    } else {
      nextStatus = TASK_STATUS.TODO;
    }
    await onStatusChange(task.id || task._id, { status: nextStatus });
    setToggleLoading(false);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== TASK_STATUS.DONE;

  return (
    <article
      className="card flex flex-col justify-between"
      style={{
        borderLeft: `4px solid var(--color-priority-${task.priority})`,
        opacity: task.status === TASK_STATUS.DONE ? 0.75 : 1,
        minHeight: '220px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="font-semibold text-md"
            style={{
              textDecoration: task.status === TASK_STATUS.DONE ? 'line-through' : 'none',
              color: 'var(--color-text-primary)',
              wordBreak: 'break-word',
              lineHeight: '1.3',
            }}
          >
            {task.title}
          </h3>
          <button
            className={`badge badge-status-${task.status}`}
            onClick={handleStatusToggle}
            disabled={toggleLoading}
            title="Click to cycle status"
            style={{ cursor: 'pointer', flexShrink: 0 }}
          >
            {TASK_STATUS_LABELS[task.status]}
          </button>
        </div>

        {task.description ? (
          <p className="text-sm text-muted" style={{ wordBreak: 'break-word', whiteSpace: 'pre-line', fontSize: 'var(--font-size-sm)' }}>
            {task.description}
          </p>
        ) : (
          <p className="text-sm text-muted" style={{ fontStyle: 'italic', opacity: 0.5, fontSize: 'var(--font-size-sm)' }}>
            No description provided.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3" style={{ marginTop: 'auto' }}>
        <div className="flex items-center justify-between gap-2 flex-wrap text-xs text-muted">
          <div className="flex items-center gap-1.5">
            <span aria-hidden="true" style={{ fontSize: '14px' }}>📅</span>
            <span className={isOverdue ? 'text-danger font-semibold' : ''}>
              {formatDate(task.dueDate)} {isOverdue && '(Overdue)'}
            </span>
          </div>
          <span className={`badge badge-priority-${task.priority}`}>
            {task.priority} Priority
          </span>
        </div>

        <hr className="divider" style={{ margin: 0 }} />

        <div className="flex justify-between items-center gap-3">
          <span className="text-xs text-muted" style={{ fontSize: '11px' }}>
            Updated {new Date(task.updatedAt || task.createdAt).toLocaleDateString()}
          </span>
          <div className="flex gap-2">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onEdit(task)}
              aria-label={`Edit task ${task.title}`}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(task)}
              aria-label={`Delete task ${task.title}`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
