import React from 'react';
import { SORT_OPTIONS } from '../../utils/constants';

const SortDropdown = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2" style={{ minWidth: '220px' }}>
      <label htmlFor="sort-tasks" className="text-sm font-medium text-muted" style={{ whiteSpace: 'nowrap' }}>
        Sort By:
      </label>
      <select
        id="sort-tasks"
        className="form-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
