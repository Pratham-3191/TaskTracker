import React from 'react';
import { TASK_STATUS, TASK_PRIORITY } from '../../utils/constants';

const FilterBar = ({ status, priority, onStatusChange, onPriorityChange }) => {
  return (
    <div className="flex gap-4 flex-wrap items-center">
      <div className="flex items-center gap-2">
        <label htmlFor="filter-status" className="text-sm font-medium text-muted">
          Status:
        </label>
        <select
          id="filter-status"
          className="form-select"
          style={{ width: '140px', height: '36px', fontSize: 'var(--font-size-sm)', padding: '0 28px 0 12px' }}
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value={TASK_STATUS.TODO}>To Do</option>
          <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
          <option value={TASK_STATUS.DONE}>Done</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="filter-priority" className="text-sm font-medium text-muted">
          Priority:
        </label>
        <select
          id="filter-priority"
          className="form-select"
          style={{ width: '140px', height: '36px', fontSize: 'var(--font-size-sm)', padding: '0 28px 0 12px' }}
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value={TASK_PRIORITY.LOW}>Low</option>
          <option value={TASK_PRIORITY.MEDIUM}>Medium</option>
          <option value={TASK_PRIORITY.HIGH}>High</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
