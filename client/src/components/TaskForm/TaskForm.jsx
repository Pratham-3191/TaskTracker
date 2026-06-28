import React, { useState, useEffect, useRef } from 'react';
import { TASK_STATUS, TASK_PRIORITY } from '../../utils/constants';
import { validateTaskForm } from '../../utils/validators';

const TaskForm = ({ isOpen, onClose, task, onSubmit, submitting }) => {
  const titleInputRef = useRef(null);
  const [fields, setFields] = useState({
    title: '',
    description: '',
    status: TASK_STATUS.TODO,
    priority: TASK_PRIORITY.MEDIUM,
    dueDate: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (task) {
        let formattedDate = '';
        if (task.dueDate) {
          formattedDate = new Date(task.dueDate).toISOString().split('T')[0];
        }
        setFields({
          title: task.title || '',
          description: task.description || '',
          status: task.status || TASK_STATUS.TODO,
          priority: task.priority || TASK_PRIORITY.MEDIUM,
          dueDate: formattedDate,
        });
      } else {
        setFields({
          title: '',
          description: '',
          status: TASK_STATUS.TODO,
          priority: TASK_PRIORITY.MEDIUM,
          dueDate: '',
        });
      }
      setErrors({});

      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, task]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTaskForm(fields);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    const taskData = {
      title: fields.title.trim(),
      description: fields.description.trim(),
      status: fields.status,
      priority: fields.priority,
      dueDate: fields.dueDate ? new Date(fields.dueDate).toISOString() : null,
    };
    onSubmit(taskData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 className="modal-title">{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '24px',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: '1',
              padding: '4px',
              transition: 'color var(--transition-fast)',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--color-text-primary)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="modal-body flex flex-col gap-4">
            <div className="form-group">
              <label htmlFor="form-title" className="form-label">
                Title <span className="required" aria-hidden="true">*</span>
              </label>
              <input
                id="form-title"
                name="title"
                type="text"
                ref={titleInputRef}
                className={`form-input ${errors.title ? 'is-error' : ''}`}
                placeholder="e.g. Write unit tests"
                value={fields.title}
                onChange={handleChange}
                disabled={submitting}
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="form-desc" className="form-label">Description</label>
              <textarea
                id="form-desc"
                name="description"
                className={`form-textarea ${errors.description ? 'is-error' : ''}`}
                placeholder="Details about the task..."
                value={fields.description}
                onChange={handleChange}
                disabled={submitting}
              />
              {errors.description && <span className="form-error">{errors.description}</span>}
            </div>

            <div className="flex gap-4">
              <div className="form-group flex-1">
                <label htmlFor="form-status" className="form-label">Status</label>
                <select
                  id="form-status"
                  name="status"
                  className="form-select"
                  value={fields.status}
                  onChange={handleChange}
                  disabled={submitting}
                >
                  <option value={TASK_STATUS.TODO}>To Do</option>
                  <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
                  <option value={TASK_STATUS.DONE}>Done</option>
                </select>
              </div>

              <div className="form-group flex-1">
                <label htmlFor="form-priority" className="form-label">Priority</label>
                <select
                  id="form-priority"
                  name="priority"
                  className="form-select"
                  value={fields.priority}
                  onChange={handleChange}
                  disabled={submitting}
                >
                  <option value={TASK_PRIORITY.LOW}>Low</option>
                  <option value={TASK_PRIORITY.MEDIUM}>Medium</option>
                  <option value={TASK_PRIORITY.HIGH}>High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="form-due-date" className="form-label">Due Date</label>
              <input
                id="form-due-date"
                name="dueDate"
                type="date"
                className={`form-input ${errors.dueDate ? 'is-error' : ''}`}
                value={fields.dueDate}
                onChange={handleChange}
                disabled={submitting}
              />
              {errors.dueDate && <span className="form-error">{errors.dueDate}</span>}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : task ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
